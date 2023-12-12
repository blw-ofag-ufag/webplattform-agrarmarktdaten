import { localeAtom } from "@/lib/use-locale";
import { HierarchyValue, Observation, fetchHierarchy } from "@/pages/api/data";
import { findInHierarchy } from "@/utils/trees";
import { t } from "@lingui/macro";
import dayjs from "dayjs";
import { atom } from "jotai";
import { atomWithHash } from "jotai-location";
import { atomsWithQuery } from "jotai-tanstack-query";
import { atomFamily } from "jotai/vanilla/utils";
import { isEmpty, isEqual, maxBy, minBy } from "lodash";
import {
  baseDimensionsStatusAtom,
  cubeDimensionsStatusAtom,
  cubePathAtom,
  lindasAtom,
} from "./cubes";
import { dataDimensions } from "./dimensions";
import { observationsQueryAtom } from "./observations";

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

export const DEFAULT_TIME_RANGE = {
  min: MIN_DATE.unix(),
  max: MAX_DATE.unix(),
  value: [MIN_DATE.unix(), MAX_DATE.unix()] as [number, number],
};

export const DEFAULT_TIME_VIEW = "Month";
export const timeViewAtom = atomWithHash<TimeView>("timeView", DEFAULT_TIME_VIEW);

/**
 * Make sure this combination of filters is a valid cube.
 */
const DEFAULT_MARKET = "market/1";
const DEFAULT_VALUE_CHAIN = "value-chain/1";
const DEFAULT_MEASURE = "price";

/**
 * Cube selection atom. This atoms contains the information on the filters that we apply to select
 * the cube we fetch.
 */
export const cubeSelectionAtom = atom((get) => {
  const baseDimensionsQuery = get(baseDimensionsStatusAtom);

  const measureOptions = baseDimensionsQuery.isSuccess
    ? baseDimensionsQuery.data.measure.map((m) => ({
        value: m.dimension,
        label: m.label,
      }))
    : [];

  const measureAtom = filterSingleHashAtomFamily({
    key: "measure",
    options: measureOptions.map((m) => m.value),
    defaultOption: measureOptions.find((option) => option.value === DEFAULT_MEASURE)?.value,
  });

  const marketOptions = baseDimensionsQuery.isSuccess
    ? baseDimensionsQuery.data.properties.market.values
    : [];

  const marketAtom = filterSingleHashAtomFamily({
    key: "market",
    options: marketOptions.map((m) => m.value),
    defaultOption: marketOptions.find((option) => option.value === DEFAULT_MARKET)?.value,
  });

  const valueChainOptions = baseDimensionsQuery.isSuccess
    ? baseDimensionsQuery.data.properties["value-chain"].values
    : [];

  const valueChainAtom = filterSingleHashAtomFamily({
    key: "value-chain",
    options: valueChainOptions.map((m) => m.value),
    defaultOption: valueChainOptions.find((option) => option.value === DEFAULT_VALUE_CHAIN)?.value,
  });

  return {
    dimensions: {
      measure: {
        name: t({ id: "data.filters.measure", message: "Measure" }),
        value: get(measureAtom),
        options: measureOptions,
        atom: measureAtom,
        default: DEFAULT_MEASURE,
        isChanged: get(measureAtom) !== DEFAULT_MEASURE,
      },
      market: {
        name: baseDimensionsQuery?.data?.properties.market?.label,
        atom: marketAtom,
        value: get(marketAtom),
        options: marketOptions,
        default: DEFAULT_MARKET,
        isChanged: get(marketAtom) !== DEFAULT_MARKET,
      },
      "value-chain": {
        name: baseDimensionsQuery?.data?.properties["value-chain"]?.label,
        atom: valueChainAtom,
        value: get(valueChainAtom),
        options: valueChainOptions,
        default: DEFAULT_VALUE_CHAIN,
        isChanged: get(valueChainAtom) !== DEFAULT_VALUE_CHAIN,
      },
    },
    time: {
      view: {
        atom: timeViewAtom,
        value: get(timeViewAtom),
        default: "Year",
        isChanged: get(timeViewAtom) !== DEFAULT_TIME_VIEW,
      },
    },
    isLoading: baseDimensionsQuery.isLoading,
    isSuccess: baseDimensionsQuery.isSuccess,
    isError: baseDimensionsQuery.isError,
  };
});

