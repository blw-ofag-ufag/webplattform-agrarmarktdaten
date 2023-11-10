import { amdp, amdpMeasure, amdpProperty } from "@/lib/namespace";
import { localeAtom } from "@/lib/use-locale";
import {
  DimensionType,
  Filter,
  fetchCube,
  fetchDimensions,
  fetchObservations,
} from "@/pages/api/use-sparql";
import { atom } from "jotai";
import { atomsWithQuery, atomsWithQueryAsync } from "jotai-tanstack-query";
import {
  FilterConfig,
  filtersSelectionAtomsAtom,
  indicatorAtom,
  indicators,
  timeViewAtom,
} from "./filters";

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/* Atoms */

export const cubePathAtom = atom((get) => {
  const indicator = get(indicatorAtom);
  const timeView = get(timeViewAtom);
  const cubePath = amdp(
    `cube/MilkDairyProducts/Consumption_${capitalizeFirstLetter(
      indicator?.key || indicators[0].key
    )}_${capitalizeFirstLetter(timeView)}`
  ).value;
  return cubePath;
});

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
  const filterSelections = await get(filtersSelectionAtomsAtom);
  const filters = Object.entries(filterSelections).reduce((acc, [key, atom]) => {
    const selectedValues = get(atom);
    console.log({ selectedValues });
    if (selectedValues) {
      acc.push({
        dimensionIri: dataDimensions[key as Property].iri,
        key: key as Property,
        values: selectedValues.map((v) => v.value),
      });
    }
    return acc;
  }, [] as Filter[]);

  console.log({ filters });

  return {
    queryKey: ["observations", get(cubePathAtom), JSON.stringify(filters)],
    queryFn: () => {
      if (cube.view && dimensions) {
        return fetchObservations(cube.view, dimensions, filters);
      }
      throw Error("Need view and dimensions to fetch observations");
    },
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
