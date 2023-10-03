import { atom } from "jotai";

export type CheckboxValue = { label: string; name: string; value: boolean };

export const markets: CheckboxValue[] = [
  {
    label: "Milk and Dairy",
    name: "MilkDairyProducts",
    value: true,
  },
];

export const addedValueValues: CheckboxValue[] = [
  { label: "Production", name: "production", value: true },
  { label: "Wholesale", name: "wholesale", value: true },
  { label: "Industry", name: "industry", value: true },
  {
    label: "Pick up and gastro wholesale",
    name: "pickupandgastrowholesale",
    value: true,
  },
  { label: "Consumption", name: "consumption", value: true },
  { label: "Stock exchanges", name: "stockexchanges", value: true },
  { label: "Storage", name: "storage", value: true },
];

export const productionSystems: CheckboxValue[] = [
  { label: "Bio", name: "bio", value: true },
  { label: "Non-Bio", name: "nonbio", value: true },
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

export const countries: CheckboxValue[] = [
  { label: "Switzerland", name: "ch", value: false },
  { label: "France", name: "fr", value: false },
  { label: "Italy", name: "it", value: false },
  { label: "Spain", name: "es", value: false },
];

export const months: CheckboxValue[] = [
  { label: "Jan", name: "jan", value: true },
  { label: "Feb", name: "feb", value: true },
  { label: "Mar", name: "mar", value: true },
  { label: "Apr", name: "apr", value: true },
  { label: "May", name: "may", value: true },
  { label: "Jun", name: "jun", value: true },
  { label: "Jul", name: "jul", value: true },
  { label: "Aug", name: "aug", value: true },
  { label: "Sep", name: "sep", value: true },
  { label: "Oct", name: "oct", value: true },
  { label: "Nov", name: "nov", value: true },
  { label: "Dec", name: "dec", value: true },
];

export const products: (CheckboxValue & {
  group: string;
})[] = [
  { label: "Hatching eggs", name: "hatchingeggs", group: "eggs", value: false },
  {
    label: "Hatchings NWD",
    name: "hatchingeggs-nwd",
    group: "eggs",
    value: false,
  },
  { label: "Eggs < 50", name: "eggs<50", group: "eggs", value: false },
  { label: "Brie Camembert", name: "brie", group: "milk", value: false },
  { label: "Emmentaler", name: "emmentaler", group: "milk", value: false },
];

export const marketsAtom = atom(markets);
export const addedValueValuesAtom = atom(addedValueValues);
export const productionSystemsAtom = atom(productionSystems);
export const indicatorsAtom = atom(indicators);
export const countriesAtom = atom(countries);
export const yearAtom = atom(year);
export const monthsAtom = atom(months);
export const productsAtom = atom(products);
