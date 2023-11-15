import { amdpMeasure } from "@/lib/namespace";
import { Measure, Observation, Property, fetchObservations } from "@/pages/api/data";
import { atom } from "jotai";
import { atomsWithQueryAsync } from "jotai-tanstack-query";
import { cubePathAtom, cubesAtom } from "./cubes";
import { cubeDimensionsAtom } from "./dimensions";
import { filterDimensionsSelectionAtom } from "./filters";

/**
 * Observations atom. This atom contains the observations of the cube that we are currently viewing.
 * The observations are filtered by the selected dimensions.
 * Dimensions values on observations are not yet parsed, use parsedObservationsAtom for that.
 */
export const [observationsAtom, observationsStatusAtom] = atomsWithQueryAsync<
  Observation[] | Promise<Observation[]>
>(async (get) => {
  const cubePath = await get(cubePathAtom);
  const cubes = await get(cubesAtom);
  const filterDimensionsSelection = await get(filterDimensionsSelectionAtom);

  const cubeDefinition = cubes.find((cube) => cube.cube === cubePath);

  const filters = Object.entries(filterDimensionsSelection).reduce(
    (acc, [key, atom]) => {
      const selectedOptions = get(atom);
      if (atom) {
        return {
          ...acc,
          [key]: selectedOptions.map((option) => option.value),
        };
      }
      return acc;
    },
    {} as Record<string, string[]>
  );

  if (!cubeDefinition) return { queryKey: ["observations"], queryFn: () => [] };

  return {
    /* how to encode filter info needs to be improved */
    queryKey: ["observations", cubePath, JSON.stringify(filters)],
    queryFn: () =>
      fetchObservations({
        cubeIri: cubeDefinition.cube,
        measure: {
          iri: amdpMeasure(cubeDefinition.measure).value,
          key: cubeDefinition.measure,
        },
        filters,
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

  return observations.map((obs) =>
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
