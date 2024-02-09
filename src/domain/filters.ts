import { localeAtom } from "@/lib/use-locale";
import { HierarchyValue, Observation, fetchHierarchy } from "@/pages/api/data";
import { visitHierarchy } from "@/utils/trees";
import { t } from "@lingui/macro";
import dayjs from "dayjs";
import { ExtractAtomValue, atom } from "jotai";
import { atomWithHash } from "jotai-location";
import { atomsWithQuery } from "jotai-tanstack-query";
import { isEmpty, maxBy, minBy, snakeCase } from "lodash";
import {
  baseDimensionsStatusAtom,
  cubeDimensionsStatusAtom,
  cubePathAtom,
  lindasAtom,
} from "./cubes";
import { dataDimensions } from "./dimensions";
import { observationsQueryAtom } from "./observations";
import {
  filterSingleHashAtomFamily,
  filterMultiHashAtomFamily,
  filterTimeRangeHashAtomFamily,
} from "./atom-families";
import { mapValues } from "remeda";

export type Option<HierarchyLevel extends string | never = never> = {
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  hierarchy?: Record<
    HierarchyLevel,
    {
      value?: string;
      label?: string;
    }
  >;
};

export type Filter = {
  name: string;
  options: Option[];
  type: "single" | "multi";
  key: string;
  search?: boolean;
  groups?: Array<(d: $FixMe) => { value: string; label: string }>;
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

const createFilterDimensionAtom = ({ dataKey }: { dataKey: string }) => {
  return atom((get) => {
    const dimensionsResult = get(cubeDimensionsStatusAtom);
    const options =
      dimensionsResult.isSuccess && !isEmpty(dimensionsResult.data)
        ? dimensionsResult.data.properties[dataKey].values
        : [];

    const valuesAtom = filterMultiHashAtomFamily({
      key: snakeCase(dataKey),
      options: options.map((p) => p.value),
    });

    const atomValue = get(valuesAtom);

    return {
      name: dimensionsResult?.data?.properties[dataKey]?.label ?? dataKey,
      options,
      atom: valuesAtom,
      value: atomValue,
      search: true,
      isChanged: atomValue.length < options.length,
      groups: undefined,
    };
  });
};

const productHierarchyLevels = ["market", "product-group", "product-subgroup"] as const;
const valueChainHierarchyLevels = ["market", "value-chain", "value-chain-detail"] as const;

const createGrouping = <T extends string>(hierarchyLevels: readonly T[]) =>
  hierarchyLevels.map(
    (level) => (d: Option<T>) => d.hierarchy?.[level]
    // Need to have the type assertion, otherwise readonly is added and does not work
    // with select options in SidePanel
  ) as ((d: Option) => {
    value: string | undefined;
    label: string | undefined;
  })[];

const createFilterDimensionAtomWithHierarchy = <THierarchyLevel extends string>({
  dataKey,
  hierarchyLevels,
  hierarchyStatusAtom,
  optionsAtom,
}: {
  dataKey: keyof typeof dataDimensions;
  hierarchyLevels: readonly THierarchyLevel[];
  hierarchyStatusAtom: typeof productHierarchyStatusAtom;
  optionsAtom: typeof productOptionsWithHierarchyAtom;
}) => {
  const groups = createGrouping(hierarchyLevels);
  return atom((get) => {
    const cubeDimensionsQuery = get(cubeDimensionsStatusAtom);
    const options = get(optionsAtom);
    const hashAtom = filterMultiHashAtomFamily({
      key: snakeCase(dataKey),
      options: options.map((p) => p.value),
    });

    const hierarchyQuery = get(hierarchyStatusAtom);
    const hashValue = get(hashAtom);

    return {
      hierarchyQuery: hierarchyQuery,
      filter: {
        name: cubeDimensionsQuery?.data?.properties[dataKey]?.label ?? dataKey,
        options: options,
        atom: hashAtom,
        value: hashValue,
        search: true,
        isChanged: hashValue.length < options.length,
        groups,
      },
    };
  });
};

/**
 * Dimensions selection atom. This atoms contains the information on the filters on the cube dimensions.
 * This is then used to filter the observations of the cube we fetch.
 */
export const dimensionsSelectionAtom = atom((get) => {
  const cubeDimensionsQuery = get(cubeDimensionsStatusAtom);
  const observationsQuery = get(observationsQueryAtom);

  const productFilterAtom = createFilterDimensionAtomWithHierarchy({
    dataKey: "product",
    hierarchyStatusAtom: productHierarchyStatusAtom,
    optionsAtom: productOptionsWithHierarchyAtom,
    hierarchyLevels: productHierarchyLevels,
  });
  const valueChainFilterAtom = createFilterDimensionAtomWithHierarchy({
    dataKey: "value-chain-detail",
    hierarchyStatusAtom: valueChainHierarchyStatusAtom,
    optionsAtom: valueChainOptionsWithHierarchyAtom,
    hierarchyLevels: valueChainHierarchyLevels,
  });
  const { hierarchyQuery: productHierarchyQuery, filter: productFilter } = get(productFilterAtom);
  const { hierarchyQuery: valueChainHierarchyQuery, filter: valueChainFilter } =
    get(valueChainFilterAtom);

  const dimensionAtoms = {
    "cost-component": createFilterDimensionAtom({
      dataKey: "cost-component",
    }),
    currency: createFilterDimensionAtom({
      dataKey: "currency",
    }),
    "foreign-trade": createFilterDimensionAtom({
      dataKey: "foreign-trade",
    }),

    "data-source": createFilterDimensionAtom({
      dataKey: "data-source",
    }),

    "sales-region": createFilterDimensionAtom({
      dataKey: "sales-region",
    }),
    usage: createFilterDimensionAtom({
      dataKey: "usage",
    }),

    "product-origin": createFilterDimensionAtom({
      dataKey: "product-origin",
    }),

    "product-properties": createFilterDimensionAtom({
      dataKey: "product-properties",
    }),

    "production-system": createFilterDimensionAtom({
      dataKey: "production-system",
    }),

    "data-method": createFilterDimensionAtom({
      dataKey: "data-method",
    }),

    unit: createFilterDimensionAtom({
      dataKey: "unit",
    }),
  } as const;

  const defaultTimeRange = observationsQuery.isSuccess
    ? getDefaultTimeRange(observationsQuery.data.observations)
    : DEFAULT_TIME_RANGE;

  const timeRangeAtom = filterTimeRangeHashAtomFamily({
    key: "timeRange",
    value: [defaultTimeRange.min, defaultTimeRange.max],
    defaultRange: [defaultTimeRange.min, defaultTimeRange.max],
  });

  const queries = [cubeDimensionsQuery, productHierarchyQuery, valueChainHierarchyQuery];

  return {
    dimensions: {
      product: productFilter,
      "value-chain-detail": valueChainFilter,
      ...mapValues(dimensionAtoms, (a) => get(a)),
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
    isLoading: queries.some((q) => q.isLoading),
    isSuccess: queries.every((q) => q.isSuccess),
    isError: queries.some((q) => q.isError),
  } as const;
});

export type AvailableDimensionFilter = keyof ExtractAtomValue<
  typeof dimensionsSelectionAtom
>["dimensions"];

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

export const getOptionsWithHierarchy = <HierarchyLevel extends string>(
  hierarchy: HierarchyValue[],
  options: Option[],
  levels: readonly HierarchyLevel[]
): Option<HierarchyLevel>[] => {
  const parents = new Map<string, HierarchyValue | undefined>();
  visitHierarchy(hierarchy, (node, parent) => {
    parents.set(node.value, parent ?? undefined);
  });
  const optionsWithHierarchy = options.map((product) => {
    type HierarchyValue = { value: string | undefined; label: string | undefined };
    const hierarchy: Record<string, HierarchyValue> = {};
    let cur: Option | undefined = product;

    // Levels are from bigger to smaller, we need to go in the other direction
    for (let i = levels.length - 1; i >= 0; i--) {
      const level = levels[i];
      const parent: Option | undefined = cur?.value ? parents.get(cur.value) : undefined;
      hierarchy[level] = {
        value: parent?.value,
        label: parent?.label,
      };
      cur = parent;
    }

    return {
      value: product.value,
      label: product.label,
      hierarchy: hierarchy as Record<HierarchyLevel, HierarchyValue>,
    };
  });
  return optionsWithHierarchy;
};

export const createFiltersWithHierarchyAtom = ({
  dataKey,
  hierarchyLevels,
}: {
  dataKey: keyof typeof dataDimensions;
  hierarchyLevels: readonly string[];
}) => {
  const [hierarchyAtom, hierarchyStatusAtom] = atomsWithQuery((get) => {
    const locale = get(localeAtom);
    const cubeIri = get(cubePathAtom);
    const environment = get(lindasAtom);

    return {
      queryKey: [`${dataKey}Hierarchy`, cubeIri, locale],
      queryFn: () => {
        if (!cubeIri) {
          return Promise.reject(new Error("Cube not found"));
        }
        return fetchHierarchy({
          locale,
          cubeIri: cubeIri,
          dimensionIri: dataDimensions[dataKey].iri,
          environment: environment.url,
        });
      },
      placeholderData: (previousData) => previousData,
      skip: !cubeIri,
    };
  });

  const optionsAtom = atom((get) => {
    const hierarchy = get(hierarchyStatusAtom);
    const cubeDimensions = get(cubeDimensionsStatusAtom);

    if (!cubeDimensions.isSuccess || !hierarchy.isSuccess) return [];

    const cubeProducts = cubeDimensions.data.properties[dataKey]?.values;

    if (!cubeProducts) return [];

    return getOptionsWithHierarchy(hierarchy.data, cubeProducts, hierarchyLevels);
  });

  return { hierarchyAtom, hierarchyStatusAtom, optionsAtom };
};

const {
  optionsAtom: productOptionsWithHierarchyAtom,
  hierarchyStatusAtom: productHierarchyStatusAtom,
} = createFiltersWithHierarchyAtom({
  dataKey: "product",
  hierarchyLevels: productHierarchyLevels,
});

const {
  optionsAtom: valueChainOptionsWithHierarchyAtom,
  hierarchyStatusAtom: valueChainHierarchyStatusAtom,
} = createFiltersWithHierarchyAtom({
  dataKey: "value-chain-detail",
  hierarchyLevels: valueChainHierarchyLevels,
});
