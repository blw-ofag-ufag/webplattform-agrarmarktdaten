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

const agDataBase = "https://lindas.admin.ch/foag/agricultural-market-data";
const agDataDim =
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension";
export const dimensions = {
  date: `<${agDataDim}/date>`,
  product: `<${agDataDim}/product>`,
  productList: `<${agDataDim}/productlist>`,
  productOrigin: `<${agDataDim}/productorigin>`,
  productionSystem: `<${agDataDim}/productionsystem>`,
  valueCreationStage: `<${agDataDim}/valuecreationstage>`,
};

const getOptionalDimension = (
  dimensionName: keyof typeof dimensions,
  locale: Locale
) => {
  const dimensionIri = dimensions[dimensionName];

  return `OPTIONAL {
    ?observation ${dimensionIri} ?${dimensionName}Iri .
    ?${dimensionName}Iri schema:name ?${dimensionName} .

    FILTER(LANG(?${dimensionName}) = "${locale}")
  }`;
};

const getCubesObservations = (cubes: Cube[]) => {
  return `VALUES (?cube) { ${cubes.map((d) => `(<${d.cube}>)\n`).join("")} }
  ?cube cube:observationSet ?observationSet .
  ?observationSet cube:observation ?observation .`;
};

export const queryObservations = (
  cubes: Cube[] | undefined,
  indicator: string,
  locale: Locale,
  filters: {
    years: ExtractAtomValue<typeof yearAtom>;
  }
) => {
  if (!cubes || cubes.length === 0) {
    return undefined;
  }

  const optionalDimensionsToFetch: (keyof typeof dimensions)[] = [
    "product",
    "valueCreationStage",
    "productList",
    "productionSystem",
    "productOrigin",
  ];

  const sparqlOptionalDimensions = optionalDimensionsToFetch
    .map((d) => `?${d}`)
    .join(" ");

  return `
    PREFIX cube: <https://cube.link/>
    PREFIX sh: <http://www.w3.org/ns/shacl#>
    PREFIX schema: <http://schema.org/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT ?cube ?fullDate ?measure ${sparqlOptionalDimensions}
    WHERE {
      FILTER(YEAR(?fullDate) >= ${
        filters.years.value[0]
      } && YEAR(?fullDate) <= ${filters.years.value[1]})

      ${getCubesObservations(cubes)}
      ?observation
        ${indicator} ?measure ;
        ${dimensions.date} ?date .

      ${optionalDimensionsToFetch
        .map((d) => getOptionalDimension(d, locale))
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
    }
    ORDER BY ?fullDate ${sparqlOptionalDimensions}
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
      ?observation ${dimensions.date} ?date .
    }
  `;

  return res;
};
