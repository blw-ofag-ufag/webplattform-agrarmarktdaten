import { localeAtom } from "@/lib/use-locale";
import { HierarchyValue, fetchHierarchy } from "@/pages/api/data";
import { findInHierarchy } from "@/utils/trees";
import dayjs from "dayjs";
import { WritableAtom, atom } from "jotai";
import { atomWithHash } from "jotai-location";
import { atomsWithQuery } from "jotai-tanstack-query";
import { atomFamily } from "jotai/vanilla/utils";
import { isEqual } from "lodash";
import {
  baseDimensionsStatusAtom,
  cubeDimensionsStatusAtom,
  cubePathAtom,
  cubesStatusAtom,
  defaultCube,
} from "./cubes";
import { CubeDimension, Dimension, dataDimensions } from "./dimensions";
import { t } from "@lingui/macro";

export type Option = {
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  hierarchy?: {
    ["product-subgroup"]: {
      value?: string;
      label?: string;
    };
    ["product-group"]: {
      value?: string;
      label?: string;
    };
    market: {
      value?: string;
      label?: string;
    };
  };
};

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

const MIN_DATE = dayjs("2000-01");
const MAX_DATE = dayjs("2023-01");

export const timeRangeDefault = {
  min: MIN_DATE.unix(),
  max: MAX_DATE.unix(),
  value: [MIN_DATE.unix(), MAX_DATE.unix()] as [number, number],
};

export const timeViewAtom = atom<TimeView>("Year");

export const timeRangeAtom = atomWithHash("timeRange", timeRangeDefault);

/**
 *
 * Configuration for the cube filters (measure, value-chain, market). This filters affect which
 * cube we fetch.
 */
export const filterCubeConfigurationAtom = atom((get) => {
  const baseDimensions = get(baseDimensionsStatusAtom);
  const cubes = get(cubesStatusAtom);

  if (!baseDimensions.isSuccess || !cubes.isSuccess) return {};

  const defaultCubeDef = cubes.data.find((cube) => cube.cube === defaultCube);

  const defaultMeasure = baseDimensions.data.measure.find(
    (m) => m.dimension === defaultCubeDef?.measure
  );

  const measureOptions = baseDimensions.data.measure.map((m) => ({
    label: m.label,
    value: m.dimension,
  }));
  const marketOptions = baseDimensions.data.properties["market"].values.map((v) => ({
    label: v.label,
    value: v.value,
  }));
  const valueChainOptions = baseDimensions.data.properties["value-chain"].values.map((v) => ({
    label: v.label,
    value: v.value,
  }));

  return {
    measure: {
      name: t({ id: "data.filters.measure", message: "Measure" }),
      options: measureOptions,
      type: "single" as const,
      defaultOption: defaultMeasure
        ? { label: defaultMeasure.label, value: defaultMeasure.dimension }
        : measureOptions[0],
    },
    ["value-chain"]: {
      name:
        baseDimensions.data.properties["value-chain"]?.label ??
        baseDimensions.data.properties["value-chain"].dimension,
      options: valueChainOptions,
      type: "single" as const,
      defaultOption:
        baseDimensions.data.properties["value-chain"].values.find(
          (v) => v.value === defaultCubeDef?.valueChain
        ) ?? valueChainOptions[0],
    },
    market: {
      name:
        baseDimensions.data.properties["market"]?.label ??
        baseDimensions.data.properties["market"].dimension,
      options: marketOptions,
      type: "single" as const,
      defaultOption:
        baseDimensions.data.properties.market.values.find(
          (v) => v.value === defaultCubeDef?.market
        ) ?? marketOptions[0],
    },
  };
});

export const [productHierarchyAtom, productHierarchyStatusAtom] = atomsWithQuery((get) => {
  const locale = get(localeAtom);
  const cubeIri = get(cubePathAtom);

  return {
    queryKey: ["productHierarchy", cubeIri, locale],
    queryFn: () =>
      fetchHierarchy({
        locale,
        cubeIri: cubeIri,
        dimensionIri: dataDimensions.product.iri,
      }),
  };
});

export const getProductOptionsWithHierarchy = (
  hierarchy: HierarchyValue[],
  options: Option[]
): Option[] => {
  const productOptions = options.map((product) => {
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
      hierarchy: {
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
      },
    };
  });

  return productOptions;
};

export const productOptionsWithHierarchyAtom = atom((get) => {
  const hierarchy = get(productHierarchyStatusAtom);
  const cubeDimensions = get(cubeDimensionsStatusAtom);

  if (!cubeDimensions.isSuccess || !hierarchy.isSuccess) return [];

  const cubeProducts = cubeDimensions.data.properties["product"]?.values;

  return getProductOptionsWithHierarchy(hierarchy.data, cubeProducts);
});

/**
 * Configuration for the dimension filters (salesRegion, productionSystem, etc). This filters affect
 * which observations of the cube we fetch.
 */
