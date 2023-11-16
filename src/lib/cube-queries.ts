import { Locale } from "@/locales/locales";
import { amdpMeasure, amdpDimension } from "./namespace";

const agDataBase = "https://lindas.admin.ch/foag/agricultural-market-data";

export const queryCubes = () => {
  return `
  PREFIX cube: <https://cube.link/>
  PREFIX sh: <http://www.w3.org/ns/shacl#>
  
  SELECT DISTINCT ?cube ?measure ?valueChain ?market
  FROM <${agDataBase}>
  WHERE {
    ?cube
    a cube:Cube ; 
    cube:observationConstraint ?shape .
    ?shape ?p ?blankNode .
    ?blankNode sh:path ?measure .
    ?cube cube:observationSet ?observationSet .
    ?observationSet cube:observation ?observation .
    ?observation <${amdpDimension("value-chain").value}> ?valueChain .
    ?observation <${amdpDimension("market").value}> ?market .
    
    FILTER (
      contains(str(?measure), "${amdpMeasure().value}")
    )
  }
  `;
};

export const queryBasePropertyDimensions = ({
  locale,
  propertiesIri,
}: {
  locale: Locale;
  propertiesIri: string[];
}) => {
  return `
  PREFIX cube: <https://cube.link/>
  PREFIX sh: <http://www.w3.org/ns/shacl#>
  PREFIX schema: <http://schema.org/>

  SELECT DISTINCT ?dimension ?label ?dimensionValue ?dimensionValueLabel
  FROM <${agDataBase}>
  WHERE {
    VALUES (?dimension) {
    ${propertiesIri.map((iri) => `(<${iri}>)`).join("\n")}  
  }
  ?cube
  a cube:Cube ; 
  cube:observationConstraint ?shape .
  ?shape ?p ?blankNode .
  ?blankNode sh:path ?dimension .
  OPTIONAL { ?blankNode schema:name ?label. FILTER(lang(?label) = "${locale}") } 
  ?cube cube:observationSet ?observationSet .
  ?observationSet cube:observation ?observation.
  ?observation ?dimension ?dimensionValue.
  ?dimensionValue schema:name ?dimensionValueLabel. FILTER(lang(?dimensionValueLabel) = "${locale}")
}
`;
};

export const queryBaseMeasureDimensions = ({
  locale,
  measuresIri,
}: {
  locale: Locale;
  measuresIri: string[];
}) => {
  return `
  PREFIX cube: <https://cube.link/>
  PREFIX sh: <http://www.w3.org/ns/shacl#>
  PREFIX schema: <http://schema.org/>

  SELECT DISTINCT ?dimension ?label 
  FROM <${agDataBase}>
  WHERE {
    VALUES (?dimension) {
      ${measuresIri.map((iri) => `(<${iri}>)`).join("\n")} 
  }
  ?cube
  a cube:Cube ; 
  cube:observationConstraint ?shape .
  ?shape ?p ?blankNode .
  ?blankNode sh:path ?dimension .
  ?blankNode schema:name ?label. FILTER(lang(?label) = "${locale}")
}`;
};

export const queryCubeDimensions = ({ locale, cubeIri }: { locale: Locale; cubeIri: string }) => {
  return `
  PREFIX cube: <https://cube.link/>
  PREFIX sh: <http://www.w3.org/ns/shacl#>
  PREFIX schema: <http://schema.org/>

  SELECT DISTINCT ?dimension ?label ?type ?description
  FROM <${agDataBase}>
  WHERE {
    <${cubeIri}> cube:observationConstraint ?shape .
    ?shape ?p ?blankNode .
    ?blankNode sh:path ?dimension .
    OPTIONAL { ?blankNode schema:name ?label . FILTER(lang(?label) = "${locale}") } 
    OPTIONAL { ?blankNode schema:description ?description . FILTER(lang(?description) = "${locale}") } 
    OPTIONAL { ?blankNode a ?type . } 
  }
  `;
};

export const queryPropertyDimensionAndValues = ({
  locale,
  cubeIri,
  dimensionsIris,
}: {
  locale: Locale;
  cubeIri: string;
  dimensionsIris: string[];
}) => {
  return `
  PREFIX cube: <https://cube.link/>
  PREFIX sh: <http://www.w3.org/ns/shacl#>
  PREFIX schema: <http://schema.org/>

  SELECT DISTINCT ?dimension ?value ?label  
  FROM <${agDataBase}>
  WHERE {
    ${dimensionsIris
      .map(
        (dimensionIri) => `
      {
        SELECT DISTINCT ?dimension ?value ?label {
          VALUES (?dimension) { (<${dimensionIri}>) }
          <${cubeIri}> cube:observationSet ?observationSet .
          ?observationSet cube:observation ?observation .
          ?observation ?dimension ?value .
          ?value schema:name ?label . FILTER(lang(?label) = "${locale}")
        }
      }`
      )
      .join(" UNION")}
  }
  `;
};

export const queryMeasureDimensionRange = ({
  cubeIri,
  dimensionIri,
}: {
  locale: Locale;
  cubeIri: string;
  dimensionIri: string;
}) => {
  return `
  PREFIX cube: <https://cube.link/>
  PREFIX sh: <http://www.w3.org/ns/shacl#>
  PREFIX schema: <http://schema.org/>

  SELECT DISTINCT ?min ?max
  FROM <${agDataBase}>
  WHERE {
    <${cubeIri}> cube:observationConstraint ?shape .
    ?shape ?prop ?blankNode .
    ?blankNode sh:path <${dimensionIri}> .
    ?blankNode sh:minInclusive ?min .
  	?blankNode sh:maxInclusive ?max .
  }
  `;
};

export const queryObservations = ({
  cubeIri,
  filters,
  dimensions,
  measure,
}: {
  cubeIri: string;
  filters?: Record<string, string[]>;
  dimensions: { iri: string; key: string }[];
  measure: { iri: string; key: string };
}) => {
  return `
  PREFIX cube: <https://cube.link/>
  PREFIX sh: <http://www.w3.org/ns/shacl#>
  PREFIX schema: <http://schema.org/>
  
  SELECT DISTINCT ?observation ${dimensions.map((d) => `?${d.key}`).join(" ")} ?measure
  WHERE {
    GRAPH <${agDataBase}> {
      ${
        filters
          ? Object.entries(filters)
              .map(([key, values]) => {
                return `VALUES(?${key}) { ${values.map((v) => `(<${v}>)`).join("\n")} }`;
              })
              .join("\n")
          : ""
      }
      <${cubeIri}> cube:observationSet ?observationSet .
      ?observationSet cube:observation ?observation .
      ${dimensions
        .map((dimension) => {
          return `?observation <${dimension.iri}> ?${dimension.key} .`;
        })
        .join("\n")}
      ?observation <${measure.iri}> ?measure .
    }
  }
  `;
};
