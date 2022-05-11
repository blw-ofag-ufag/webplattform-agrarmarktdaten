export const queryObservations = () => {
  return `
    BASE <https://agriculture.ld.admin.ch/foag/agricultural-market-data/>
    PREFIX cube: <https://cube.link/>
    PREFIX sh: <http://www.w3.org/ns/shacl#>
    PREFIX schema: <http://schema.org/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    
    SELECT ?observationSet ?observation ?fullDate ?price ?productOrigin ?valueCreationStage
    WHERE {
      {
        SELECT * WHERE {
          <arable-crops-mills/1>
            cube:observationSet ?observationSet .
              ?observationSet cube:observation ?observation .
        }
      } UNION {
        SELECT * WHERE {
          <arable-crops-collection-points/1>
            cube:observationSet ?observationSet .
              ?observationSet cube:observation ?observation .
        }
      }
    
      ?observation
        schema:price ?price ;
        <dimension/date> ?date .
    
      OPTIONAL {
        ?observation
          <dimension/productorigin> ?productOrigin ;
          <dimension/valuecreationstage> ?valueCreationStage .
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
  `;
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
