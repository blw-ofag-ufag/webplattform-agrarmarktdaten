import { Locale } from "@/locales/locales";

export type Observation = {
  fullDate: string;
  product?: string;
  valueCreationStage?: string;
  productList?: string;
  productionStage?: string;
  productOrigin?: string;
  measure: string;
};

export const queryObservations = (
  cubes: Cube[] | undefined,
  indicator: string,
  locale: Locale
) => {
  if (cubes?.length) {
    const unionCubesQuery = cubes
      .map(({ cube }) => {
        const cubeQuery = `
          SELECT *
          WHERE {
            <${cube}> cube:observationSet ?observationSet .
            ?observationSet cube:observation ?observation .
          }
        `;

        return `{ ${cubeQuery} }`;
      })
      .join(" UNION ");

    return `
      PREFIX cube: <https://cube.link/>
      PREFIX sh: <http://www.w3.org/ns/shacl#>
      PREFIX schema: <http://schema.org/>
      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

      SELECT ?fullDate ?product ?valueCreationStage ?productList ?productionSystem ?productOrigin ?measure
      WHERE {
        ${unionCubesQuery}

        ?observation
          ${indicator} ?measure ;
          <https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/date> ?date .

        OPTIONAL {
          ?observation <https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/product> ?productIri .
          ?productIri schema:name ?product .

          FILTER(LANG(?product) = "${locale}")
        }

        OPTIONAL {
          ?observation <https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/valuecreationstage> ?valueCreationStageIri .
          ?valueCreationStageIri schema:name ?valueCreationStage .

          FILTER(LANG(?valueCreationStage) = "${locale}")
        }

        OPTIONAL {
          ?observation <https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/productlist> ?productListIri .
          ?productListIri schema:name ?productList .

          FILTER(LANG(?productList) = "${locale}")
        }

        OPTIONAL {
          ?observation <https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/productionsystem> ?productionSystemIri .
          ?productionSystemIri schema:name ?productionSystem .

          FILTER(LANG(?productionSystem) = "${locale}")
        }

        OPTIONAL {
          ?observation <https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/productorigin> ?productOriginIri .
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

        FILTER(YEAR(?fullDate) >= 2017 && YEAR(?fullDate) <= 2020)
      }
      ORDER BY ?fullDate ?product ?valueCreationStage ?productList ?productionSystem ?productOrigin
      LIMIT 100
    `;
  }
};

export type Cube = {
  cube: string;
};

export const queryPossibleCubesForIndicator = (dimension: string) => {
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
      ?blankNode sh:path ?dimension .

      FILTER(?dimension = ${dimension})
    }
  `;

  return res;
};
