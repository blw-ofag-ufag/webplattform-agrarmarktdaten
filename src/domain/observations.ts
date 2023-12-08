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
import { dimensionsSelectionAtom } from "./filters";
import { cubeDimensionsStatusAtom, cubePathAtom, cubesStatusAtom, lindasAtom } from "./cubes";
import { DIMENSIONS, dataDimensions } from "./dimensions";
import { RangeOptions, TimeView, timeRangeAtom, timeViewAtom } from "./filters";

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
  const cubePath = get(cubePathAtom);
  const cubes = get(cubesStatusAtom);
  const lindas = get(lindasAtom);

  const cubeDefinition = cubes.isSuccess
    ? cubes.data.find((cube) => cube.cube === cubePath)
    : undefined;

  const timeRange = get(timeRangeAtom);
  const timeView = get(timeViewAtom);
  const timeFilter = getTimeFilter(timeRange, timeView);

  // Time filters are done client-side
  const queryTimeFilter = { minDate: null, maxDate: null, mode: timeFilter.mode };

  return {
    queryKey: ["observations", cubePath, lindas.value, queryTimeFilter],
    queryFn: () => {
      if (!cubeDefinition) {
        return Promise.reject(new Error("Cube not found"));
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
    retry: false,
    placeholderData: (previousData) => previousData,
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

  return observations.observations.map((obs) =>
    Object.entries(obs).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [key]: tableFormatter({
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
  const dimensionsSelection = get(dimensionsSelectionAtom);
  const timeRange = get(timeRangeAtom);

  if (!observationsQuery.data) return undefined;

  const filters = Object.entries(dimensionsSelection).reduce(
    (acc, [key]) => {
      const dim = key as keyof typeof dimensionsSelection;
      const selectedOptions = dimensionsSelection[dim].value;
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
  const dimensionsSelection = get(dimensionsSelectionAtom);
  const cubeIri = get(cubePathAtom);

  if (!cubeIri) return undefined;

  const fullCubeIri = addNamespace(cubeIri);
  const lindas = get(lindasAtom);
  const cubes = get(cubesStatusAtom);
  if (!cubes.isSuccess) return undefined;

  const cubeDefinition = cubes.data.find((cube) => cube.cube === cubeIri);

  const timeRange = get(timeRangeAtom);
  const timeView = get(timeViewAtom);
  const timeFilter = getTimeFilter(timeRange, timeView);

  if (!cubeDefinition) return "";
  const filters = mapValues(dimensionsSelection, (value) => {
    if (value) {
      const selectedOptions = value.value;
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
