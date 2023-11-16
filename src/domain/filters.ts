import dayjs from "dayjs";
import { atom } from "jotai";
import { atomWithHash } from "jotai-location";
import { atomFamily } from "jotai/vanilla/utils";
import { DIMENSION_FILTERS, baseDimensionsAtom, cubeDimensionsAtom } from "./dimensions";

export type Option = {
  label: string;
  value: string;
  checked?: boolean;
} & { [key: string]: string };

export type Filter = {
  name: string;
  options: Option[];
  type: "single" | "multi";
  key: string;
  search?: boolean;
};

export type FilterConfig = {
  cubes: {
    measure: Filter;
    ["value-chain"]: Filter;
    market: Filter;
  };
  dimensions: Record<string, Filter>;
};

/* Time */

export type RangeOptions = {
  min: number;
  max: number;
  value: [number, number];
};

export type TimeView = "Year" | "Month";

const MIN_DATE = dayjs("2020-01");
const MAX_DATE = dayjs("2023-01");

export const timeRange = {
  min: MIN_DATE.unix(),
  max: MAX_DATE.unix(),
  value: [MIN_DATE.unix(), MAX_DATE.unix()] as [number, number],
};

export const timeViewAtom = atom<TimeView>("Year");
export const timeRangeAtom = atomWithHash<RangeOptions>("timeRange", timeRange);

/**
 * Configuration for the cube filters (measure, value-chain, market). This filters affect which
 * cube we fetch.
 */
export const filterCubeConfigurationAtom = atom(async (get) => {
  const baseDimensions = await get(baseDimensionsAtom);

  return {
    measure: {
      name: "Measure",
      options: baseDimensions.measure.map((m) => ({ label: m.label, value: m.dimension })),
      type: "single" as const,
    },
    ["value-chain"]: {
      name:
        baseDimensions.properties["value-chain"]?.label ??
        baseDimensions.properties["value-chain"].dimension,
      options: baseDimensions.properties["value-chain"].values.map((v) => ({
        label: v.label,
        value: v.value,
      })),
      type: "single" as const,
    },
    market: {
      name:
        baseDimensions.properties["market"]?.label ?? baseDimensions.properties["market"].dimension,
      options: baseDimensions.properties["market"].values.map((v) => ({
        label: v.label,
        value: v.value,
      })),
      type: "single" as const,
    },
  };
});

type DimensionIri = string;

/**
 * Configuration for the dimension filters (salesRegion, productionSystem, etc). This filters affect
 * which observations of the cube we fetch.
 */
export const filterDimensionsConfigurationAtom = atom(async (get) => {
  const cubeDimensions = await get(cubeDimensionsAtom);

  const dimensions = DIMENSION_FILTERS.reduce(
    (acc, dimension) => {
      const dim = cubeDimensions[dimension.dimension];
      if (dim && dim.type === "property") {
        return {
          ...acc,
          [dimension.dimension]: {
            key: dimension.dimension,
            name: dim.label ?? dimension.dimension,
            options: dim.values,
            type: "multi" as const,
            search: dimension.search,
          },
        };
      }
      return acc;
    },
    {} as Record<DimensionIri, Filter>
  );
  return dimensions;
});

/**
 *
 * Dimensions filter selection atoms. These atoms contain the selected values for each filter we
 * apply on dimensions when fetching observations.
 */
export const filterDimensionsSelectionAtom = atom(async (get) => {
  const filterDimensionsConfiguration = await get(filterDimensionsConfigurationAtom);
  return {
    ...Object.fromEntries(
      Object.entries(filterDimensionsConfiguration).map(([key, filter]) => [
        key,
        filterMultiHashAtomFamily({
          key,
          options: filter.options,
        }),
      ])
    ),
  };
});

/**
 * Cube filter selection atoms. These atoms contain the selected values for each filter we apply on
 * selecting the cube we fetch.
 */
export const filterCubeSelectionAtom = atom(async (get) => {
  const filterCubeConfiguration = await get(filterCubeConfigurationAtom);
  return {
    measure: filterSingleHashAtomFamily({
      key: "measure",
      options: filterCubeConfiguration.measure.options,
    }),
    ["value-chain"]: filterSingleHashAtomFamily({
      key: "valueChain",
      options: filterCubeConfiguration["value-chain"].options,
    }),
    market: filterSingleHashAtomFamily({
      key: "market",
      options: filterCubeConfiguration.market.options,
    }),
  };
});

/**
 * Atom that contains the configuration for all filters.
 * cube: configuration for the cube filters, on which cube we fetch.
 * dimensions: configuration for the dimension filters, on observations.
 */
export const filterConfigurationAtom = atom(async (get) => {
  const filterCubeConfiguration = await get(filterCubeConfigurationAtom);
  const filterDimensionsConfiguration = await get(filterDimensionsConfigurationAtom);
  return {
    cube: filterCubeConfiguration,
    dimensions: filterDimensionsConfiguration,
  };
});

/* Codecs to save state in URL hash */
export const multiOptionsCodec = <T extends Option>(options: T[]) => ({
  serialize: (value: Option[]) =>
    value.length === 0 ? "None" : value.map((v) => v.value).join(","),
  deserialize: (value: string) => {
    if (value === "None") return [];
    const values = value.split(",");
    return options.filter((p) => values.includes(p.value));
  },
});

export const optionCodec = <T extends Option>(options: T[]) => ({
  serialize: (value?: Option) => (value ? value.value : ""),
  deserialize: (value: string) => {
    const option = options.find((o) => o.value === value);
    if (option) {
      return option as Option;
    }
  },
});

export const filterSingleHashAtomFamily = atomFamily(
  ({ key, options }: { key: string; options: Option[] }) => {
    const defaultOption = options[0];
    return atomWithHash(key, defaultOption, optionCodec(options));
  },
  (a, b) => a.key === b.key
);

export const filterMultiHashAtomFamily = atomFamily(
  ({ key, options }: { key: string; options: Option[] }) => {
    return atomWithHash(key, options, multiOptionsCodec(options));
  },
  (a, b) => a.key === b.key
);
