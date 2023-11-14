import { amdpMeasure, amdpDimension } from "@/lib/namespace";
import { localeAtom } from "@/lib/use-locale";
import { DimensionType, fetchBaseDimensions, fetchCubeDimensions } from "@/pages/api/data";
import { atomsWithQuery, atomsWithQueryAsync } from "jotai-tanstack-query";
import { cubePathAtom, cubesAtom } from "./cubes";
import { atom } from "jotai";
import { filterCubeSelectionAtom } from "./filters";

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

export const availableBaseDimensionsValuesAtom = atom(async (get) => {
  const cubes = await get(cubesAtom);
  const filterCubeSelection = await get(filterCubeSelectionAtom);

  /**
   * This probably could be done in a more elegant way.
   */
  return {
    "value-chain": {
      options: cubes
        .filter(
          (c) =>
            c.measure === get(filterCubeSelection.measure)?.value &&
            c.market === get(filterCubeSelection.market)?.value
        )
        .map((c) => c.valueChain),
    },
    market: {
      options: cubes
        .filter(
          (c) =>
            c.measure === get(filterCubeSelection.measure)?.value &&
            c.valueChain === get(filterCubeSelection["value-chain"])?.value
        )
        .map((c) => c.valueChain),
    },
    measure: {
      options: cubes
        .filter(
          (c) =>
            c.market === get(filterCubeSelection.market)?.value &&
            c.valueChain === get(filterCubeSelection["value-chain"])?.value
        )
        .map((c) => c.valueChain),
    },
  };
});

export const availableValueChainAtom = atom(async (get) => {
  const cubes = await get(cubesAtom);
  const filterCubeSelection = await get(filterCubeSelectionAtom);
  const measure = get(filterCubeSelection.measure);
  const availableChain = cubes
    .filter((cube) => cube.measure === measure?.value)
    .map((cube) => cube.valueChain);
  return availableChain;
});

export const availableMeasuresAtom = atom(async (get) => {
  const cubes = await get(cubesAtom);
  const filterCubeSelection = await get(filterCubeSelectionAtom);
  const valueChain = get(filterCubeSelection["value-chain"]);
  const measures = cubes
    .filter((cube) => cube.valueChain === valueChain?.value)
    .map((cube) => cube.measure);
  return measures;
});

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

export const MEASURES = ["price", "quantity", "index"] as const;

export const PROPERTIES = [
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
  "productSubgroup",
  "productProperties",
  "productionSystem",
  "productOrigin",
  "salesRegion",
  "unit",
  "usage",
  "valueChainDetail",
  "valueChain",
] as const;

export type Measure = (typeof MEASURES)[number];
export type Property = (typeof PROPERTIES)[number];

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
    iri: amdpDimension("cost-component").value,
  },
  currency: {
    type: "property",
    id: "currency",
    iri: amdpDimension("currency").value,
  },
  dataMethod: {
    type: "property",
    id: "data-method",
    iri: amdpDimension("data-method").value,
  },
  dataSource: {
    type: "property",
    id: "data-source",
    iri: amdpDimension("data-source").value,
  },
  date: {
    type: "property",
    id: "date",
    iri: amdpDimension("date").value,
  },
  foreignTrade: {
    type: "property",
    id: "foreign-trade",
    iri: amdpDimension("foreign-trade").value,
  },
  keyIndicatorType: {
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
  productGroup: {
    type: "property",
    id: "product-group",
    iri: amdpDimension("product-group").value,
  },
  productionSystem: {
    type: "property",
    id: "production-system",
    iri: amdpDimension("production-system").value,
  },
  productOrigin: {
    type: "property",
    id: "product-origin",
    iri: amdpDimension("product-origin").value,
  },
  productSubgroup: {
    type: "property",
    id: "product-subgroup",
    iri: amdpDimension("product-subgroup").value,
  },
  productProperties: {
    type: "property",
    id: "product-properties",
    iri: amdpDimension("product-properties").value,
  },
  salesRegion: {
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
  valueChainDetail: {
    type: "property",
    id: "value-chain-detail",
    iri: amdpDimension("value-chain-detail").value,
  },
  valueChain: {
    type: "property",
    id: "value-chain",
    iri: amdpDimension("value-chain").value,
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
