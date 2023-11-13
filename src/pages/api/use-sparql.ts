import { DataDimension, Measure, Property, dimensionIriMap } from "@/domain/dimensions";
import { defaultLocale } from "@/locales/locales";
import { NamespaceBuilder } from "@rdfjs/namespace";
import { Literal, NamedNode } from "@rdfjs/types";
import { uniqBy } from "lodash";
import { Cube, CubeDimension, Dimension, LookupSource, Source, View } from "rdf-cube-view-query";
import rdf from "rdf-ext";
import * as ns from "../../lib/namespace";

const amdpSource = new Source({
  endpointUrl: "https://test.lindas.admin.ch/query",
  sourceGraph: "https://lindas.admin.ch/foag/agricultural-market-data",
});

type Filters = { [key: string]: string[] | null | undefined } | null;

export type CubeResult = {
  cube: Cube;
  iri?: string;
  view?: View;
  versionHistory?: string;
};

export type DimensionType = "property" | "measure" | "other";
export type DimensionValue = {
  iri: string;
  name: string;
  view: View;
  source: Source;
};

export type BaseDimension = {
  iri: string;
  dimension: Dimension;
  datatype?: CubeDimension["datatype"];
  name: string;
  type: DimensionType;
  key?: DataDimension;
};

export type PropertyDimension = BaseDimension & {
  type: "property";
  values: DimensionValue[];
  key: Property;
};

export type MeasureDimension = BaseDimension & {
  min: number;
  max: number;
  type: "measure";
  key: Measure;
};
export type DimensionsResult = {
  property: PropertyDimension[];
  measure: MeasureDimension[];
  other: BaseDimension[];
};

export type UseQueryResult<T> = {
  executionTime: number | undefined;
  error: unknown | undefined;
  fetching: boolean;
  data: T | undefined;
};

export type SparqlQueryResult<T> = {
  sparqlQuery: string | undefined;
} & UseQueryResult<T>;

export const fetchSparql = async (query: string) => {
  console.log("> fetchSparql");
  console.log(query);
  const body = JSON.stringify({ query });
  const res = await fetch("/api/sparql", {
    method: "post",
    body,
  }).then((resp) => resp.json());
  return res;
};

export const fetchCube = async (iri: string): Promise<CubeResult> => {
  const cube = await amdpSource.cube(iri);
  if (cube) {
    const view = View.fromCube(cube);

    return {
      cube,
      iri: cube.term?.value,
      view,
      versionHistory: cube.out(ns.schema.hasPart).value,
    };
  }
  throw Error(`Cube not found: ${iri}.`);
};

export const fetchPossibleCubes = async (): Promise<CubeResult[]> => {
  const cubes = await amdpSource.cubes();
  const results = cubes.map((cube) => {
    return {
      cube,
      iri: cube.term?.value,
      view: View.fromCube(cube),
      versionHistory: cube.out(ns.schema.hasPart).value,
    };
  });
  return results;
};

export type Filter = {
  dimensionIri: string;
  values: string[];
  key: Property;
};

export const fetchObservations = async (
  view: View,
  dimensions: DimensionsResult,
  filters: Filter[] = []
) => {
  console.log("> fetchObservations");

  const queryFilters = filters.map((f) => buildDimensionFilter(view, f.dimensionIri, f.values));

  const customView = new View({
    parent: amdpSource,
    dimensions: view.dimensions,
    filters: queryFilters.flatMap((f) => (f ? [f] : [])),
  });

  const observations = await customView.observations({});

  return parseObservations(observations, dimensions);
};

export const getDimensions = async (
  view: View,
  locale: string = defaultLocale
): Promise<(PropertyDimension | MeasureDimension | BaseDimension)[]> => {
  const dimensions = await Promise.all(
    view.dimensions.flatMap(async (d) => {
      const cubeDimension = d.cubeDimensions[0];
      const name = getName(cubeDimension, { locale });
      const datatype = cubeDimension.datatype;
      const iri = cubeDimension.path?.value;

      if (!iri) {
        console.error("Dimension without valid path", cubeDimension);
        return null;
      }
      const baseDimension = {
        name,
        iri,
        datatype,
        dimension: d,
        type: "other" as const,
      };

      const type = ns.getDimensionTypeFromIri({ iri });

      if (type === "measure") {
        const min = cubeDimension.minInclusive ? +cubeDimension.minInclusive.value : undefined;
        const max = cubeDimension.maxInclusive ? +cubeDimension.maxInclusive.value : undefined;

        return {
          ...baseDimension,
          iri,
          type,
          min,
          max,
          key: dimensionIriMap?.[iri]?.key,
        } as MeasureDimension;
      }

      if (type === "property") {
        const values = await getDimensionValuesAndLabels({
          view,
          source: amdpSource,
          dimensionKey: ns.stripNamespaceFromIri({ iri }),
          namespace: ns.amdpDimension,
          locale,
        });

        return {
          ...baseDimension,
          iri,
          type,
          values,
          key: dimensionIriMap?.[iri]?.key,
        } as PropertyDimension;
      }

      return baseDimension;
    })
  );

  const validDimensions = dimensions.flatMap((d) => (d ? [d] : []));
  return uniqBy(validDimensions, "iri");
};

