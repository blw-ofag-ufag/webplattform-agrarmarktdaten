import { TimeFilter, queryObservations } from "@/lib/cube-queries";
import { addNamespace, amdpMeasure } from "@/lib/namespace";
import { Locale, defaultLocale } from "@/locales/locales";
import {
  Measure,
  Observation,
  Property,
  fetchObservations,
  getSparqlEditorUrl,
} from "@/pages/api/data";
import { toCamelCase } from "@/utils/stringCase";
import { FormatLocaleDefinition, formatLocale, timeFormat } from "d3";
// @ts-expect-error https://stackoverflow.com/questions/74072409/webpack-doesnt-resolve-imports-of-json-files-from-d3-packages
import localeDE from "d3-format/locale/de-CH";
// @ts-expect-error
import localeFR from "d3-format/locale/fr-FR";
// @ts-expect-error
import localeIT from "d3-format/locale/it-IT";
import dayjs from "dayjs";
import { atom } from "jotai";
import { atomsWithQuery } from "jotai-tanstack-query";
import { isNumber, mapValues } from "lodash";
import millify from "millify";
import { mapToObj } from "remeda";
import { match } from "ts-pattern";
import { cubeDimensionsStatusAtom, cubePathAtom, cubesStatusAtom, lindasAtom } from "./cubes";
import { DIMENSIONS, dataDimensions } from "./dimensions";
import {
  RangeOptions,
  TimeView,
  filterDimensionsSelectionAtom,
  timeRangeAtom,
  timeViewAtom,
} from "./filters";

const getTimeFilter = (timeRange: RangeOptions, timeView: TimeView): TimeFilter => {
  const [minUnix, maxUnix] = timeRange.value;
  const [minDate, maxDate] = [dayjs.unix(minUnix), dayjs.unix(maxUnix)];
  return {
    minDate: { year: minDate.year().toString(), month: minDate.month().toString() },
    maxDate: { year: maxDate.year().toString(), month: maxDate.month().toString() },
    mode: timeView,
  };
};

/**
 * Observations atom. This atom contains the observations of the cube that we are currently viewing.
 * The observations are filtered by the selected dimensions.
 * Dimensions values on observations are not yet parsed, use parsedObservationsAtom for that.
 */
export const [observationsAtom, observationsQueryAtom] = atomsWithQuery<
  ReturnType<typeof fetchObservations> extends Promise<infer T> ? T : never
>((get) => {
  const emptyQuery = {
    queryKey: ["observations"],
    queryFn: () => ({
      observations: [],
      query: "",
    }),
  };

  const cubePath = get(cubePathAtom);
  const cubes = get(cubesStatusAtom);
  const lindas = get(lindasAtom);

  if (!cubes.isSuccess) return emptyQuery;
  const cubeDefinition = cubes.data.find((cube) => cube.cube === cubePath);

  const timeRange = get(timeRangeAtom);
  const timeView = get(timeViewAtom);
  const timeFilter = getTimeFilter(timeRange, timeView);

  if (!cubeDefinition) return emptyQuery;

  // Time filters are done client-side
  const queryTimeFilter = { minDate: null, maxDate: null, mode: timeFilter.mode };

  return {
    queryKey: ["observations", cubePath, lindas.value, queryTimeFilter],
    queryFn: () =>
      fetchObservations({
        cubeIri: cubeDefinition.cube,
        measure: {
          iri: amdpMeasure(cubeDefinition.measure).value,
          key: cubeDefinition.measure,
        },
        // Filters are done client-side
        filters: {},
        environment: lindas.url,
        timeFilter: queryTimeFilter,
      }),
    retry: false,
  };
});

export const valueFormatter = ({
  value,
  dimension,
  cubeDimensions,
  timeView,
  locale = defaultLocale,
}: {
  value?: string | number;
  dimension: string;
  cubeDimensions: Record<string, Property | Measure>;
  timeView?: TimeView;
  locale?: Locale;
}) => {
  const dim = cubeDimensions[dimension];
  if (dim && dim.dimension === "date") {
    if (timeView === "Year") {
      return timeFormat("%Y")(dayjs(value).toDate());
    }
    return timeFormat("%m-%Y")(dayjs(value).toDate());
  }
  if (dim && dim.type === "measure") {
    if (!isNumber(value)) return value;
    if (dim.dimension !== "quantity") {
      const formatter = match(locale)
        .with("de", () => formatLocale(localeDE as FormatLocaleDefinition))
        .with("fr", () => formatLocale(localeFR as FormatLocaleDefinition))
        .with("it", () => formatLocale(localeIT as FormatLocaleDefinition))
        .otherwise(() => formatLocale(localeDE as FormatLocaleDefinition));
      return formatter.format(`.2f`)(value);
    }
    return millify(value, {
      locales: locale,
      space: true,
    });
  }
  if (dim && dim.type === "property") {
    return dim.values.find((v) => v.value === value)?.label ?? value;
  }
  return value;
};

