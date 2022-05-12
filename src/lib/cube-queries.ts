export type Observation = {
  observation: string;
  fullDate: string;
  measure: string;
  productOrigin: string;
  valueCreationStage: string;
  product?: string;
};

export const queryObservations = (
  cubes: { cube: string }[] | undefined,
  indicator: string
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

      SELECT ?observation ?fullDate ?measure ?productOrigin ?valueCreationStage ?product
      WHERE {
        ${unionCubesQuery}

        ?observation
          ${indicator} ?measure ;
          <https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/date> ?date ;
          <https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/productlist> ?productList ;
          <https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/productionsystem> ?productionSystem ;
          <https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/productorigin> ?productOrigin ;
          <https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/valuecreationstage> ?valueCreationStage .

        OPTIONAL {
          ?observation <https://agriculture.ld.admin.ch/foag/agricultural-market-data/dimension/product> ?product .
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
      LIMIT 100
    `;
  }
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
