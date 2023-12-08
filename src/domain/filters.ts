import { localeAtom } from "@/lib/use-locale";
import { HierarchyValue, fetchHierarchy } from "@/pages/api/data";
import { findInHierarchy } from "@/utils/trees";
import dayjs from "dayjs";
import { atom } from "jotai";
import { atomWithHash } from "jotai-location";
import { atomsWithQuery } from "jotai-tanstack-query";
import { atomFamily } from "jotai/vanilla/utils";
import { isEmpty, isEqual, max, min } from "lodash";
import {
  baseDimensionsStatusAtom,
  cubeDimensionsStatusAtom,
  cubePathAtom,
  lindasAtom,
} from "./cubes";
import { dataDimensions } from "./dimensions";
import { observationsQueryAtom } from "./observations";
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

export const timeViewAtom = atomWithHash<TimeView>("timeView", "Year");
export const timeRangeAtom = atomWithHash("timeRange", timeRangeDefault);

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
    options: measureOptions,
  });

  const marketOptions = baseDimensionsQuery.isSuccess
    ? baseDimensionsQuery.data.properties.market.values
    : [];

  const marketAtom = filterSingleHashAtomFamily({
    key: "market",
    options: marketOptions,
  });

  const valueChainOptions = baseDimensionsQuery.isSuccess
    ? baseDimensionsQuery.data.properties["value-chain"].values
    : [];

  const valueChainAtom = filterSingleHashAtomFamily({
    key: "value-chain",
    options: valueChainOptions,
  });

  return {
    dimensions: {
      measure: {
        name: t({ id: "data.filters.measure", message: "Measure" }),
        value: get(measureAtom),
        options: measureOptions,
        atom: measureAtom,
        default: "price",
        isChanged: get(measureAtom)?.value !== "price",
      },
      market: {
        name: baseDimensionsQuery?.data?.properties.market?.label,
        atom: marketAtom,
        value: get(marketAtom),
        options: marketOptions,
        default: "market/1",
        isChanged: get(marketAtom)?.value !== "market/1",
      },
      "value-chain": {
        name: baseDimensionsQuery?.data?.properties["value-chain"]?.label,
        atom: valueChainAtom,
        value: get(valueChainAtom),
        options: valueChainOptions,
        default: "value-chain/1",
        isChanged: get(valueChainAtom)?.value !== "value-chain/1",
      },
    },
    isLoading: baseDimensionsQuery.isLoading,
    isSuccess: baseDimensionsQuery.isSuccess,
    isError: baseDimensionsQuery.isError,
  };
});

/**
 * Dimensions selection atom. This atoms contains the information on the filters on the cube dimensions.
 * This is then used to filter the observations of the cube we fetch.
 */
export const dimensionsSelectionAtom = atom((get) => {
  const cubeDimensionsQuery = get(cubeDimensionsStatusAtom);
  const productOptions = get(productOptionsWithHierarchyAtom);

  const productsAtom = filterMultiHashAtomFamily({
    key: "products",
    options: productOptions,
  });

  const salesRegionOptions =
    cubeDimensionsQuery.isSuccess && !isEmpty(cubeDimensionsQuery.data)
      ? cubeDimensionsQuery.data.properties["sales-region"].values
      : [];

  const salesRegionAtom = filterMultiHashAtomFamily({
    key: "salesRegion",
    options: salesRegionOptions,
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
    isLoading: cubeDimensionsQuery.isLoading,
    isSuccess: cubeDimensionsQuery.isSuccess,
    isError: cubeDimensionsQuery.isError,
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
    const observationsQuery = get(observationsQueryAtom);
    const filterCubeSelection = get(cubeSelectionAtom);
    const filterDimensionsSelection = get(dimensionsSelectionAtom);
    const timeRange = get(timeRangeAtom);

    const changedCubeFilters = Object.values(filterCubeSelection.dimensions).filter(
      (value) => value.isChanged
    );
    const changedDimensionFilters = Object.values(filterDimensionsSelection.dimensions).filter(
      (value) => value.isChanged
    );

    const observationTimeRange = observationsQuery.isSuccess
      ? {
          min: min(observationsQuery.data.observations.map((d) => dayjs(d.date).unix())),
          max: max(observationsQuery.data.observations.map((d) => dayjs(d.date).unix())),
        }
      : undefined;
    const isTimeRangeChanged =
      observationTimeRange &&
      (observationTimeRange.min !== timeRange.min || observationTimeRange.max !== timeRange.max);

    const isTimeFilterChanged = get(timeViewAtom) !== "Year" || isTimeRangeChanged;

    return {
      cube: filterCubeSelection,
      dimensions: filterDimensionsSelection,
      total:
        Object.values(filterCubeSelection).length + Object.values(filterDimensionsSelection).length,
      changed:
        changedCubeFilters.length + changedDimensionFilters.length + (isTimeFilterChanged ? 1 : 0),
    };
  },
  (get, set, { action }: { action: "reset" }) => {
    const filterCubeSelection = get(cubeSelectionAtom);
    const filterDimensionsSelection = get(dimensionsSelectionAtom);

    switch (action) {
      case "reset":
        Object.values(filterCubeSelection.dimensions).forEach((filter) => {
          set(
            filter.atom,
            filter.options.find((option) => option.value === filter.default)
          );
        });

        Object.values(filterDimensionsSelection.dimensions).forEach((filter) => {
          set(filter.atom, filter.options);
        });

        const timeRange = get(timeRangeAtom);

        set(timeViewAtom, "Year");
        set(timeRangeAtom, {
          min: timeRange.min,
          max: timeRange.max,
          value: [timeRange.min, timeRange.max],
        });
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
  ({ key, options, defaultOption }: { key: string; defaultOption?: Option; options: Option[] }) => {
    return atomWithHash(key, defaultOption, optionCodec(options));
  },
  (a, b) =>
    a.key === b.key &&
    isEqual(
      a.options.map((optA) => optA.value),
      b.options.map((optB) => optB.value)
    )
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
