import { ExtractAtomValue } from "jotai";

import { yearAtom } from "@/domain/data";
import { Locale } from "@/locales/locales";

export type ObservationIri = {
  observation: string;
};

// TODO: generate based on agDataDimensions keys
export type Observation = {
  date: string;
  measure: string;
  bundle?: string;
  confection?: string;
  dataType?: string;
  dataSource?: string;
  foreignTrade?: string;
  labelShare?: string;
  priceSegment?: string;
  productionStage?: string;
  product?: string;
  productList?: string;
  productFeatures?: string;
  productOrigin?: string;
  salesRegion?: string;
  typeOfUse?: string;
  unit?: string;
  valueCreationStage?: string;
};

export type Filter = { value: string };

export type Cube = {
  cube: string;
};

export type Dimension = {
  dimension: string;
  count: number;
};

export type AgDataDimension = {
  name: string;
  label: string;
  iri: string;
  // Optional dimension can contain empty values.
  isOptional: boolean;
};

const agDataBase = "https://lindas.admin.ch/foag/agricultural-market-data";
const agDataDim =
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension";
export const agDataDimensions: { [key: string]: AgDataDimension } = {
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/date":
    {
      name: "date",
      label: "Date",
      iri: `<${agDataDim}/date>`,
      isOptional: false,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/bundle":
    {
      name: "bundle",
      label: "Bundle",
      iri: `<${agDataDim}/bundle>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/confecion":
    {
      name: "confecion",
      label: "Confecion",
      iri: `<${agDataDim}/confecion>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/datatype":
    {
      name: "dataType",
      label: "Data Type",
      iri: `<${agDataDim}/datatype>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/datasource":
    {
      name: "dataSource",
      label: "Data Source",
      iri: `<${agDataDim}/datasource>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/foreigntrade":
    {
      name: "foreignTrade",
      label: "Foreign Trade",
      iri: `<${agDataDim}/foreigntrade>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/labelShare":
    {
      name: "labelShare",
      label: "Label Share",
      iri: `<${agDataDim}/labelShare>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/pricesegment":
    {
      name: "priceSegment",
      label: "Price Segment",
      iri: `<${agDataDim}/pricesegment>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/productionsystem":
    {
      name: "productionSystem",
      label: "Production System",
      iri: `<${agDataDim}/productionsystem>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/product":
    {
      name: "product",
      label: "Product",
      iri: `<${agDataDim}/product>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/productfeatures":
    {
      name: "productFeatures",
      label: "Product Features",
      iri: `<${agDataDim}/productfeatures>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/productlist":
    {
      name: "productList",
      label: "Product List",
      iri: `<${agDataDim}/productlist>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/productorigin":
    {
      name: "productOrigin",
      label: "Product Origin",
      iri: `<${agDataDim}/productorigin>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/salesregion":
    {
      name: "salesRegion",
      label: "Sales Region",
      iri: `<${agDataDim}/salesregion>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/typeofuse":
    {
      name: "typeOfUse",
      label: "Type of Use",
      iri: `<${agDataDim}/typeofuse>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/unit":
    {
      name: "unit",
      label: "Unit",
      iri: `<${agDataDim}/unit>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/valuecreationstage":
    {
      name: "valueCreationStage",
      label: "Value Creation Stage",
      iri: `<${agDataDim}/valuecreationstage>`,
      isOptional: true,
    },
};

// Below separation of logic makes queries much faster. A getUnsafeOptionalDimension
// could be used in all cases, but it is way slower compared to getSafeOptionalDimension.

/**
 * Generates SPARQL logic to retrieve **safe** optional dimension (dimension that is
 * present in all cubes that were merged together) that can contains empty values.
 */
const getSafeOptionalDimension = (name: string, locale: Locale) => {
  return `OPTIONAL {
    ?${name}Iri schema:name ?${name} .
    FILTER(LANGMATCHES(LANG(?${name}), "${locale}"))
  }`;
};

/**
 * Generates SPARQL logic to retrieve **unsafe** optional dimension (dimension that is
 * not present in some cubes that were merged together) that can contain empty values.
 */
const getUnsafeOptionalDimension = (
  name: string,
  iri: string,
  locale: Locale
) => {
  return `OPTIONAL {
    ?observation ${iri} ?${name}Iri .
    ?${name}Iri schema:name ?${name} .
    FILTER(LANGMATCHES(LANG(?${name}), "${locale}"))
  }`;
};

const getCubesObservations = (cubes: Cube[]) => {
  return `VALUES (?cube) { ${cubes.map((d) => `(<${d.cube}>)\n`).join("")} }
  ?cube cube:observationSet ?observationSet .
  ?observationSet cube:observation ?observation .`;
};

const selectDimensions = (dims: AgDataDimension[]) => {
  return `${dims
    .map((d) => `${d.iri} ?${d.name}${`${d.isOptional ? "Iri" : ""}`} `)
    .join("; \n")} .`;
};

export const queryObservationIris = (
  cubes: Cube[] | undefined,
  filters: {
    years: ExtractAtomValue<typeof yearAtom>;
  }
) => {
  if (!cubes || cubes.length === 0) {
    return undefined;
  }

  // TODO: Improve ORDER BY, currently 2000 will be before 1999.
  // Coverting to string makes it WAY faster than when sorting by date.
  // Retrieve date iri in more elegant way?
  return `
    PREFIX cube: <https://cube.link/>
    PREFIX sh: <http://www.w3.org/ns/shacl#>
    PREFIX schema: <http://schema.org/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT ?observation
    WHERE {
      ${getCubesObservations(cubes)}
      ?observation ${agDataDimensions[`${agDataDim}/date`].iri} ?date .

      BIND(
        IF(
          STRLEN(STR(?date)) = 4,
          xsd:dateTime(CONCAT(STR(?date), "-01-01")),
          IF(
            STRLEN(STR(?date)) = 7,
            xsd:dateTime(CONCAT(STR(?date), "-01")),
            xsd:dateTime(STR(?date))
          )
        ) as ?fullDate
      )

      FILTER(YEAR(?fullDate) >= ${filters.years.min} && YEAR(?fullDate) <= ${
    filters.years.max
  })
    }
    ORDER BY STR(?date)
    LIMIT 100
  `;
};

export const queryObservations = (
  nOfCubes: number,
  observationIris: ObservationIri[] | undefined,
  dimensions: Dimension[] | undefined,
  indicator: string,
  locale: Locale
) => {
  if (
    !observationIris ||
    observationIris.length === 0 ||
    !dimensions ||
    dimensions.length === 0
  ) {
    return undefined;
  }

  // TODO: This probably can be done better :)
  const safeDimensions = dimensions
    .filter((d) => +d.count === nOfCubes)
    .map((d) => agDataDimensions[d.dimension])
    .filter(Boolean);
  const unsafeDimensions = dimensions
    .filter((d) => +d.count !== nOfCubes)
    .map((d) => agDataDimensions[d.dimension])
    .filter(Boolean);
  const sparqlDimensions = [...safeDimensions, ...unsafeDimensions]
    .map((d) => `?${d.name}`)
    .join(" ");

  // TODO: Think about filtering by isOptional (currently only
  // date is availabe in all cubes).
  return `
    PREFIX cube: <https://cube.link/>
    PREFIX sh: <http://www.w3.org/ns/shacl#>
    PREFIX schema: <http://schema.org/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT ${sparqlDimensions} ?measure
    WHERE {
      VALUES (?observation) { ${observationIris
        .map((d) => `(<${d.observation}>)`)
        .join("\n")} }

      ?observation
        ${indicator} ?measure ;
        ${selectDimensions(safeDimensions)}

      ${safeDimensions
        .filter((d) => d.isOptional)
        .map((d) => getSafeOptionalDimension(d.name, locale))
        .join("\n")}

      ${unsafeDimensions
        .filter((d) => d.isOptional)
        .map((d) => getUnsafeOptionalDimension(d.name, d.iri, locale))
        .join("\n")}
    }
    ORDER BY STR(?date)
  `;
};

export const queryPossibleCubes = ({
  indicator,
  markets,
}: {
  indicator: string;
  markets: string[];
}) => {
  const res = `
    PREFIX cube: <https://cube.link/>
    PREFIX sh: <http://www.w3.org/ns/shacl#>

    SELECT ?cube
    FROM <${agDataBase}>
    WHERE {
      ?cube
        a cube:Cube ;
        cube:observationConstraint ?shape .
      ?shape ?p ?blankNode .
      ?blankNode sh:path ${indicator} .

      FILTER (
        ${markets
          .map((m) => `contains(str(?cube), "${m}")`)
          .join(" || \n     ")}
      )
    }
  `;

  return res;
};

export const queryDimensions = (cubes: Cube[] | undefined) => {
  if (!cubes || cubes.length === 0) {
    return undefined;
  }

  return `
    PREFIX sh: <http://www.w3.org/ns/shacl#>
    PREFIX cube: <https://cube.link/>
    PREFIX schema: <http://schema.org/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT DISTINCT ?dimension (COUNT(?dimension) as ?count)
    FROM <https://lindas.admin.ch/foag/agricultural-market-data>
    WHERE {
      VALUES (?cube) { ${cubes.map((d) => `(<${d.cube}>)`).join("\n")} }

      ?cube cube:observationConstraint ?shape .
      ?shape ?prop ?blankNode .
      ?blankNode sh:path ?dimension .

      FILTER(?dimension != rdf:type)
    }
    GROUP BY ?dimension
  `;
};

export const queryDistinctDimensionValues = (
  cubes: Cube[] | undefined,
  dimension: string
) => {
  if (!cubes || cubes.length === 0) {
    return undefined;
  }

  const res = `
    PREFIX cube: <https://cube.link/>
    PREFIX sh: <http://www.w3.org/ns/shacl#>

    SELECT DISTINCT ?value
    FROM <${agDataBase}>
    WHERE {
      ${getCubesObservations(cubes)}
      ?observation <${dimension}> ?value .
    }
  `;

  return res;
};

export const queryDateExtent = (cubes: Cube[] | undefined) => {
  if (!cubes || cubes.length === 0) {
    return undefined;
  }

  // TODO: Retrieve date in more elegant way?
  const res = `
    PREFIX cube: <https://cube.link/>
    PREFIX sh: <http://www.w3.org/ns/shacl#>

    SELECT (MIN(?date) as ?min) (MAX(?date) as ?max)
    FROM <${agDataBase}>
    WHERE {
      ${getCubesObservations(cubes)}
      ?observation ${agDataDimensions[`${agDataDim}/date`].iri} ?date .
    }
  `;

  return res;
};