const getDefaultTimeRange = (
  observations: Observation[]
): {
  min: number;
  max: number;
} => {
  const minDate = minBy(observations, (d) => dayjs(d.date))?.date;
  const maxDate = maxBy(observations, (d) => dayjs(d.date))?.date;

  const min = minDate ? dayjs(minDate).unix() : DEFAULT_TIME_RANGE.min;
  const max = maxDate ? dayjs(maxDate).unix() : DEFAULT_TIME_RANGE.max;
  return {
    min,
    max,
  };
};

/**
 * Dimensions selection atom. This atoms contains the information on the filters on the cube dimensions.
 * This is then used to filter the observations of the cube we fetch.
 */
export const dimensionsSelectionAtom = atom((get) => {
  const cubeDimensionsQuery = get(cubeDimensionsStatusAtom);
  const productOptions = get(productOptionsWithHierarchyAtom);
  const observationsQuery = get(observationsQueryAtom);
  const productHierarchyQuery = get(productHierarchyStatusAtom);

  const productsAtom = filterMultiHashAtomFamily({
    key: "products",
    options: productOptions.map((p) => p.value),
  });

  const salesRegionOptions =
    cubeDimensionsQuery.isSuccess && !isEmpty(cubeDimensionsQuery.data)
      ? cubeDimensionsQuery.data.properties["sales-region"].values
      : [];

  const salesRegionAtom = filterMultiHashAtomFamily({
    key: "salesRegion",
    options: salesRegionOptions.map((p) => p.value),
  });

  const defaultTimeRange = observationsQuery.isSuccess
    ? getDefaultTimeRange(observationsQuery.data.observations)
    : DEFAULT_TIME_RANGE;

  console.log({ defaultTimeRange });

  const timeRangeAtom = filterTimeRangeHashAtomFamily({
    key: "timeRange",
    value: [defaultTimeRange.min, defaultTimeRange.max],
    defaultRange: [defaultTimeRange.min, defaultTimeRange.max],
  });

  return {
    dimensions: {
      product: {
        name: cubeDimensionsQuery?.data?.properties["product"]?.label ?? "product",
        options: productOptions,
        atom: productsAtom,
        value: get(productsAtom),
        search: true,
        isChanged: get(productsAtom).length < productOptions.length,
        groups: [
          (d: Option) => d.hierarchy?.["market"].label ?? "market",
          (d: Option) => d.hierarchy?.["product-group"].label ?? "product-group",
          (d: Option) => d.hierarchy?.["product-subgroup"].label ?? "product-subgroup",
        ],
      },
      "sales-region": {
        name: cubeDimensionsQuery?.data?.properties["sales-region"]?.label ?? "sales-region",
        options: salesRegionOptions,
        atom: salesRegionAtom,
        value: get(salesRegionAtom),
        search: true,
        isChanged: get(salesRegionAtom).length < salesRegionOptions.length,
        groups: undefined,
      },
    },
    time: {
      range: {
        atom: timeRangeAtom,
        value: get(timeRangeAtom),
        dataRange: [defaultTimeRange.min, defaultTimeRange.max] as [number, number],
        isChanged:
          get(timeRangeAtom)[0] > defaultTimeRange.min ||
          get(timeRangeAtom)[1] < defaultTimeRange.max,
      },
    },
    isLoading: cubeDimensionsQuery.isLoading || productHierarchyQuery.isLoading,
    isSuccess: cubeDimensionsQuery.isSuccess && productHierarchyQuery.isSuccess,
    isError: cubeDimensionsQuery.isError || productHierarchyQuery.isError,
  };
});

/**
 * Filter atom. This atom contains the information on the filters that we apply, both to select the
 * cube we fetch and to filter the observations of the cube we fetch. Additionally, it contains the
 * total number of filters applied and the number of filters that have changed from their default.
 * The set function of this atom, can be used to apply actions to the filters, currently only
 * "reset" action is available -> resets all filters to their default values.
 *
 * Be careful when using this atom directly in other atoms to avoid circular dependencies. If you
 * run into circular dependencies, try using `cubeSelectionAtom` and `dimensionsSelectionAtom`
 * instead.
 */
