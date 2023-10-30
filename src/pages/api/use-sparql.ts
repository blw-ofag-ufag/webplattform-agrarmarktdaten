import { defaultLocale } from "@/locales/locales";
import { Literal, NamedNode } from "@rdfjs/types";
import { Cube, CubeDimension, LookupSource, Source, View } from "rdf-cube-view-query";
import rdf from "rdf-ext";
import { useEffect, useState } from "react";
import { QueryClient } from "react-query";
import * as ns from "../../lib/namespace";

export type UseQueryOptions<T> = {
  enabled: boolean;
  onSuccess?: (data: T) => void;
  onError?: (err: unknown) => void;
  key: string;
  fetch: (key: string) => Promise<T>;
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

const fetchSparql = async (query: string) => {
  const body = JSON.stringify({ query });
  const res = await fetch("/api/sparql", {
    method: "post",
    body,
  }).then((resp) => resp.json());
  return res;
};

/**
 * Same API as possible as react-query
 * @TODO let's see if we keep this or we use react-query or urql
 */
const useQuery = <T extends unknown>({
  key,
  fetch,
  onSuccess,
  onError,
  enabled,
}: UseQueryOptions<T>): UseQueryResult<T> => {
  const [data, setData] = useState<T>();
  const [fetching, setFetching] = useState(true);
  const [executionTime, setExecutionTime] = useState<number>();
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    if (enabled === false) {
      return;
    }
    setFetching(true);
    const run = async () => {
      const start = Date.now();
      try {
        const res = await fetch(key);
        setData(res);
        setFetching(false);
        setError(undefined);
        setExecutionTime(Date.now() - start);
        onSuccess?.(res);
      } catch (e) {
        setError(e);
        onError?.(e);
      }
    };
    run();
    // Important not to have onSuccess / onError here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, fetch, key]);
  return { data, fetching, executionTime, error };
};

const useSparql = <T extends unknown>({
  query,
  ...options
}: { query?: string } & Omit<UseQueryOptions<T>, "key" | "fetch">): SparqlQueryResult<T> => {
  const res = useQuery<T>({
    key: query || "",
    fetch: fetchSparql,
    ...options,
    enabled: !!(query && options.enabled),
  });
  return { ...res, sparqlQuery: query };
};

export default useSparql;

export const lindasClient = new QueryClient();

const source = new Source({
  endpointUrl: "http://test.lindas.admin.ch/query",
  sourceGraph: "https://lindas.admin.ch/foag/agricultural-market-data",
});

export type CubeResult = {
  cube: Cube;
  iri?: string;
  //label: string;
  view?: View;
  versionHistory?: string;
};

export const fetchPossibleCubes = async () => {
  const cubes = await source.cubes();
  const results = cubes.map((cube) => {
    return {
      cube,
      iri: cube.term?.value,
      // label: cube.out(ns.schema.name, { language: ["en", "de", "*"] }),
      view: View.fromCube(cube),
      versionHistory: cube.out(ns.schema.hasPart).value,
    };
  });
  return results;
};

export const fetchObservations = async (view?: View) => {
  if (view) {
    const observations = await view.observations({});
    return observations;
  }
  return [];
};

export const fetchCube = async (iri: string) => {
  const cube = await source.cube(iri);
  console.log({ cube });
  if (cube) {
    return {
      cube,
      iri: cube.term?.value,
      label: cube.out(ns.schema.name, { language: ["en", "de", "*"] }),
      view: View.fromCube(cube),
    };
  }
  throw Error(`Cube not found: ${iri}`);
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

export const parseObservation = (d: Record<string, Literal | NamedNode<string>>) => {
  const parsed: { [k: string]: string | number | boolean } = {};
  const amdpDimensionPrefix = ns.amdpDimension().value;
  for (const [k, v] of Object.entries(d)) {
    const key = k.replace(amdpDimensionPrefix, "");

    const parsedValue = parseObservationValue(v);

    parsed[key] =
      typeof parsedValue === "string"
        ? ns.stripNamespaceFromIri({ iri: parsedValue })
        : parsedValue;
  }
  return parsed;
};

export const getSparqlEditorUrl = (query: string): string | null => {
  return process.env.SPARQL_EDITOR
    ? `${process.env.SPARQL_EDITOR}#query=${encodeURIComponent(query)}`
    : query;
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

  const res = observations.map(parseObservation);

  return res;
};

export const getCubeDimension = (
  view: View,
  dimensionKey: string,
  { locale }: { locale: string }
) => {
  const viewDimension = view.dimension({
    cubeDimension: ns.amdpDimension(dimensionKey),
  });

  const cubeDimension = viewDimension?.cubeDimensions[0];

  if (!cubeDimension) {
    throw Error(`getCubeDimension: No dimension for '${dimensionKey}'`);
  }

  const iri = cubeDimension.path?.value;
  const min = cubeDimension.minInclusive?.value;
  const max = cubeDimension.maxInclusive?.value;
  const name = getName(cubeDimension, { locale });

  return {
    iri,
    name,
    min,
    max,
    datatype: cubeDimension.datatype,
    dimension: viewDimension,
  };
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

type Filters = { [key: string]: string[] | null | undefined } | null;

export const getView = (cube: Cube): View => View.fromCube(cube);

export const getDimensionValuesAndLabels = async ({
  cube,
  dimensionKey,
  filters,
}: {
  cube: Cube;
  dimensionKey: string;
  filters?: Filters;
}): Promise<{ id: string; name: string; view: View; source: Source }[]> => {
  const view = getView(cube);
  const source = cube.source;
  const lookup = LookupSource.fromSource(source);

  const queryFilters = filters
    ? Object.entries(filters).flatMap(([dim, filterValues]) =>
        filterValues ? buildDimensionFilter(view, dim, filterValues) ?? [] : []
      )
    : [];

  const lookupView = new View({ parent: source, filters: queryFilters });

  const dimension = view.dimension({
    cubeDimension: ns.amdpDimension(dimensionKey),
  });

  if (!dimension) {
    throw Error(`getDimensionValuesAndLabels: No dimension for '${dimensionKey}'`);
  }

  const labelDimension = lookupView.createDimension({
    source: lookup,
    path: ns.schema.name,
    join: dimension,
    as: ns.amdpDimension(`${dimensionKey}Label`),
  });
  lookupView.addDimension(dimension).addDimension(labelDimension);

  const observations = await lookupView.observations({});

  lookupView.clear();
  lookup.clear();

  return observations.flatMap((obs) => {
    // Filter out "empty" observations
    return obs[ns.amdpDimension(dimensionKey).value]
      ? [
          {
            id: ns.stripNamespaceFromIri({
              iri: obs[ns.amdpDimension(dimensionKey).value].value as string,
            }),
            name: obs[ns.amdpDimension(`${dimensionKey}Label`).value].value as string,
            view,
            source,
          },
        ]
      : [];
  });
};

export const buildDimensionFilter = (view: View, dimensionKey: string, filters: string[]) => {
  const viewDimension = view.dimension({
    cubeDimension: ns.amdpDimension(dimensionKey),
  });

  const cubeDimension = viewDimension?.cubeDimensions[0];

  if (!(viewDimension && cubeDimension)) {
    console.warn(`buildDimensionFilter: No dimension for '${dimensionKey}'`);
    return;
  }

  const { datatype } = cubeDimension;

  const dimensionFilter =
    filters.length === 1
      ? viewDimension.filter.eq(
          datatype
            ? rdf.literal(filters[0], datatype)
            : rdf.namedNode(ns.addNamespaceToID({ id: filters[0], dimension: dimensionKey }))
        )
      : viewDimension.filter.in(
          filters.map((f) => {
            return datatype
              ? rdf.literal(f, datatype)
              : rdf.namedNode(ns.addNamespaceToID({ id: f, dimension: dimensionKey }));
          })
        );

  return dimensionFilter;
};
