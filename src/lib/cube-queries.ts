import { ExtractAtomValue } from "jotai";

import { yearAtom } from "@/domain/data";
import { Locale } from "@/locales/locales";

export type Observation = {
  fullDate: string;
  product?: string;
  valueCreationStage?: string;
  productList?: string;
  productionStage?: string;
  productOrigin?: string;
  measure: string;
  cube?: string;
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
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/product":
    {
      name: "product",
      label: "Product",
      iri: `<${agDataDim}/product>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/productlist":
    {
      name: "productList",
      label: "Product List",
      iri: `<${agDataDim}/productlist>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/productfeatures":
    {
      name: "productFeatures",
      label: "Product Features",
      iri: `<${agDataDim}/productfeatures>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/productorigin":
    {
      name: "productOrigin",
      label: "Product Origin",
      iri: `<${agDataDim}/productorigin>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/productionsystem":
    {
      name: "productionSystem",
      label: "Production System",
      iri: `<${agDataDim}/productionsystem>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/valuecreationstage":
    {
      name: "valueCreationStage",
      label: "Value Creation Stage",
      iri: `<${agDataDim}/valuecreationstage>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/unit":
    {
      name: "unit",
      label: "Unit",
      iri: `<${agDataDim}/unit>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/bundle":
    {
      name: "bundle",
      label: "Bundle",
      iri: `<${agDataDim}/bundle>`,
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
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/salesregion":
    {
      name: "salesRegion",
      label: "Sales Region",
      iri: `<${agDataDim}/salesregion>`,
      isOptional: true,
    },
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/foreigntrade":
    {
      name: "foreignTrade",
      label: "Foreign Trade",
      iri: `<${agDataDim}/foreigntrade>`,
      isOptional: true,
    },
};

const getOptionalDimension = (name: string, locale: Locale) => {
  return `OPTIONAL {
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
    .map((d) => `${d.iri} ?${`${d.isOptional ? `${d.name}Iri` : d.name}`} `)
    .join("; \n")} .`;
};

export const queryObservations = (
  cubes: Cube[] | undefined,
  dimensions: Dimension[] | undefined,
  indicator: string,
  locale: Locale,
  filters: {
    years: ExtractAtomValue<typeof yearAtom>;
  }
) => {
  if (!cubes || cubes.length === 0 || !dimensions || dimensions.length === 0) {
    return undefined;
  }

  const dimensionsToFetch = dimensions
    .map((d) => agDataDimensions[d.dimension])
    .filter(Boolean);
  const sparqlDimensions = dimensionsToFetch.map((d) => `?${d.name}`).join(" ");

  return `
    PREFIX cube: <https://cube.link/>
    PREFIX sh: <http://www.w3.org/ns/shacl#>
    PREFIX schema: <http://schema.org/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT ?cube ?fullDate ?measure ${sparqlDimensions}
    WHERE {
      ${getCubesObservations(cubes)}
      ?observation
        ${indicator} ?measure ;
        ${selectDimensions(dimensionsToFetch)}

      ${dimensionsToFetch
        .filter((d) => d.isOptional)
        .map((d) => getOptionalDimension(d.name, locale))
        .join("\n")}

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
      VALUES (?cube) { ${cubes.map((d) => `(<${d.cube}>)\n`).join("")} }

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