/**
 * Parsed observations atom. This atom contains the observations of the cube that we are currently
 * viewing. The observations are filtered by the selected dimensions.
 * Dimensions values on observations are parsed using cubeDimensionsAtom.
 */
export const parsedObservationsAtom = atom(async (get) => {
  const observations = await get(observationsAtom);
  const cubeDimensions = await get(cubeDimensionsStatusAtom);

  if (!cubeDimensions.isSuccess) return observations.observations;

  return observations.observations.map((obs) =>
    Object.entries(obs).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [key]: valueFormatter({
          value: value as string | number,
          dimension: key,
          cubeDimensions: {
            ...cubeDimensions.data.properties,
            ...cubeDimensions.data.measures,
          },
        }),
      };
    }, {})
  );
});

/**
 * Filtered observations atom. This atom contains the observations of the cube that we are currently
 * viewing. The observations are filtered by the selected dimensions client-side.
 *
 * ℹ️ The filtering logic is done application side for performance concerns.
 *  ⚠️ The filtering logic needs to be in sync with the SPARQL filtering logic expressed in the
 * `observationsSparqlQueryAtom`.
 */
export const filteredObservationsAtom = atom((get) => {
  const observationsQuery = get(observationsQueryAtom);
  const filterDimensionsSelection = get(filterDimensionsSelectionAtom);
  const timeRange = get(timeRangeAtom);

  if (!observationsQuery.data) return [];

  const filters = Object.entries(filterDimensionsSelection).reduce(
    (acc, [key, atom]) => {
      const dim = key as keyof typeof filterDimensionsSelection;
      const selectedOptions = get(atom);
      const optionsSet = new Set(selectedOptions.map((option) => option.value));
      const filterFn = (obs: Observation) => optionsSet.has(obs[dim] as string);
      return [...acc, filterFn];
    },
    [] as Array<(obs: Observation) => boolean>
  );

  const [minDate, maxDate] = timeRange.value.map((d) => dayjs.unix(d));
  const timeFilterFn = (obs: Observation) => {
    const observationDate = dayjs(obs.date);
    return observationDate && observationDate >= minDate && observationDate <= maxDate;
  };

  const filteredObservations = observationsQuery.data.observations
    .filter(timeFilterFn)
    .filter((obs) => filters.map((f) => f(obs)).every(Boolean));

  return filteredObservations;
});

/**
 * Observations query atom. This atom contains the SPARQL query to fetch the observations of the
 * cube that we are currently viewing. The observations are filtered by the selected dimensions.
 *
 * ⚠️ The SPARQL filtering logic needs to be the same as the logic expressed application side in the
 * `filteredObservationsAtom`.
 */
export const observationsSparqlQueryAtom = atom((get) => {
  const filterDimensionsSelection = get(filterDimensionsSelectionAtom);
  const cubeIri = get(cubePathAtom);
  const fullCubeIri = addNamespace(cubeIri);
  const lindas = get(lindasAtom);
  const cubes = get(cubesStatusAtom);
  if (!cubes.isSuccess) return undefined;

  const cubeDefinition = cubes.data.find((cube) => cube.cube === cubeIri);

  const timeRange = get(timeRangeAtom);
  const timeView = get(timeViewAtom);
  const timeFilter = getTimeFilter(timeRange, timeView);

  if (!cubeDefinition) return "";
  const filters = mapValues(filterDimensionsSelection, (atom) => {
    if (atom) {
      const selectedOptions = get(atom);
      return selectedOptions.map((option) => option.value);
    }
    return [];
  });

  const query = queryObservations({
    cubeIri: fullCubeIri,
    filters: mapToObj(Object.entries(filters), ([key, value]) => [
      toCamelCase(key),
      value.map((v) => addNamespace(v)),
    ]),
    measure: {
      iri: amdpMeasure(cubeDefinition.measure).value,
      key: cubeDefinition.measure,
    },
    dimensions: DIMENSIONS.map((v) => ({
      iri: dataDimensions[v].iri,
      key: toCamelCase(v),
    })),
    timeFilter,
  });

  return getSparqlEditorUrl(query, lindas.url);
});
