import { amdpMeasure, amdpProperty } from "@/lib/namespace";
import { localeAtom } from "@/lib/use-locale";
import {
  DimensionType,
  fetchCube,
  fetchDimensions,
  fetchObservations,
} from "@/pages/api/use-sparql";
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

/* Data Dimensions */

export const measures = ["price", "quantity", "index"] as const;

export const properties = [
  "costComponent",
  "currency",
  "dataMethod",
  "dataSource",
  "date",
  "foreignTrade",
  "keyIndicatorType",
  "market",
  "product",
  "productGroup",
  "productSystem",
  "productOrigin",
  "salesRegion",
  "unit",
  "usage",
  "valueChainDetail",
  "valueChain",
] as const;

export type Measure = (typeof measures)[number];
export type Property = (typeof properties)[number];

export type DataDimension = Measure | Property;

export const dataDimensions: {
  [key in DataDimension]: {
    type: DimensionType;
    id: string;
    iri: string;
  };
} = {
  ["price"]: {
    type: "measure",
    id: "price",
    iri: amdpMeasure("price").value,
  },
  quantity: {
    type: "measure",
    id: "quantity",
    iri: amdpMeasure("quantity").value,
  },
  index: {
    type: "measure",
    id: "index",
    iri: amdpMeasure("index").value,
  },
  costComponent: {
    type: "property",
    id: "cost-component",
    iri: amdpProperty("cost-component").value,
  },
  currency: {
    type: "property",
    id: "currency",
    iri: amdpProperty("currency").value,
  },
  dataMethod: {
    type: "property",
    id: "data-method",
    iri: amdpProperty("data-method").value,
  },
  dataSource: {
    type: "property",
    id: "data-source",
    iri: amdpProperty("data-source").value,
  },
  date: {
    type: "property",
    id: "date",
    iri: amdpProperty("date").value,
  },
  foreignTrade: {
    type: "property",
    id: "foreign-trade",
    iri: amdpProperty("foreign-trade").value,
  },
  keyIndicatorType: {
    type: "property",
    id: "key-indicator-type",
    iri: amdpProperty("key-indicator-type").value,
  },
  market: {
    type: "property",
    id: "market",
    iri: amdpProperty("market").value,
  },
  product: {
    type: "property",
    id: "product",
    iri: amdpProperty("product").value,
  },
  productGroup: {
    type: "property",
    id: "product-group",
    iri: amdpProperty("product-group").value,
  },
  productSystem: {
    type: "property",
    id: "product-system",
    iri: amdpProperty("product-system").value,
  },
  productOrigin: {
    type: "property",
    id: "product-origin",
    iri: amdpProperty("product-origin").value,
  },
  salesRegion: {
    type: "property",
    id: "sales-region",
    iri: amdpProperty("sales-region").value,
  },
  unit: {
    type: "property",
    id: "unit",
    iri: amdpProperty("unit").value,
  },
  usage: {
    type: "property",
    id: "usage",
    iri: amdpProperty("usage").value,
  },
  valueChainDetail: {
    type: "property",
    id: "value-chain-detail",
    iri: amdpProperty("value-chain-detail").value,
  },
  valueChain: {
    type: "property",
    id: "value-chain",
    iri: amdpProperty("value-chain").value,
  },
};

type IriMap = {
  [key: string]: {
    type: DimensionType;
    id: string;
    iri: string;
    key: DataDimension;
  };
};

export const dimensionIriMap: IriMap = Object.entries(dataDimensions).reduce(
  (acc, [key, value]) => {
    acc[value.iri] = { ...value, key: key as DataDimension };
    return acc;
  },
  {} as IriMap
);