export const fetchDimensions = async (iri: string, locale: string): Promise<DimensionsResult> => {
  const cube = await amdpSource.cube(iri);
  if (cube) {
    const view = View.fromCube(cube);
    const dimensions = await getDimensions(view, locale);
    return {
      property: dimensions.filter((d) => d.type === "property") as PropertyDimension[],
      measure: dimensions.filter((d) => d.type === "measure") as MeasureDimension[],
      other: dimensions.filter((d) => d.type === "other"),
    };
  }
  throw Error(`Cube not found: ${iri}`);
};

export const getDimensionValuesAndLabels = async ({
  view,
  source,
  dimensionKey,
  namespace,
  filters,
  locale = defaultLocale,
}: {
  view: View;
  source: Source;
  dimensionKey: string;
  namespace: NamespaceBuilder<string>;
  filters?: Filters;
  locale?: string;
}): Promise<{ iri: string; name: string; view: View; source: Source }[]> => {
  const lookup = LookupSource.fromSource(source);

  const queryFilters = filters
    ? Object.entries(filters).flatMap(([dim, filterValues]) =>
        filterValues ? buildDimensionFilter(view, dim, filterValues) ?? [] : []
      )
    : [];

  const lookupView = new View({ parent: source, filters: queryFilters });

  const dimension = view.dimension({
    cubeDimension: namespace(dimensionKey),
  });

  if (!dimension) {
    throw Error(`getDimensionValuesAndLabels: No dimension for '${dimensionKey}'`);
  }

  const labelDimension = lookupView.createDimension({
    source: lookup,
    path: ns.schema.name,
    join: dimension,
    as: namespace(`${dimensionKey}Label`),
  });

  lookupView.addDimension(dimension).addDimension(labelDimension);

  const observations = await lookupView.observations({});

  lookupView.clear();
  lookup.clear();

  return observations.flatMap((obs) => {
    if (!obs[namespace(dimensionKey).value]) {
      return [];
    }

    if ((obs[namespace(`${dimensionKey}Label`).value] as Literal).language !== locale) {
      return [];
    }

    return obs[namespace(dimensionKey).value]
      ? [
          {
            iri: obs[namespace(dimensionKey).value].value as string,
            name: obs[namespace(`${dimensionKey}Label`).value].value as string,
            view,
            source,
          },
        ]
      : [];
  });
};

export const getName = (node: Cube | CubeDimension, { locale }: { locale: string }) => {
  const term =
    node
      .out(ns.schema`name`)
      .terms.find((term) => term.termType === "Literal" && term.language === locale) ??
    node
      .out(ns.schema`name`)
      .terms.find((term) => term.termType === "Literal" && term.language === defaultLocale);

  return term?.value ?? "---";
};

export const parseObservations = (observations: $FixMe, dimensions: DimensionsResult) => {
  return observations.map((observation: any, index: number) => {
    const parsedObservation: any = {};

    Object.keys(observation).forEach((key) => {
      const type = ns.getDimensionTypeFromIri({ iri: key });
      if (type === "measure") {
        const dimension = dimensions.measure.find((d: any) => key === d.iri);
        if (dimension) {
          const dimensionKey = dimensionIriMap?.[dimension.iri]?.key ?? key;
          parsedObservation[dimensionKey] = observation[key].value;
        } else {
          console.error(`Parsing Error: ${key} dimension not found`);
          parsedObservation[key] = observation[key];
        }
      }

      if (type === "property") {
        const dimension = dimensions.property.find((d: any) => key === d.iri);
        if (dimension) {
          const dimensionKey = dimensionIriMap?.[dimension.iri]?.key ?? key;
          const value = dimension.values.find((v: any) => v.iri === observation[key].value);
          if (value) {
            parsedObservation[dimensionKey] = value.name;
          } else {
            console.error(
              `Parsing Error: Unknown value ${observation[key].value} for dimension ${key}.`
            );
            parsedObservation[dimensionKey] = observation[key].value;
          }
        } else {
          console.error(`Parsing Error: ${key} dimension not found`);
          parsedObservation[key] = observation[key];
        }
      }

      if (type === "other") {
        const dimension = dimensions.other.find((d: any) => key === d.iri);
        if (dimension) {
          parsedObservation[key] = observation[key].value;
        } else {
          console.error(`Parsing Error: ${key} dimension not found`);
          parsedObservation[key] = observation[key];
        }
      }
    });

    parsedObservation["id"] = index;
    return parsedObservation;
  });
};