export const filterDimensionsConfigurationAtom = atom((get) => {
  const cubeDimensions = get(cubeDimensionsStatusAtom);
  const productOptions = get(productOptionsWithHierarchyAtom);

  const configs = {} as Partial<Record<Dimension, Filter>>;

  if (!cubeDimensions.isSuccess) return configs;

  configs["sales-region"] = {
    key: "sales-region",
    name:
      cubeDimensions.data.properties[dataDimensions["sales-region"].id]?.label ?? "sales-region",
    options: cubeDimensions.data.properties?.[dataDimensions["sales-region"].id].values,
    type: "multi" as const,
    search: true,
    groups: undefined,
  };

  configs["product"] = {
    key: "product",
    name: cubeDimensions.data.properties?.[dataDimensions.product.id].label ?? "product",
    options: productOptions,
    type: "multi" as const,
    groups: [
      (d: Option) => d.hierarchy?.["market"].label ?? "market",
      (d: Option) => d.hierarchy?.["product-group"].label ?? "product-group",
      (d: Option) => d.hierarchy?.["product-subgroup"].label ?? "product-subgroup",
    ],
    search: true,
  };

  return configs;
});

/**
 *
 * Dimensions filter selection atoms. These atoms contain the selected values for each filter we
 * apply on dimensions when fetching observations.
 */
export const filterDimensionsSelectionAtom = atom((get) => {
  const filterDimensionsConfiguration = get(filterDimensionsConfigurationAtom);
  const productOptions = get(productOptionsWithHierarchyAtom);
  const cubeDimension = get(cubeDimensionsStatusAtom);

  const filters = {} as Partial<Record<Dimension, WritableAtom<Option[], any, void>>>;

  if (cubeDimension.isSuccess) {
    filters["sales-region"] = filterMultiHashAtomFamily({
      key: "sales-region",
      options: filterDimensionsConfiguration["sales-region"]?.options ?? [],
      defaultOptions: cubeDimension.data.properties["sales-region"].values,
    });
  }

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
export const filterCubeSelectionAtom = atom((get) => {
  const filterCubeConfiguration = get(filterCubeConfigurationAtom);

  const config = {} as Partial<Record<CubeDimension, WritableAtom<Option | undefined, any, void>>>;

  if (filterCubeConfiguration.measure) {
    config.measure = filterSingleHashAtomFamily({
      key: "measure",
      options: filterCubeConfiguration.measure.options,
      defaultOption: filterCubeConfiguration.measure.defaultOption,
    });
  }

  if (filterCubeConfiguration["value-chain"]) {
    config["value-chain"] = filterSingleHashAtomFamily({
      key: "value-chain",
      options: filterCubeConfiguration["value-chain"].options,
      defaultOption: filterCubeConfiguration["value-chain"].defaultOption,
    });
  }

  if (filterCubeConfiguration.market) {
    config.market = filterSingleHashAtomFamily({
      key: "market",
      options: filterCubeConfiguration.market.options,
      defaultOption: filterCubeConfiguration.market.defaultOption,
    });
  }

  return config;
});

/**
 * Read-write atom to manage reset filters feature. The atom value contains the number of filters
 * that don't have the default values. Its write function resets all filters to their default values.
 */
export const resetCubeFiltersAtom = atom(
  (get) => {
    const filterCubeSelection = get(filterCubeSelectionAtom);
    const filterCubeConfiguration = get(filterCubeConfigurationAtom);

    const filterDimensionsConfiguration = get(filterDimensionsConfigurationAtom);
    const filterDimensionsSelection = get(filterDimensionsSelectionAtom);

    const changedCubeFilters = Object.entries(filterCubeSelection).filter(([key, atom]) => {
      const defaultOptionValue =
        filterCubeConfiguration[key as CubeDimension]?.defaultOption?.value;
      return defaultOptionValue && atom && get(atom)?.value !== defaultOptionValue;
    });

    const changedDimensionsFilters = Object.entries(filterDimensionsSelection).filter(
      ([key, atom]) => !isEqual(get(atom), filterDimensionsConfiguration[key as Dimension]?.options)
    );

    return changedCubeFilters.length + changedDimensionsFilters.length;
  },
  (get, set) => {
    const filterCubeSelection = get(filterCubeSelectionAtom);
    const filterCubeConfiguration = get(filterCubeConfigurationAtom);

    const filterDimensionsConfiguration = get(filterDimensionsConfigurationAtom);
    const filterDimensionsSelection = get(filterDimensionsSelectionAtom);

    Object.entries(filterCubeSelection).forEach(([key, atom]) => {
      const defaultOption = filterCubeConfiguration[key as CubeDimension]?.defaultOption;
      if (defaultOption && atom) {
        set(atom, defaultOption);
      }
    });

    Object.entries(filterDimensionsSelection).forEach(([key, atom]) => {
      const defaultOptions = filterDimensionsConfiguration[key as Dimension]?.options;
      set(atom, defaultOptions);
    });
  }
);

/* Codecs to save state in URL hash */
export const multiOptionsCodec = <T extends Option>(options: T[]) => ({
  serialize: (value: Option[]) =>
    value.length === 0
      ? "None"
      : value.length === options.length
      ? "All"
      : value.map((v) => v.value).join(","),
  deserialize: (value: string) => {
    if (value === "None") return [];
    if (value === "All") return options;
    const values = value.split(",");
    const valuesOptions = options.filter((p) => values.includes(p.value));

    // This case covers the situation where the options have changed and the saved values are not in
    // the new options. In this case we return all the options.
    if (values.length > 0 && valuesOptions.length === 0) {
      return options;
    }

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
  ({ key, options, defaultOption }: { key: string; defaultOption: Option; options: Option[] }) => {
    return atomWithHash(key, defaultOption, optionCodec(options));
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
    isEqual(
      a.options.map((optA) => optA.value),
      b.options.map((optB) => optB.value)
    )
);
