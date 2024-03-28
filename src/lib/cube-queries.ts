import { Locale } from "@/locales/locales";
import { amdpMeasure, amdpDimension } from "./namespace";
import { isTruthy, mapKeys } from "remeda";

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

export const queryBaseMeasureDimensions = ({ locale }: { locale: Locale }) => {
  return `
  PREFIX cube: <https://cube.link/>
  PREFIX sh: <http://www.w3.org/ns/shacl#>
  PREFIX schema: <http://schema.org/>

  SELECT DISTINCT ?dimension ?label 
  FROM <${agDataBase}>
  WHERE {
  ?cube
  a cube:Cube ; 
  cube:observationConstraint ?shape .
  ?shape ?p ?blankNode .
  ?blankNode sh:path ?dimension .
    
  FILTER (
    contains(str(?dimension), "${amdpMeasure().value}")
  )

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
          OPTIONAL { ?value schema:name ?label . FILTER(lang(?label) = "${locale}") } 
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
      minDate: { year: string; month?: string };
      maxDate: { year: string; month?: string };
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
  /** If set, IRIs will be translated */
  lang?: "fr" | "de" | "en" | "it";
};

const dimensionsSpec = mapKeys(
  {
    "cost-component": {
      labelled: true,
    },
    currency: {
      labelled: true,
    },
    "data-method": {
      labelled: true,
    },
    date: {
      interval: true,
    },
    "data-source": {
      labelled: true,
    },
    "foreign-trade": {
      labelled: true,
    },
    "key-indicator-type": {
      labelled: true,
    },
    market: {
      labelled: true,
    },
    product: {
      labelled: true,
    },
    "product-group": {
      labelled: true,
    },
    "product-subgroup": {
      labelled: true,
    },
    "product-properties": {
      labelled: true,
    },
    "production-system": {
      labelled: true,
    },
    "product-origin": {
      labelled: true,
    },
    "sales-region": {
      labelled: true,
    },
    unit: {
      labelled: true,
    },
    usage: {
      labelled: true,
    },
    "value-chain": {
      labelled: true,
    },
    "value-chain-detail": {
      labelled: true,
    },
  } as Record<
    string,
    {
      labelled?: boolean;
      interval?: true;
    }
  >,
  (x: string) => amdpDimension(x).value
);

const labelSuffix = "Label";

const timeFilterModeToTermset: Record<TimeFilter["mode"], string> = {
  Month: "https://ld.admin.ch/time/month" as const,
  Year: "https://ld.admin.ch/time/year" as const,
};
export const queryObservations = ({
  cubeIri,
  filters,
  dimensions,
  measure,
  timeFilter,
  lang,
}: QueryObservationsOptions) => {
  const labelledDimensions = new Set(
    dimensions
      .filter((x) => {
        return dimensionsSpec[x.iri]?.labelled;
      })
      .map((x) => x.iri)
  );
  return `
  PREFIX cube: <https://cube.link/>
  PREFIX sh: <http://www.w3.org/ns/shacl#>
  PREFIX schema: <http://schema.org/>
  PREFIX time: <http://www.w3.org/2006/time#>
  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
  
  SELECT ?observation
    ${dimensions
      .map((d) => {
        if (d.key === "date") {
          return null;
        }
        if (lang && labelledDimensions.has(d.iri)) {
          return `?${d.key}${labelSuffix}`;
        } else {
          return `?${d.key}`;
        }
      })
      .filter(isTruthy)
      .join(" ")} ?measure
    ?year ?month
  WHERE {
    GRAPH <${agDataBase}> {
      ${
        lang
          ? `
      VALUES(?lang) { ("${lang}") } `
          : ""
      }
      ${
        filters
          ? Object.entries(filters)
              .map(([key, values]) => {
                return `FILTER (?${key} in ( ${values.map((v) => `<${v}>`).join(",")} ) )`;
              })
              .join("\n")
          : ""
      }
      <${cubeIri}> cube:observationSet ?observationSet .
      ?observationSet cube:observation ?observation .
      ${dimensions
        .map((dim) => {
          const { key, iri } = dim;
          const keyV = `?${key}`;
          const labelV = `?${key}${labelSuffix}`;
          return `        ?observation <${iri}> ${keyV} .${
            lang && labelledDimensions.has(iri)
              ? `
            optional { 
              ${keyV} schema:name ${labelV}
              filter langMatches(lang(${labelV}), ?lang)
            }`
              : ""
          }`;
        })
        .join("\n")}
      ?observation <${measure.iri}> ?measure .
    }

    ?date time:year ?year.
    OPTIONAL { ?date time:month ?month. }


    ${
      timeFilter.minDate && timeFilter.maxDate
        ? `
      ?fromInterval
        schema:inDefinedTermSet <${timeFilterModeToTermset[timeFilter.mode]}> ;
        time:year "${timeFilter.minDate.year}"^^schema:Integer ; ${
          timeFilter.mode === "Month"
            ? `time:month "${timeFilter.minDate.month}"^^schema:Integer ;`
            : ""
        }
        time:hasBeginning/time:inXSDDateTimeStamp ?fromPeriod .

    ?toInterval
      schema:inDefinedTermSet <${timeFilterModeToTermset[timeFilter.mode]}> ;
      time:year "${timeFilter.maxDate.year}"^^schema:Integer ;
      ${
        timeFilter.mode === "Month"
          ? `time:month "${timeFilter.maxDate.month}"^^schema:Integer ;`
          : ""
      }
      time:hasEnd/time:inXSDDateTimeStamp ?toPeriod .

    ?date time:hasBeginning/time:inXSDDateTimeStamp ?start .
    ?date time:hasEnd/time:inXSDDateTimeStamp ?end .
  
    FILTER (?start >= ?fromPeriod)
    FILTER (?end <= ?toPeriod)`
        : ""
    }
    
    
  } ORDER BY ?year ?month
  `;
};
