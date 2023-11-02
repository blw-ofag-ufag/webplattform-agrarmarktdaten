import { localeAtom } from "@/lib/use-locale";
import { fetchCube, fetchDimensions, fetchObservations } from "@/pages/api/use-sparql";
import dayjs from "dayjs";
import { ExtractAtomValue, atom } from "jotai";
import { atomWithHash } from "jotai-location";
import { atomsWithQuery, atomsWithQueryAsync } from "jotai-tanstack-query";

export type Option = {
  label: string;
  value: string;
  checked?: boolean;
} & { [key: string]: string };

/* Data Filters */

export const markets: Option[] = [
  {
    label: "Milk and Dairy",
    value: "MilkDairyProducts",
  },
];

export const addedValueValues: Option[] = [
  { label: "Production", value: "production" },
  { label: "Wholesale", value: "wholesale" },
  { label: "Industry", value: "industry" },
  {
    label: "Pick up and gastro wholesale",
    value: "pickupandgastrowholesale",
  },
  { label: "Consumption", value: "consumption" },
  { label: "Stock exchanges", value: "stockexchanges" },
  { label: "Storage", value: "storage" },
];

export const productionSystems: Option[] = [
  { label: "Bio", value: "bio" },
  { label: "Non-Bio", value: "nonbio" },
];

export const indicators: (Option & {
  dimensionIri: string;
})[] = [
  {
    label: "Price",
    value: "price",
    dimensionIri: "<https://agriculture.ld.admin.ch/foag/measure/price>",
  },
  {
    label: "Quantity",
    value: "quantity",
    dimensionIri: "<https://agriculture.ld.admin.ch/foag/measure/quantity>",
  },
  {
    label: "Index",
    value: "index",
    dimensionIri: "<https://agriculture.ld.admin.ch/foag/measure/index>",
  },
];

export const salesRegions: Option[] = [
  { label: "Switzerland", value: "ch" },
  { label: "France", value: "fr" },
  { label: "Italy", value: "it" },
  { label: "Spain", value: "es" },
];

export const products: Option[] = [
  {
    market: "Egg Products",
    marketSlug: "eggs",
    label: "Hatching eggs",
    value: "hatchingeggs",
    group: "eggs",
    subgroup: "hatchingeggs",
  },
  {
    market: "Egg Products",
    marketSlug: "eggs",
    label: "Hatchings NWD",
    value: "hatchingeggs-nwd",
    group: "eggs",
    subgroup: "hatchingeggs",
  },
  {
    market: "Egg Products",
    marketSlug: "eggs",
    label: "Eggs < 50",
    value: "eggs<50",
    group: "eggs",
  },
  {
    market: "Milk & Dairy Products",
    marketSlug: "milk",
    label: "Brie Camembert",
    value: "brie",
    group: "milk",
    subgroup: "cheese",
  },
  {
    market: "Milk & Dairy Products",
    marketSlug: "milk",
    label: "Emmentaler",
    value: "emmentaler",
    group: "milk",
    subgroup: "cheese",
  },
];
/* Time  */

export type RangeOptions = {
  min: number;
  max: number;
  value: [number, number];
};

export type TimeView = "year" | "month";

const MIN_DATE = dayjs("2020-01");
const MAX_DATE = dayjs("2023-01");

export const timeRange = {
  min: MIN_DATE.unix(),
  max: MAX_DATE.unix(),
  value: [MIN_DATE.unix(), MAX_DATE.unix()] as [number, number],
};

const multiOptionsCodec = (options: Option[]) => ({
  serialize: (value: Option[]) => value.map((v) => v.value).join(","),
  deserialize: (value: string) => {
    const values = value.split(",");
    return options.filter((p) => values.includes(p.value));
  },
});

const optionCodec = (options: Option[]) => ({
  serialize: (value?: Option) => (value ? value.value : ""),
  deserialize: (value: string) => options.find((o) => o.value === value),
});

/* Atoms */

export const cubePathAtom = atom(
  "https://agriculture.ld.admin.ch/foag/cube/MilkDairyProducts/Consumption_Price_Month"
);

export const [dimensionsAtom, dimensionsStatusAtom] = atomsWithQuery((get) => ({
  queryKey: ["dimensions", get(localeAtom)],
  queryFn: () => fetchDimensions(get(cubePathAtom), get(localeAtom)),
}));

export const [cubeAtom, cubeStatusAtom] = atomsWithQuery((get) => ({
  queryKey: ["cube", get(cubePathAtom)],
  queryFn: () => fetchCube(get(cubePathAtom)),
}));

