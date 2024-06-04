import environmentsJson from "@/domain/lindas.json";
import { amdp } from "@/lib/namespace";
import { localeAtom } from "@/lib/use-locale";
import { fetchBaseDimensions, fetchCubeDimensions, fetchCubes } from "@/pages/api/data";
import { atom } from "jotai";
import { atomWithHash } from "jotai-location";
import { atomsWithQuery } from "jotai-tanstack-query";
import { cubeSelectionAtom, filterAtom, timeViewAtom } from "./filters";
import { omit } from "remeda";

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

  if (status !== "success") return defaultCube;

  const cubePath = allCubes.find(
    (cube) =>
      cube.measure === cubeSelection.dimensions.measure.value &&
      cube.market === cubeSelection.dimensions.market.value &&
      cube.valueChain === cubeSelection.dimensions["value-chain"].value &&
      cube.timeView === get(timeViewAtom)
  );

  if (!cubePath?.cube) {
    console.warn("Could not find cube, see allCubes, and cubeSelection", allCubes, cubeSelection);
    return defaultCube;
  }

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

  const cubeDimensionFilters = filters.cube.dimensions;
  const cubesData = cubes.isSuccess ? cubes.data : [];
  const sieve = {
    measure: cubeDimensionFilters.measure.value,
    valueChain: cubeDimensionFilters["value-chain"].value,
    market: cubeDimensionFilters.market.value,
    timeView: timeView,
  };

  type CubeData = (typeof cubesData)[number];

  return {
    "value-chain": {
      options: cubesData
        .filter(partialEqual<CubeData>(omit(sieve, ["valueChain"])))
        .map((c) => c.valueChain),
    },
    market: {
      options: cubesData
        .filter(partialEqual<CubeData>(omit(sieve, ["market"])))
        .map((c) => c.market),
    },
    measure: {
      options: cubesData
        .filter(partialEqual<CubeData>(omit(sieve, ["measure"])))
        .map((c) => c.measure),
    },
  };
});

const partialEqual =
  <T>(partial: Partial<T>) =>
  (item: T) => {
    return Object.keys(partial).every((k_) => {
      const k = k_ as keyof typeof partial;
      return partial[k] === item[k];
    });
  };

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
        throw new Error(`No cube path`);
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
