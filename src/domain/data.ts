import { atom } from "jotai";

export type CheckboxValue = { label: string; name: string; value: boolean };

export const markets: CheckboxValue[] = [
  {
    label: "Eggs",
    name: "eggs",
    value: true,
  },
  {
    label: "Meat",
    name: "meat",
    value: true,
  },
  {
    label: "Fruits",
    name: "fruits",
    value: false,
  },
  {
    label: "Animal feed",
    name: "animalfeed",
    value: false,
  },
  {
    label: "Vegetable",
    name: "vegetable",
    value: false,
  },
  {
    label: "Cereals/Flour",
    name: "cereals/flour",
    value: false,
  },
  {
    label: "Milk",
    name: "milk",
    value: false,
  },
  {
    label: "Potatoes",
    name: "potatoes",
    value: false,
  },
  {
    label: "Oilseeds",
    name: "oilseeds",
    value: false,
  },
];

export const addedValueValues: CheckboxValue[] = [
  { label: "Production", name: "production", value: false },
  { label: "Wholesale", name: "wholesale", value: true },
  { label: "Industry", name: "industry", value: false },
  {
    label: "Pick up and gastro wholesale",
    name: "pickupandgastrowholesale",
    value: false,
  },
  { label: "Consumption", name: "consumption", value: false },
  { label: "Stock exchanges", name: "stockexchanges", value: false },
  { label: "Storage", name: "storage", value: false },
];

export const productionSystems: CheckboxValue[] = [
  { label: "Bio", name: "bio", value: true },
  { label: "Non-Bio", name: "nonbio", value: false },
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

export const indicators: CheckboxValue[] = [
  { label: "Prices", name: "prices", value: true },
  { label: "Amounts", name: "amounts", value: false },
  { label: "Areas", name: "areas", value: false },
  { label: "Index", name: "index", value: true },
];

export const countries: CheckboxValue[] = [
  { label: "Switzerland", name: "ch", value: true },
  { label: "France", name: "fr", value: true },
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
  { label: "Eggs < 50", name: "eggs<50", group: "eggs", value: true },
  { label: "Brie Camembert", name: "brie", group: "milk", value: true },
  { label: "Emmentaler", name: "emmentaler", group: "milk", value: true },
];

export const marketsAtom = atom(markets);
export const addedValueValuesAtom = atom(addedValueValues);
export const productionSystemsAtom = atom(productionSystems);
export const indicatorsAtom = atom(indicators);
export const countriesAtom = atom(countries);
export const yearAtom = atom(year);
export const monthsAtom = atom(months);
export const productsAtom = atom(products);
