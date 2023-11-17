import { localeAtom } from "@/lib/use-locale";
import { fetchHierarchy } from "@/pages/api/data";
import { findInHierarchy } from "@/utils/trees";
import dayjs from "dayjs";
import { Atom, atom } from "jotai";
import { atomWithHash } from "jotai-location";
import { atomsWithQueryAsync } from "jotai-tanstack-query";
import { atomFamily } from "jotai/vanilla/utils";
import {
  baseDimensionsAtom,
  cubeDimensionsAtom,
  cubePathAtom,
  cubesAtom,
  defaultCube,
} from "./cubes";
import { Dimension, dataDimensions } from "./dimensions";

export type Option = {
  label: string;
  value: string;
  checked?: boolean;
} & { [key: string]: $FixMe };

export type Filter = {
  name: string;
  options: Option[];
  type: "single" | "multi";
  key: string;
  search?: boolean;
  groups?: Array<(d: $FixMe) => string>;
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

export const [productHierarchyAtom, productHierarchyStatusAtom] = atomsWithQueryAsync(
  async (get) => {
    const locale = get(localeAtom);
    const cubeIri = await get(cubePathAtom);

    return {
      queryKey: ["productHierarchy", locale],
      queryFn: () =>
        fetchHierarchy({
          locale,
          cubeIri,
          dimensionIri: dataDimensions.product.iri,
        }),
    };
  }
);

export const productOptionsWithHierarchyAtom = atom(async (get) => {
  const hierarchy = await get(productHierarchyAtom);
  const cubeDimensions = await get(cubeDimensionsAtom);

  const cubeProducts = cubeDimensions.properties["product"]?.values;

  const productOptions = cubeProducts.map((product) => {
    const subgroup = findInHierarchy(
      hierarchy,
      (node) => !!node.children.find((c) => c.value === product.value)
    );
    const group = findInHierarchy(
      hierarchy,
      (node) => !!node.children.find((c) => c.value === subgroup?.value)
    );
    const market = findInHierarchy(
      hierarchy,
      (node) => !!node.children.find((c) => c.value === group?.value)
    );

    return {
      value: product.value,
      label: product.label,
      ["product-subgroup"]: {
        value: subgroup?.value,
        label: subgroup?.label,
      },
      ["product-group"]: {
        value: group?.value,
        label: group?.label,
      },
      market: {
        value: market?.value,
        label: market?.label,
      },
    };
  });

  return productOptions;
});

/**
 * Configuration for the dimension filters (salesRegion, productionSystem, etc). This filters affect
 * which observations of the cube we fetch.
 */
export const filterDimensionsConfigurationAtom = atom(async (get) => {
  const cubeDimensions = await get(cubeDimensionsAtom);
  const productOptions = await get(productOptionsWithHierarchyAtom);

  return {
    ["sales-region" as Dimension]: {
      key: "sales-region",
      name: cubeDimensions.properties[dataDimensions["sales-region"].id].label,
      options: cubeDimensions.properties?.[dataDimensions["sales-region"].id].values,
      type: "multi" as const,
      search: true,
    },
    ["product" as Dimension]: {
      key: "product",
      name: cubeDimensions.properties?.[dataDimensions.product.id].label,
      options: productOptions,
      type: "multi" as const,
      groups: [
        (d: $FixMe) => d["market"].label,
        (d: $FixMe) => d["product-group"].label,
        (d: $FixMe) => d["product-subgroup"].label,
      ],
      search: true,
    },
  };
});

/**
 *
 * Dimensions filter selection atoms. These atoms contain the selected values for each filter we
 * apply on dimensions when fetching observations.
 */
export const filterDimensionsSelectionAtom = atom(async (get) => {
  const filterDimensionsConfiguration = await get(filterDimensionsConfigurationAtom);
  const productOptions = await get(productOptionsWithHierarchyAtom);

  const cubeDimension = await get(cubeDimensionsAtom);

  const filters = {} as Partial<Record<Dimension, Atom<Option[]>>>;

  filters["sales-region"] = filterMultiHashAtomFamily({
    key: "sales-region",
    options: filterDimensionsConfiguration["sales-region"].options,
    defaultOptions: cubeDimension.properties["sales-region"].values,
  });

  filters["product"] = filterMultiHashAtomFamily({
    key: "product",
    options: productOptions,
    defaultOptions: productOptions,
  });

  return filters;
});

/**
 * Cube filter selection atoms. These atoms contain the selected values for each filter we apply on
 * selecting the cube we fetch.
 */
export const filterCubeSelectionAtom = atom(async (get) => {
  const filterCubeConfiguration = await get(filterCubeConfigurationAtom);
  const baseDimensions = await get(baseDimensionsAtom);
  const cubes = await get(cubesAtom);
  const defaultCubeDef = cubes.find((cube) => cube.cube === defaultCube);

  const defaultMeasure = baseDimensions.measure.find(
    (m) => m.dimension === defaultCubeDef?.measure
  );

  return {
    measure: filterSingleHashAtomFamily({
      key: "measure",
      options: filterCubeConfiguration.measure.options,
      defaultOption: defaultMeasure
        ? { label: defaultMeasure.label, value: defaultMeasure.dimension }
        : filterCubeConfiguration.measure.options[0],
    }),
    ["value-chain"]: filterSingleHashAtomFamily({
      key: "valueChain",
      options: filterCubeConfiguration["value-chain"].options,
      defaultOption: baseDimensions.properties["value-chain"].values.find(
        (v) => v.value === defaultCubeDef?.valueChain
      ),
    }),
    market: filterSingleHashAtomFamily({
      key: "market",
      options: filterCubeConfiguration.market.options,
      defaultOption: baseDimensions.properties.market.values.find(
        (v) => v.value === defaultCubeDef?.market
      ),
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

/* Hashing and Codecs */

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
  ({ key, options, defaultOption }: { key: string; defaultOption?: Option; options: Option[] }) => {
    const initialValue = defaultOption ?? options[0];
    return atomWithHash(key, initialValue, optionCodec(options));
  },
  (a, b) => a.key === b.key
);

export const filterMultiHashAtomFamily = atomFamily(
  ({
    key,
    options,
    defaultOptions,
  }: {
    key: string;
    options: Option[];
    defaultOptions?: Option[];
  }) => {
    return atomWithHash(key, defaultOptions ?? options, multiOptionsCodec(options));
  },
  (a, b) =>
    a.key === b.key &&
    new Set(a.options.map((optA) => optA.value)) === new Set(b.options.map((optB) => optB.value))
);
