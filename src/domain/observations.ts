import { TimeFilter, queryObservations } from "@/lib/cube-queries";
import { addNamespace, amdpMeasure } from "@/lib/namespace";
import { Observation, fetchObservations, getSparqlEditorUrl } from "@/pages/api/data";
import { toCamelCase } from "@/utils/stringCase";

import { tableFormatter } from "@/lib/formatter";
import dayjs from "dayjs";
import { atom } from "jotai";
import { atomsWithQuery } from "jotai-tanstack-query";
import { isUndefined, mapValues } from "lodash";
import { mapToObj } from "remeda";
import { cubeDimensionsStatusAtom, cubePathAtom, cubesStatusAtom, lindasAtom } from "./cubes";
import { DIMENSIONS, dataDimensions } from "./dimensions";
import { RangeOptions, TimeView, dimensionsSelectionAtom, timeViewAtom } from "./filters";
import { localeAtom } from "@/lib/use-locale";
import { mkTimeFilter } from "./time-filter";
import { timeView } from "@/mocks/atoms.mock";

const getTimeFilter = (timeRange: RangeOptions, timeView: TimeView): TimeFilter => {
  const [minUnix, maxUnix] = timeRange.value;
  const [minDate, maxDate] = [dayjs.unix(minUnix), dayjs.unix(maxUnix)];
  return {
    minDate: { year: minDate.year().toString(), month: (minDate.month() + 1).toString() },
    maxDate: { year: maxDate.year().toString(), month: (maxDate.month() + 1).toString() },
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
  const cubePath = get(cubePathAtom);
  const cubes = get(cubesStatusAtom);
  const lindas = get(lindasAtom);

  const cubeDefinition = cubes.isSuccess
    ? cubes.data.find((cube) => cube.cube === cubePath)
    : undefined;

  const timeView = get(timeViewAtom);

  // Time filters are done client-side
  const queryTimeFilter = { minDate: null, maxDate: null, mode: timeView };

  return {
    queryKey: ["observations", cubePath, lindas.value, queryTimeFilter],
    queryFn: () => {
      if (!cubeDefinition) {
        return Promise.reject(new Error("No cube definition"));
      }
      return fetchObservations({
        cubeIri: cubeDefinition?.cube,
        measure: {
          iri: amdpMeasure(cubeDefinition?.measure).value,
          key: cubeDefinition?.measure,
        },
        // Filters are done client-side
        filters: {},
        environment: lindas.url,
        timeFilter: queryTimeFilter,
      });
    },
    skip: isUndefined(cubeDefinition) || isUndefined(cubePath),
  };
});

/**
 * Parsed observations atom. This atom contains the observations of the cube that we are currently
 * viewing. The observations are filtered by the selected dimensions.
 * Dimensions values on observations are parsed using cubeDimensionsAtom.
 */
export const parsedObservationsAtom = atom(async (get) => {
  const observations = await get(observationsAtom);
  const cubeDimensions = await get(cubeDimensionsStatusAtom);

  if (!cubeDimensions.isSuccess) return observations.observations;

  const formatters = Object.fromEntries(
    Object.keys(observations.observations[0]).map((key) => {
      return [
        key,
        tableFormatter({
          dimension: key,
          cubeDimensions: {
            ...cubeDimensions.data.properties,
            ...cubeDimensions.data.measures,
          },
        }),
      ];
    })
  );
  return observations.observations.map((obs) =>
    mapValues(obs, (value, key) => {
      return formatters[key](value);
    })
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
  const dimensionsSelection = get(dimensionsSelectionAtom);

  if (!dimensionsSelection.isSuccess || !observationsQuery.isSuccess) return undefined;

  const filters = Object.entries(dimensionsSelection.dimensions).reduce(
    (acc, [key]) => {
      const dim = key as keyof typeof dimensionsSelection.dimensions;
      const selectedOptions = dimensionsSelection.dimensions[dim].value;
      const selectedOptionsSet = new Set(selectedOptions);
      const optionsSet = new Set(
        dimensionsSelection.dimensions[dim].options.map((option) => option.value)
      );
      const filterFn = (obs: Observation) =>
        // If there are no options, we don't filter
        optionsSet.size === 0 ||
        /**
         * @FIXME: This is a hack to manage inconsistent state where the dimension options are not
         * yet updated, and so the dimension values is not in the list of options - probably due to
         * the fact that the dimensionsSelectionAtom is not yet updated
         */
        !optionsSet.has(obs[dim] as string) ||
        selectedOptionsSet.has(obs[dim] as string);
      return [...acc, filterFn];
    },
    [] as Array<(obs: Observation) => boolean>
  );

  const timeFilterFn = mkTimeFilter(
    dimensionsSelection.time.range.value[0],
    dimensionsSelection.time.range.value[1],
    timeView === "Month" ? "month" : "year"
  );

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
  const locale = get(localeAtom);
  const dimensionsSelection = get(dimensionsSelectionAtom);
  const cubeIri = get(cubePathAtom);

  if (!cubeIri) return undefined;

  const fullCubeIri = addNamespace(cubeIri);
  const lindas = get(lindasAtom);
  const cubes = get(cubesStatusAtom);
  if (!cubes.isSuccess) return undefined;

  const cubeDefinition = cubes.data.find((cube) => cube.cube === cubeIri);

  const timeView = get(timeViewAtom);
  const timeFilter = getTimeFilter(
    {
      min: dimensionsSelection.time.range.dataRange[0],
      max: dimensionsSelection.time.range.dataRange[1],
      value: dimensionsSelection.time.range.value,
    },
    timeView
  );

  if (!cubeDefinition) return "";
  const filters = mapValues(dimensionsSelection.dimensions, (value) => {
    if (value) {
      return value.value;
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
    lang: locale,
  });

  return getSparqlEditorUrl(query, lindas.url);
});
