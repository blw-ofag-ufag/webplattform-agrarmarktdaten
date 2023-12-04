import environmentsJson from "@/domain/lindas.json";
import { amdp } from "@/lib/namespace";
import { localeAtom } from "@/lib/use-locale";
import { fetchBaseDimensions, fetchCubeDimensions, fetchCubes } from "@/pages/api/data";
import { atom } from "jotai";
import { atomWithHash } from "jotai-location";
import { atomsWithQuery } from "jotai-tanstack-query";
import { isEmpty } from "lodash";
import { filterCubeSelectionAtom, timeViewAtom } from "./filters";

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

export const lindasAtom = atomWithHash("lindas", environments.int, {
  serialize: (value) => {
    if (environments?.[value.value as Environment]) {
      return environments[value.value as Environment].value;
    }
    return environments.int.value;
  },
  deserialize: (value) => {
    const env = Object.values(environments).find((env) => env.value === value);
    return env ?? environments.int;
  },
});

export const [cubesAtom, cubesStatusAtom] = atomsWithQuery((get) => {
  const environment = get(lindasAtom);
  return {
    queryKey: ["cubes", environment.value],
    queryFn: () => fetchCubes(environment.url),
  };
});

export const defaultCube = "cube/MilkDairyProducts/Production_Price_Year";

export const cubePathAtom = atom((get) => {
  const { status, data: allCubes } = get(cubesStatusAtom);
  const filterCubeSelection = get(filterCubeSelectionAtom);

  if (status !== "success" || isEmpty(filterCubeSelection)) return defaultCube;

  const cubePath = allCubes.find(
    (cube) =>
      (filterCubeSelection["value-chain"]
        ? cube.valueChain === get(filterCubeSelection["value-chain"])?.value
        : true) &&
      (filterCubeSelection.market
        ? cube.market === get(filterCubeSelection.market)?.value
        : true) &&
      (filterCubeSelection.measure
        ? cube.measure === get(filterCubeSelection.measure)?.value
        : true) &&
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
  queryKey: ["baseDimensions", get(localeAtom), get(lindasAtom).value],
  queryFn: () => fetchBaseDimensions({ locale: get(localeAtom), environment: get(lindasAtom).url }),
}));

export const availableBaseDimensionsValuesAtom = atom((get) => {
  const cubes = get(cubesStatusAtom);
  const filterCubeSelection = get(filterCubeSelectionAtom);

  /**
   * This probably could be done in a more elegant way.
   */
  return {
    "value-chain": {
      options: cubes.isSuccess
        ? cubes.data
            .filter(
              (c) =>
                (filterCubeSelection.measure
                  ? c.measure === get(filterCubeSelection.measure)?.value
                  : true) &&
                (filterCubeSelection.market
                  ? c.market === get(filterCubeSelection.market)?.value
                  : true)
            )
            .map((c) => c.valueChain)
        : [],
    },
    market: {
      options: cubes.isSuccess
        ? cubes.data
            .filter(
              (c) =>
                (filterCubeSelection.measure
                  ? c.measure === get(filterCubeSelection.measure)?.value
                  : true) &&
                (filterCubeSelection["value-chain"]
                  ? c.valueChain === get(filterCubeSelection["value-chain"])?.value
                  : true)
            )
            .map((c) => c.market)
        : [],
    },
    measure: {
      options: cubes.isSuccess
        ? cubes.data
            .filter(
              (c) =>
                (filterCubeSelection.market
                  ? c.market === get(filterCubeSelection.market)?.value
                  : true) &&
                (filterCubeSelection["value-chain"]
                  ? c.valueChain === get(filterCubeSelection["value-chain"])?.value
                  : true)
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
    queryFn: () => fetchCubeDimensions(locale, lindas.url, cubePath),
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
