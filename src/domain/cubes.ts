import { fetchBaseDimensions, fetchCubeDimensions, fetchCubes } from "@/pages/api/data";
import { atom } from "jotai";
import { atomsWithQuery, atomsWithQueryAsync } from "jotai-tanstack-query";
import { filterCubeSelectionAtom, timeViewAtom } from "./filters";
import { localeAtom } from "@/lib/use-locale";

export const [cubesAtom, cubesStatusAtom] = atomsWithQuery(() => ({
  queryKey: ["cubes"],
  queryFn: () => fetchCubes(),
}));

export const defaultCube = "cube/MilkDairyProducts/Production_Price_Year";

export const cubePathAtom = atom(async (get) => {
  const allCubes = await get(cubesAtom);
  const filterCubeSelection = await get(filterCubeSelectionAtom);

  const cubePath = allCubes.find(
    (cube) =>
      cube.valueChain === get(filterCubeSelection["value-chain"])?.value &&
      cube.market === get(filterCubeSelection.market)?.value &&
      cube.measure === get(filterCubeSelection.measure)?.value &&
      cube.timeView === get(timeViewAtom)
  );
  return cubePath?.cube || defaultCube;
});

/**
 * Base dimensions.
 * This atom contains the definitions of the base dimensions. These are dimensions that we use to
 * know which cube to fetch. They contain minimal information in order to render the respective
 * filters.
 */
export const [baseDimensionsAtom, baseDimensionsStatusAtom] = atomsWithQuery((get) => ({
  queryKey: ["baseDimensions", get(localeAtom)],
  queryFn: () => fetchBaseDimensions({ locale: get(localeAtom) }),
}));

export const availableBaseDimensionsValuesAtom = atom(async (get) => {
  const cubes = await get(cubesAtom);
  const filterCubeSelection = await get(filterCubeSelectionAtom);

  /**
   * This probably could be done in a more elegant way.
   */
  return {
    "value-chain": {
      options: cubes
        .filter(
          (c) =>
            c.measure === get(filterCubeSelection.measure)?.value &&
            c.market === get(filterCubeSelection.market)?.value
        )
        .map((c) => c.valueChain),
    },
    market: {
      options: cubes
        .filter(
          (c) =>
            c.measure === get(filterCubeSelection.measure)?.value &&
            c.valueChain === get(filterCubeSelection["value-chain"])?.value
        )
        .map((c) => c.market),
    },
    measure: {
      options: cubes
        .filter(
          (c) =>
            c.market === get(filterCubeSelection.market)?.value &&
            c.valueChain === get(filterCubeSelection["value-chain"])?.value
        )
        .map((c) => c.measure),
    },
  };
});

export const availableValueChainAtom = atom(async (get) => {
  const cubes = await get(cubesAtom);
  const filterCubeSelection = await get(filterCubeSelectionAtom);
  const measure = get(filterCubeSelection.measure);
  const availableChain = cubes
    .filter((cube) => cube.measure === measure?.value)
    .map((cube) => cube.valueChain);
  return availableChain;
});

export const availableMeasuresAtom = atom(async (get) => {
  const cubes = await get(cubesAtom);
  const filterCubeSelection = await get(filterCubeSelectionAtom);
  const valueChain = get(filterCubeSelection["value-chain"]);
  const measures = cubes
    .filter((cube) => cube.valueChain === valueChain?.value)
    .map((cube) => cube.measure);
  return measures;
});

/**
 * Cube dimensions.
 * This atom contains the definitions of the dimensions of the cube that we are currently viewing.
 */
export const [cubeDimensionsAtom, cubeDimensionsStatusAtom] = atomsWithQueryAsync(async (get) => {
  const cubePath = await get(cubePathAtom);
  const locale = get(localeAtom);
  return {
    queryKey: ["cubeDimensions", cubePath, locale],
    queryFn: () => fetchCubeDimensions(locale, cubePath),
  };
});
