import { Option } from "@/components/browser/Select";
import dayjs from "dayjs";
import { atom } from "jotai";

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

export type RangeOptions = {
  min: number;
  max: number;
  value: [number, number];
};

export const year: RangeOptions = {
  min: 2000,
  max: 2020,
  value: [2010, 2015],
};

export const cubeDimensions = [
  {
    iri: "http://schema.org/startDate",
    label: "Date",
    name: "startDate",
  },
  {
    iri: "https://agriculture.ld.admin.ch/foag/property/date-type",
    label: "Date Type",
    name: "date-type",
  },
  {
    iri: "https://agriculture.ld.admin.ch/foag/property/cost-component",
    label: "Cost Component",
    name: "cost-component",
  },
  {
    iri: "https://agriculture.ld.admin.ch/foag/property/currency",
    label: "Currency",
    name: "currency",
  },
  {
    iri: "https://agriculture.ld.admin.ch/foag/property/data-method",
    label: "Data Method",
    name: "data-method",
  },
  {
    iri: "https://agriculture.ld.admin.ch/foag/property/data-source",
    label: "Data Source",
    name: "data-source",
  },
  {
    iri: "https://agriculture.ld.admin.ch/foag/property/date",
    label: "Date",
    name: "date",
  },
  {
    iri: "https://agriculture.ld.admin.ch/foag/property/foreign-trade",
    label: "Foreign Trade",
    name: "foreign-trade",
  },
  {
    iri: "https://agriculture.ld.admin.ch/foag/property/key-indicator-type",
    label: "Key Indicator Type",
    name: "key-indicator-type",
  },
  {
    iri: "https://agriculture.ld.admin.ch/foag/property/market",
    label: "Market",
    name: "market",
  },
  {
    iri: "https://agriculture.ld.admin.ch/foag/property/product",
    label: "Product",
    name: "product",
  },
  {
    iri: "https://agriculture.ld.admin.ch/foag/property/product-group",
    label: "Product Group",
    name: "product-group",
  },
  {
    iri: "https://agriculture.ld.admin.ch/foag/property/production-system",
    label: "Production System",
    name: "production-system",
  },
  {
    iri: "https://agriculture.ld.admin.ch/foag/property/product-origin",
    label: "Product Origin",
    name: "product-origin",
  },
  {
    iri: "https://agriculture.ld.admin.ch/foag/property/product-properties",
    label: "Product Properties",
    name: "product-properties",
  },
  {
    iri: "https://agriculture.ld.admin.ch/foag/property/product-subgroup",
    label: "Product Subgroup",
    name: "product-subgroup",
  },
  {
    iri: "https://agriculture.ld.admin.ch/foag/property/sales-region",
    label: "Sales Region",
    name: "sales-region",
  },
  {
    iri: "https://agriculture.ld.admin.ch/foag/property/unit",
    label: "Unit",
    name: "unit",
  },
  {
    iri: "https://agriculture.ld.admin.ch/foag/property/usage",
    label: "Usage",
    name: "usage",
  },
  {
    iri: "https://agriculture.ld.admin.ch/foag/property/value-chain-detail",
    label: "Value Chain Detail",
    name: "value-chain-detail",
  },
  {
    iri: "https://agriculture.ld.admin.ch/foag/property/value-chain",
    label: "Value Chain",
    name: "value-chain",
  },
  {
    iri: "https://agriculture.ld.admin.ch/foag/measure/price",
    label: "Price",
    name: "price",
  },
  {
    iri: "https://cube.link/observedBy",
    label: "Observed By",
    name: "observedBy",
  },
];

export const indicators: (CheckboxValue & {
  dimensionIri: string;
})[] = [
  {
    label: "Price",
    name: "price",
    value: true,
    dimensionIri: "<https://agriculture.ld.admin.ch/foag/measure/price>",
  },
  {
    label: "Quantity",
    name: "quantity",
    value: false,
    dimensionIri: "<https://agriculture.ld.admin.ch/foag/measure/quantity>",
  },
  {
    label: "Index",
    name: "index",
    value: false,
    dimensionIri: "<https://agriculture.ld.admin.ch/foag/measure/index>",
  },
];

export const countries: Option[] = [
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

export const marketsAtom = atom(markets);
export const addedValueValuesAtom = atom(addedValueValues);
export const productionSystemsAtom = atom(productionSystems);
export const indicatorAtom = atom(indicators[0]);
export const countriesAtom = atom(countries);
export const yearAtom = atom(year);
export const productsAtom = atom(products);

/* Time  */

export type TimeView = "year" | "month";

const MIN_DATE = dayjs("2020-01");
const MAX_DATE = dayjs("2023-01");

export const timeRange = {
  min: MIN_DATE.unix(),
  max: MAX_DATE.unix(),
  value: [MIN_DATE.unix(), MAX_DATE.unix()] as [number, number],
};

export const timeViewAtom = atom<TimeView>("year");
export const timeRangeAtom = atom<RangeOptions>(timeRange);
