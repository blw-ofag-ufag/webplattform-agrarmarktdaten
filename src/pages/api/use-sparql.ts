import { useEffect, useState } from "react";
import { Cube, Source } from "rdf-cube-view-query";
import rdf from "rdf-ext";
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

const source = new Source({
  endpointUrl: "http://test.lindas.admin.ch/query",
  sourceGraph: "https://lindas.admin.ch/foag/agricultural-market-data",
});

export const useCube = () => {
  const [cubes, setCubes] = useState<Cube[]>();

  useEffect(() => {
    const run = async () => {
      try {
        const cubes = await source.cubes();
        console.log(cubes.map((cube) => cube.dimensions.map((d) => d.minExclusive)));
        setCubes(cubes);
      } catch (e) {
        console.error(e);
      }
    };
    run();
  }, []);
  return { cubes };
};
