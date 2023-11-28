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
  OPTIONAL { ?dimensionValue schema:name ?dimensionValueLabel. FILTER(lang(?dimensionValueLabel) = "${locale}") } 
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
  OPTIONAL { ?blankNode schema:name ?label. FILTER(lang(?label) = "${locale}") } 
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

export type TimeFilter =
  | {
      minDate: string;
      maxDate: string;
      mode: "Year" | "Month";
    }
  | {
      minDate: null;
      maxDate: null;
      mode: "Year" | "Month";
    };

type QueryObservationsOptions = {
  cubeIri: string;
  filters?: Record<string, string[]>;
  dimensions: { iri: string; key: string }[];
  measure: { iri: string; key: string };
  timeFilter: TimeFilter;
};

export const queryObservations = ({
  cubeIri,
  filters,
  dimensions,
  measure,
  timeFilter,
}: QueryObservationsOptions) => {
  return `
  PREFIX cube: <https://cube.link/>
  PREFIX sh: <http://www.w3.org/ns/shacl#>
  PREFIX schema: <http://schema.org/>
  PREFIX time: <http://www.w3.org/2006/time#>
  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
  
  SELECT DISTINCT ?observation
    ${dimensions.map((d) => `?${d.key}`).join(" ")} ?measure
    ?formattedDate
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

    ?date time:year ?timeYear.
    
  	${
      timeFilter.mode === "Month"
        ? // There must be a better way to do that but using direct comparison like < "10"^^schema:integer
          // would not work because the considered order would be lexicographic instead of numerical.
          // @see https://zulip.zazuko.com/#narrow/stream/40-bafu-ext/topic/temporal.20entities.20.26.20timezones/near/375697
          `
      ?date time:month ?timeMonth.

      BIND(
        COALESCE(
          IF(
            ?timeMonth = "12"^^schema:Integer ||
            ?timeMonth = "11"^^schema:Integer ||
            ?timeMonth = "10"^^schema:Integer, 
              CONCAT(str(?timeYear), "-", str(?timeMonth)),
              1/0
          ),
          CONCAT(str(?timeYear), "-",   CONCAT("0", str(?timeMonth)))
        ) AS ?formattedDate
      )`
        : `
      BIND(
        str(?timeYear) as ?formattedDate
      )
    `
    }
  
    ${
      timeFilter.minDate && timeFilter.maxDate
        ? `
      FILTER (
        ?formattedDate >= "${timeFilter.minDate}" && ?formattedDate <= "${timeFilter.maxDate}"
      )
      `
        : ""
    }

    
  } ORDER BY ?formattedDate
  `;
};
