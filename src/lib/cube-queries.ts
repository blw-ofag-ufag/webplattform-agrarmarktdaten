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

const agDataDim =
  "https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension";

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

  return `
      PREFIX cube: <https://cube.link/>
      PREFIX sh: <http://www.w3.org/ns/shacl#>
      PREFIX schema: <http://schema.org/>
      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

      SELECT ?cube ?fullDate ?product ?valueCreationStage ?productList ?productionSystem ?productOrigin ?measure
      WHERE {
        FILTER(YEAR(?fullDate) >= ${
          filters.years.value[0]
        } && YEAR(?fullDate) <= ${filters.years.value[1]})

        ${getCubesObservations(cubes)}
        ?observation
          ${indicator} ?measure ;
          <${agDataDim}/date> ?date .

        OPTIONAL {
          ?observation <${agDataDim}/product> ?productIri .
          ?productIri schema:name ?product .

          FILTER(LANG(?product) = "${locale}")
        }

        OPTIONAL {
          ?observation <${agDataDim}/valuecreationstage> ?valueCreationStageIri .
          ?valueCreationStageIri schema:name ?valueCreationStage .

          FILTER(LANG(?valueCreationStage) = "${locale}")
        }

        OPTIONAL {
          ?observation <${agDataDim}/productlist> ?productListIri .
          ?productListIri schema:name ?productList .

          FILTER(LANG(?productList) = "${locale}")
        }

        OPTIONAL {
          ?observation <${agDataDim}/productionsystem> ?productionSystemIri .
          ?productionSystemIri schema:name ?productionSystem .

          FILTER(LANG(?productionSystem) = "${locale}")
        }

        OPTIONAL {
          ?observation <${agDataDim}/productorigin> ?productOriginIri .
          ?productOriginIri schema:name ?productOrigin .

          FILTER(LANG(?productOrigin) = "${locale}")
        }

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
      ORDER BY ?fullDate ?product ?valueCreationStage ?productList ?productionSystem ?productOrigin
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
    FROM <https://lindas.admin.ch/foag/agricultural-market-data>
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
    FROM <https://lindas.admin.ch/foag/agricultural-market-data>
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
    FROM <https://lindas.admin.ch/foag/agricultural-market-data>
    WHERE {
      ${getCubesObservations(cubes)}
      ?observation <${dimensions.date}> ?date .
    }
  `;

  return res;
};

export const dimensions = {
  date: `${agDataDim}/date`,
};