export const filterAtom = atom(
  (get) => {
    const filterCubeSelection = get(cubeSelectionAtom);
    const filterDimensionsSelection = get(dimensionsSelectionAtom);

    const changedCubeFilters = Object.values(filterCubeSelection.dimensions).filter(
      (value) => value.isChanged
    );
    const changedDimensionFilters = Object.values(filterDimensionsSelection.dimensions).filter(
      (value) => value.isChanged
    );

    return {
      cube: filterCubeSelection,
      dimensions: filterDimensionsSelection,
      total:
        Object.values(filterCubeSelection).length + Object.values(filterDimensionsSelection).length,
      changed:
        changedCubeFilters.length +
        changedDimensionFilters.length +
        (filterCubeSelection.time.view.isChanged || filterDimensionsSelection.time.range.isChanged
          ? 1
          : 0),
    };
  },
  (get, set, { action }: { action: "reset" }) => {
    const filterCubeSelection = get(cubeSelectionAtom);
    const filterDimensionsSelection = get(dimensionsSelectionAtom);

    switch (action) {
      case "reset":
        Object.values(filterCubeSelection.dimensions).forEach((filter) => {
          set(filter.atom, filter.options.find((option) => option.value === filter.default)?.value);
        });

        Object.values(filterDimensionsSelection.dimensions).forEach((filter) => {
          set(
            filter.atom,
            filter.options.map((option) => option.value)
          );
        });

        set(timeViewAtom, DEFAULT_TIME_VIEW);
        set(
          filterDimensionsSelection.time.range.atom,
          filterDimensionsSelection.time.range.dataRange
        );
        break;
    }
  }
);

export const [productHierarchyAtom, productHierarchyStatusAtom] = atomsWithQuery((get) => {
  const locale = get(localeAtom);
  const cubeIri = get(cubePathAtom);

  return {
    queryKey: ["productHierarchy", cubeIri, locale],
    queryFn: () => {
      if (!cubeIri) {
        return Promise.reject(new Error("Cube not found"));
      }
      return fetchHierarchy({
        locale,
        cubeIri: cubeIri,
        dimensionIri: dataDimensions.product.iri,
        environment: get(lindasAtom).url,
      });
    },
    placeholderData: (previousData) => previousData,
    skip: !cubeIri,
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

  if (!cubeProducts) return [];

  return getProductOptionsWithHierarchy(hierarchy.data, cubeProducts);
});

/* Codecs to save state in URL hash */
export const multiOptionsCodec = (options: string[]) => ({
  serialize: (value: string[]) =>
    value.length === 0 ? "None" : value.length === options.length ? "All" : value.join(","),
  deserialize: (value: string) => {
    if (value === "None") return [];
    if (value === "All") return options;
    const values = value.split(",");
    const valuesOptions = options.filter((p) => values.includes(p));

    // This case covers the situation where the options have changed and the saved values are not in
    // the new options. In this case we return all the options.
    if (values.length > 0 && valuesOptions.length === 0) {
      return options;
    }

    return options.filter((p) => values.includes(p));
  },
});

export const optionCodec = (options: string[]) => ({
  serialize: (value?: string) => value ?? "",
  deserialize: (value: string) => {
    const option = options.find((o) => o === value);
    if (option) {
      return option;
    }
  },
});

export const timeRangeCodec = (defaultRange: RangeOptions["value"]) => ({
  serialize: (value: RangeOptions["value"]) => {
    if (value[0] === defaultRange[0] && value[1] === defaultRange[1]) {
      return "All";
    }
    return `${value[0]},${value[1]}`;
  },
  deserialize: (value: string): RangeOptions["value"] => {
    if (value === "All" || value === "") {
      return defaultRange;
    }
    const [min, max] = value.split(",");
    return [Number(min), Number(max)];
  },
});

export const filterSingleHashAtomFamily = atomFamily(
  ({ key, options, defaultOption }: { key: string; defaultOption?: string; options: string[] }) => {
    return atomWithHash(key, defaultOption, optionCodec(options));
  },
  (a, b) => a.key === b.key && isEqual(a.options, b.options)
);

export const filterMultiHashAtomFamily = atomFamily(
  ({
    key,
    options,
    defaultOptions,
  }: {
    key: string;
    options: string[];
    defaultOptions?: string[];
  }) => {
    return atomWithHash(key, defaultOptions ?? options, multiOptionsCodec(options));
  },
  (a, b) => a.key === b.key && isEqual(a.options, b.options)
);

export const filterTimeRangeHashAtomFamily = atomFamily(
  ({
    key,
    value,
    defaultRange,
  }: {
    key: string;
    value: RangeOptions["value"];
    defaultRange: RangeOptions["value"];
  }) => {
    return atomWithHash(key, value ?? defaultRange, timeRangeCodec(defaultRange));
  },
  (a, b) =>
    a.key === b.key &&
    a.defaultRange[0] === b.defaultRange[0] &&
    a.defaultRange[1] === b.defaultRange[1]
);
