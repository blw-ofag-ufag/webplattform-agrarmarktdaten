import { queryObservations } from "@/lib/cube-queries";
import { addNamespace, amdpMeasure } from "@/lib/namespace";
import {
  Measure,
  Observation,
  Property,
  fetchObservations,
  getSparqlEditorUrl,
} from "@/pages/api/data";
import { toCamelCase } from "@/utils/stringCase";
import { atom } from "jotai";
import { atomsWithQueryAsync } from "jotai-tanstack-query";
import { mapValues } from "lodash";
import { mapToObj } from "remeda";
import { cubeDimensionsAtom, cubePathAtom, cubesAtom } from "./cubes";
import { DIMENSIONS, Dimension, dataDimensions } from "./dimensions";
import { filterDimensionsSelectionAtom } from "./filters";

/**
 * Observations atom. This atom contains the observations of the cube that we are currently viewing.
 * The observations are filtered by the selected dimensions.
 * Dimensions values on observations are not yet parsed, use parsedObservationsAtom for that.
 */
export const [observationsAtom, observationsQueryAtom] = atomsWithQueryAsync<
  ReturnType<typeof fetchObservations> extends Promise<infer T> ? T : never
>(async (get) => {
  const cubePath = await get(cubePathAtom);
  const cubes = await get(cubesAtom);
  const cubeDefinition = cubes.find((cube) => cube.cube === cubePath);

  if (!cubeDefinition)
    return {
      queryKey: ["observations"],
      queryFn: () => ({
        observations: [],
        query: "",
      }),
    };

  return {
    /* how to encode filter info needs to be improved */
    queryKey: ["observations", cubePath],
    queryFn: () =>
      fetchObservations({
        cubeIri: cubeDefinition.cube,
        measure: {
          iri: amdpMeasure(cubeDefinition.measure).value,
          key: cubeDefinition.measure,
        },
        filters: {},
      }),
  };
});

export const valueFormatter = ({
  value,
  dimension,
  cubeDimensions,
}: {
  value: string | number;
  dimension: string;
  cubeDimensions: Record<string, Property | Measure>;
}) => {
  const dim = cubeDimensions[dimension];
  if (dim && dim.type === "measure") {
    return value; /* @TODO: add number formatting using dimension range */
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
  const cubeDimensions = await get(cubeDimensionsAtom);

  return observations.observations.map((obs) =>
    Object.entries(obs).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [key]: valueFormatter({
          value: value as string | number,
          dimension: key,
          cubeDimensions: {
            ...cubeDimensions.properties,
            ...cubeDimensions.measures,
          },
        }),
      };
    }, {})
  );
});

/**
 * Filtered observations atom. This atom contains the observations of the cube that we are currently
 * viewing. The observations are filtered by the selected dimensions.
 */
export const filteredObservationsAtom = atom(async (get) => {
  const { observations } = await get(observationsAtom);
  const filterDimensionsSelection = await get(filterDimensionsSelectionAtom);

  const filters = Object.entries(filterDimensionsSelection).reduce(
    (acc, [key, atom]) => {
      const dim = key as Dimension;
      const selectedOptions = get(atom);
      const optionsSet = new Set(selectedOptions.map((option) => option.value));
      const filterFn = (obs: Observation) => optionsSet.has(obs[dim]);
      return [...acc, filterFn];
    },
    [] as Array<(obs: Observation) => boolean>
  );

  const filteredObservations = observations.filter((obs) =>
    filters.map((f) => f(obs)).every(Boolean)
  );

  return filteredObservations;
});

/**
 * Observations query atom. This atom contains the SPARQL query to fetch the observations of the
 * cube that we are currently viewing. The observations are filtered by the selected dimensions.
 */
export const observationsSparqlQueryAtom = atom(async (get) => {
  const filterDimensionsSelection = await get(filterDimensionsSelectionAtom);
  const cubeIri = await get(cubePathAtom);
  const fullCubeIri = addNamespace(cubeIri);
  const cubes = await get(cubesAtom);
  const cubeDefinition = cubes.find((cube) => cube.cube === cubeIri);

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
  });

  return getSparqlEditorUrl(query);
});
