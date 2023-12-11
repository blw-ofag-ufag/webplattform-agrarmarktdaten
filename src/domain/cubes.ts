import environmentsJson from "@/domain/lindas.json";
import { amdp } from "@/lib/namespace";
import { localeAtom } from "@/lib/use-locale";
import { fetchBaseDimensions, fetchCubeDimensions, fetchCubes } from "@/pages/api/data";
import { atom } from "jotai";
import { atomWithHash } from "jotai-location";
import { atomsWithQuery } from "jotai-tanstack-query";
import { cubeSelectionAtom, filterAtom, timeViewAtom } from "./filters";

type EnvironmentDescription = {
  label: string;
  url: EnvironmentUrl;
  value: Environment;
};

export type EnvironmentUrl =
  | "https://test.lindas.admin.ch"
  | "https://int.lindas.admin.ch"
  | "https://lindas.admin.ch";
export type Environment = "test" | "int" | "prod";

export const environments = environmentsJson as Record<Environment, EnvironmentDescription>;

export const lindasAtom = atomWithHash("env", environments.prod, {
  serialize: (value) => {
    if (environments?.[value.value as Environment]) {
      return environments[value.value as Environment].value;
    }
    return environments.prod.value;
  },
  deserialize: (value) => {
    const env = Object.values(environments).find((env) => env.value === value);
    return env ?? environments.prod;
  },
});

export const [cubesAtom, cubesStatusAtom] = atomsWithQuery((get) => {
  const environment = get(lindasAtom);
  return {
    queryKey: ["cubes", environment.value],
    queryFn: () => fetchCubes(environment.url),
    placeholderData: (previousData) => previousData,
  };
});

export const defaultCube = "cube/MilkDairyProducts/Production_Price_Year";

export const cubePathAtom = atom((get) => {
  const { status, data: allCubes } = get(cubesStatusAtom);
  const cubeSelection = get(cubeSelectionAtom);

  if (status !== "success") return;

  const cubePath = allCubes.find(
    (cube) =>
      cube.measure === cubeSelection.dimensions.measure.value?.value &&
      cube.market === cubeSelection.dimensions.market.value?.value &&
      cube.valueChain === cubeSelection.dimensions["value-chain"].value?.value &&
      cube.timeView === get(timeViewAtom)
  );
  return cubePath?.cube;
});

/**
 * Base dimensions.
 * This atom contains the definitions of the base dimensions. These are dimensions that we use to
 * know which cube to fetch. They contain minimal information in order to render the respective
 * filters.
 */
export const [baseDimensionsAtom, baseDimensionsStatusAtom] = atomsWithQuery((get) => ({
  queryKey: ["baseDimensions", get(localeAtom), get(lindasAtom).value],
  queryFn: () => fetchBaseDimensions({ locale: get(localeAtom), environment: get(lindasAtom).url }),
  placeholderData: (previousData) => previousData,
}));

export const availableBaseDimensionsValuesAtom = atom((get) => {
  const cubes = get(cubesStatusAtom);
  const timeView = get(timeViewAtom);
  const filters = get(filterAtom);

  /**
   * This probably could be done in a more elegant way.
   */
  return {
    "value-chain": {
      options: cubes.isSuccess
        ? cubes.data
            .filter(
              (c) =>
                c.measure === filters.cube.dimensions.measure.value?.value &&
                c.market === filters.cube.dimensions.market.value?.value &&
                c.timeView === timeView
            )
            .map((c) => c.valueChain)
        : [],
    },
    market: {
      options: cubes.isSuccess
        ? cubes.data
            .filter(
              (c) =>
                c.measure === filters.cube.dimensions.measure.value?.value &&
                c.valueChain === filters.cube.dimensions["value-chain"].value?.value &&
                c.timeView === timeView
            )
            .map((c) => c.market)
        : [],
    },
    measure: {
      options: cubes.isSuccess
        ? cubes.data
            .filter(
              (c) =>
                c.market === filters.cube.dimensions.market.value?.value &&
                c.valueChain === filters.cube.dimensions["value-chain"].value?.value &&
                c.timeView === timeView
            )
            .map((c) => c.measure)
        : [],
    },
  };
});

/**
 * Cube dimensions.
 * This atom contains the definitions of the dimensions of the cube that we are currently viewing.
 */
export const [cubeDimensionsAtom, cubeDimensionsStatusAtom] = atomsWithQuery((get) => {
  const cubePath = get(cubePathAtom);
  const lindas = get(lindasAtom);
  const locale = get(localeAtom);

  return {
    queryKey: ["cubeDimensions", cubePath, locale, lindas.value],
    queryFn: () => {
      if (!cubePath) {
        return Promise.reject(new Error("Cube not found"));
      }
      return fetchCubeDimensions(locale, lindas.url, cubePath);
    },
    placeholderData: (previousData) => previousData,
    skip: !cubePath,
  };
});

export type CubeDimensions = ReturnType<typeof fetchCubeDimensions> extends Promise<infer T>
  ? T
  : never;

export const visualizeUrlAtom = atom((get) => {
  const cubePath = get(cubePathAtom);
  const locale = get(localeAtom);

  const visualizeEndpoint = `https://int.visualize.admin.ch/${locale}`;

  return `${visualizeEndpoint}/browse?dataset=${encodeURIComponent(
    amdp(cubePath).value
  )}&dataSource=Int`;
});