/* Not currently being used */

export const getSparqlEditorUrl = (query: string): string | null => {
  return process.env.SPARQL_EDITOR
    ? `${process.env.SPARQL_EDITOR}#query=${encodeURIComponent(query)}`
    : query;
};

export type ObservationValue = string | number | boolean;

/**
 * Parse observation values (values returned from query.execute()) to native JS types
 *
 * @param observationValue
 */
export const parseObservationValue = (value: Literal | NamedNode): ObservationValue => {
  // Parse literals to native JS types
  if (value.termType === "Literal") {
    return parseRDFLiteral(value);
  }

  // Return the IRI of named nodes
  return value.value;
};

const xmlSchema = "http://www.w3.org/2001/XMLSchema#";
const parseRDFLiteral = (value: Literal): ObservationValue => {
  const v = value.value;
  const dt = value.datatype.value.replace(xmlSchema, "");
  switch (dt) {
    case "string":
      return v;
    case "boolean":
      return v === "true" ? true : false;
    case "float":
    case "integer":
    case "long":
    case "double":
    case "decimal":
    case "nonPositiveInteger":
    case "nonNegativeInteger":
    case "negativeInteger":
    case "int":
    case "unsignedLong":
    case "positiveInteger":
    case "short":
    case "unsignedInt":
    case "byte":
    case "unsignedShort":
    case "unsignedByte":
      return +v;
    // TODO: Figure out how to preserve granularity of date (maybe include interval?)
    // case "date":
    // case "time":
    // case "dateTime":
    // case "gYear":
    // case "gYearMonth":
    //   return new Date(v);
    default:
      return v;
  }
};

export const getObservations = async (
  { view, source }: { view: View; source: Source },
  {
    filters,
    dimensions,
  }: {
    filters?: Filters;
    dimensions?: string[];
  }
) => {
  const queryFilters = filters
    ? Object.entries(filters).flatMap(([dimensionKey, filterValues]) =>
        filterValues ? buildDimensionFilter(view, dimensionKey, filterValues) ?? [] : []
      )
    : [];

  const lookupSource = LookupSource.fromSource(source);

  const filterViewDimensions = dimensions
    ? dimensions.flatMap((d) => {
        const dimension = view.dimension({
          cubeDimension: ns.amdpDimension(d),
        });
        return dimension ? [dimension] : [];
      })
    : view.dimensions;

  const filterView = new View({
    dimensions: filterViewDimensions,
    filters: queryFilters,
  });

  console.log("> getObservations");

  console.log({
    query: getSparqlEditorUrl(filterView.observationsQuery({}).query.toString()),
  });

  const observations = await filterView.observations({});

  // Clean up
  filterView.clear();
  lookupSource.clear();

  // Workaround for faulty empty query result
  if (observations.length === 1 && Object.values(observations[0]).some((v) => v === undefined)) {
    return [];
  }

  return observations;
};

export const getView = (cube: Cube): View => View.fromCube(cube);

export const buildDimensionFilter = (view: View, dimensionIri: string, filters: string[]) => {
  const viewDimension = view.dimension({
    cubeDimension: dimensionIri,
  });

  const cubeDimension = viewDimension?.cubeDimensions[0];

  if (!(viewDimension && cubeDimension)) {
    console.warn(`buildDimensionFilter: No dimension for '${dimensionIri}'`);
    return;
  }

  const { datatype } = cubeDimension;

  const dimensionFilter = viewDimension.filter.in(
    filters.map((f) => {
      return datatype ? rdf.literal(f, datatype) : rdf.namedNode(f);
    })
  );

  return dimensionFilter;
};
