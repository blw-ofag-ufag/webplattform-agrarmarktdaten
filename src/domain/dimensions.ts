import { amdpDimension, amdpMeasure } from "@/lib/namespace";
import { DimensionType } from "@/pages/api/data";

/* Data Dimensions */

export const MEASURES = ["price", "quantity", "index"] as const;

export const DIMENSIONS = [
  "cost-component",
  "currency",
  "data-method",
  "data-source",
  "date",
  "foreign-trade",
  "key-indicator-type",
  "market",
  "product",
  "product-group",
  "product-subgroup",
  "product-properties",
  "production-system",
  "product-origin",
  "sales-region",
  "unit",
  "usage",
  "value-chain-detail",
  "value-chain",
] as const;

export const dimensionsToShowSorted = [
  "date",
  "market",
  "value-chain",
  "price",
  "quantity",
  "index",
  "currency",
  "product",
  "unit",
  "product-subgroup",
  "product-group",
  "product-properties",
  "production-system",
  "product-origin",
  "sales-region",
  "foreign-trade",
  "key-indicator-type",
  "usage",
  "value-chain-detail",
];

const CUBE_DEFINITION_DIMENSIONS = ["value-chain", "market", "measure"] as const;
export type CubeDimension = (typeof CUBE_DEFINITION_DIMENSIONS)[number];

export type Measure = (typeof MEASURES)[number];
export const isMeasure = (x: any): x is Measure => MEASURES.includes(x);

export type Dimension = (typeof DIMENSIONS)[number];
export const isDimension = (x: any): x is Dimension => DIMENSIONS.includes(x);

export const dataDimensions: {
  [key in Measure | Dimension]: {
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
  ["cost-component"]: {
    type: "property",
    id: "cost-component",
    iri: amdpDimension("cost-component").value,
  },
  currency: {
    type: "property",
    id: "currency",
    iri: amdpDimension("currency").value,
  },
  ["data-method"]: {
    type: "property",
    id: "data-method",
    iri: amdpDimension("data-method").value,
  },
  ["data-source"]: {
    type: "property",
    id: "data-source",
    iri: amdpDimension("data-source").value,
  },
  date: {
    type: "property",
    id: "date",
    iri: amdpDimension("date").value,
  },
  ["foreign-trade"]: {
    type: "property",
    id: "foreign-trade",
    iri: amdpDimension("foreign-trade").value,
  },
  ["key-indicator-type"]: {
    type: "property",
    id: "key-indicator-type",
    iri: amdpDimension("key-indicator-type").value,
  },
  market: {
    type: "property",
    id: "market",
    iri: amdpDimension("market").value,
  },
  product: {
    type: "property",
    id: "product",
    iri: amdpDimension("product").value,
  },
  ["product-group"]: {
    type: "property",
    id: "product-group",
    iri: amdpDimension("product-group").value,
  },
  ["production-system"]: {
    type: "property",
    id: "production-system",
    iri: amdpDimension("production-system").value,
  },
  ["product-origin"]: {
    type: "property",
    id: "product-origin",
    iri: amdpDimension("product-origin").value,
  },
  ["product-subgroup"]: {
    type: "property",
    id: "product-subgroup",
    iri: amdpDimension("product-subgroup").value,
  },
  ["product-properties"]: {
    type: "property",
    id: "product-properties",
    iri: amdpDimension("product-properties").value,
  },
  ["sales-region"]: {
    type: "property",
    id: "sales-region",
    iri: amdpDimension("sales-region").value,
  },
  unit: {
    type: "property",
    id: "unit",
    iri: amdpDimension("unit").value,
  },
  usage: {
    type: "property",
    id: "usage",
    iri: amdpDimension("usage").value,
  },
  ["value-chain-detail"]: {
    type: "property",
    id: "value-chain-detail",
    iri: amdpDimension("value-chain-detail").value,
  },
  ["value-chain"]: {
    type: "property",
    id: "value-chain",
    iri: amdpDimension("value-chain").value,
  },
};

type IriMap = {
  [key: string]: {
    type: DimensionType;
    id: string;
    iri: string;
    key: Measure | Dimension;
  };
};

export const dimensionIriMap: IriMap = Object.entries(dataDimensions).reduce(
  (acc, [key, value]) => {
    acc[value.iri] = { ...value, key: key as Measure | Dimension };
    return acc;
  },
  {} as IriMap
);