export const [observationsAtom, observationsStatusAtom] = atomsWithQueryAsync(async (get) => {
  const cube = await get(cubeAtom);
  const dimensions = await get(dimensionsAtom);

  return {
    queryKey: ["observations", get(cubePathAtom)],
    queryFn: () => {
      if (cube.view && dimensions) {
        return fetchObservations(cube.view, dimensions);
      }
      throw Error("Need view and dimensions to fetch observations");
    },
  };
});

export const marketsAtom = atomWithHash("markets", markets, { ...multiOptionsCodec(markets) });
export const addedValueValuesAtom = atomWithHash("addedValueValues", addedValueValues, {
  ...multiOptionsCodec(addedValueValues),
});
export const productionSystemsAtom = atomWithHash("productionSystems", productionSystems, {
  ...multiOptionsCodec(productionSystems),
});
export const indicatorAtom = atomWithHash(
  "indicator",
  {
    label: "Price",
    value: "price",
    dimensionIri: "<https://agriculture.ld.admin.ch/foag/measure/price>",
  },
  {
    ...optionCodec(indicators),
  }
);
export const salesRegionsAtom = atomWithHash("salesRegions", salesRegions, {
  ...multiOptionsCodec(salesRegions),
});
export const productsAtom = atomWithHash("products", products, { ...multiOptionsCodec(products) });

export const timeViewAtom = atomWithHash<TimeView>("timeView", "year");
export const timeRangeAtom = atomWithHash<RangeOptions>("timeRange", timeRange);

/* Filter Atom */

export type Filters = {
  markets: ExtractAtomValue<typeof marketsAtom>;
  addedValueValues: ExtractAtomValue<typeof addedValueValuesAtom>;
  productionSystems: ExtractAtomValue<typeof productionSystemsAtom>;
  indicator: ExtractAtomValue<typeof indicatorAtom>;
  salesRegions: ExtractAtomValue<typeof salesRegionsAtom>;
  products: ExtractAtomValue<typeof productsAtom>;
  timeRange: ExtractAtomValue<typeof timeRangeAtom>;
  timeView: ExtractAtomValue<typeof timeViewAtom>;
};

export const filterAtom = atom(
  (get) => ({
    markets: get(marketsAtom),
    addedValueValues: get(addedValueValuesAtom),
    productionSystems: get(productionSystemsAtom),
    indicator: get(indicatorAtom),
    salesRegions: get(salesRegionsAtom),
    products: get(productsAtom),
    timeRange: get(timeRangeAtom),
    timeView: get(timeViewAtom),
  }),
  (_, set, filters: Partial<Filters>) => {
    if (filters.markets) {
      set(marketsAtom, filters.markets);
    }
    if (filters.addedValueValues) {
      set(addedValueValuesAtom, filters.addedValueValues);
    }
    if (filters.productionSystems) {
      set(productionSystemsAtom, filters.productionSystems);
    }
    if (filters.indicator) {
      set(indicatorAtom, filters.indicator);
    }
    if (filters.salesRegions) {
      set(salesRegionsAtom, filters.salesRegions);
    }
    if (filters.products) {
      set(productsAtom, filters.products);
    }
    if (filters.timeRange) {
      set(timeRangeAtom, filters.timeRange);
    }
    if (filters.timeView) {
      set(timeViewAtom, filters.timeView);
    }
  }
);

export const dataDimensions = {
  price: {
    type: "measure",
    id: "price",
  },
  costComponent: {
    type: "property",
    id: "cost-component",
  },
  currency: {
    type: "property",
    id: "currency",
  },
  dataMethod: {
    type: "property",
    id: "data-method",
  },
  dataSource: {
    type: "property",
    id: "data-source",
  },
  date: {
    type: "property",
    id: "date",
  },
  foreignTrade: {
    type: "property",
    id: "foreign-trade",
  },
  keyIndicatorType: {
    type: "property",
    id: "key-indicator-type",
  },
  market: {
    type: "property",
    id: "market",
  },
  product: {
    type: "property",
    id: "product",
  },
  productGroup: {
    type: "property",
    id: "product-group",
  },
  productionSystem: {
    type: "property",
    id: "product-system",
  },
  productOrigin: {
    type: "property",
    id: "product-origin",
  },
  salesRegion: {
    type: "property",
    id: "sales-region",
  },
  unit: {
    type: "property",
    id: "unit",
  },
  usage: {
    type: "property",
    id: "usage",
  },
  valueChainDetail: {
    type: "property",
    id: "value-chain-detail",
  },
  valueChain: {
    type: "property",
    id: "value-chain",
  },
};
