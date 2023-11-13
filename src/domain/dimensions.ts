import { amdpMeasure, amdpProperty } from "@/lib/namespace";
import { localeAtom } from "@/lib/use-locale";
import { DimensionType, fetchBaseDimensions, fetchCubeDimensions } from "@/pages/api/data";
import { atomsWithQuery, atomsWithQueryAsync } from "jotai-tanstack-query";
import { cubePathAtom } from "./cubes";

/**
 * Base dimensions.
 * This atom contains the definitions of the base dimensions. These are dimensions that we use to
 * know which cube to fetch. They contain minimal information in order to render the respective
 * filters.
 */
export const [baseDimensionsAtom, baseDimensionsStatusAtom] = atomsWithQuery((get) => ({
  queryKey: ["baseDimensions", get(localeAtom)],
  queryFn: () => fetchBaseDimensions({ locale: get(localeAtom) }),
}));

/**
 * Cube dimensions.
 * This atom contains the definitions of the dimensions of the cube that we are currently viewing.
 */
export const [cubeDimensionsAtom, cubeDimensionsStatusAtom] = atomsWithQueryAsync(async (get) => {
  const cubePath = await get(cubePathAtom);
  const locale = get(localeAtom);
  return {
    queryKey: ["cubeDimensions", cubePath, locale],
    queryFn: () => fetchCubeDimensions(locale, cubePath),
  };
});

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
  "productionSystem",
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
  productionSystem: {
    type: "property",
    id: "production-system",
    iri: amdpProperty("production-system").value,
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

export const DIMENSION_FILTERS = [{ dimension: dataDimensions.salesRegion.id, search: true }];

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
