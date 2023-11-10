import { queryCubes } from "@/lib/cube-queries";
import { amdp, amdpProperty } from "@/lib/namespace";
import { z } from "zod";

const removeNamespace = (fullIri: string) => {
  return fullIri.replace(amdp().value, "");
};

const addNamespace = (partialIri: string) => {
  return amdp(partialIri).value;
};

export const fetchSparql = async (query: string) => {
  console.log("> fetchSparql");
  const body = JSON.stringify({ query });
  const res = await fetch("/api/sparql", {
    method: "post",
    body,
  }).then((resp) => resp.json());
  return res;
};

export type TimeView = "Year" | "Month";

const cubeSpecSchema = z
  .object({
    cube: z
      .string()
      .startsWith(amdp("cube").value, { message: "Must be a valid AMDP cube" })
      .transform(removeNamespace),
    valueChain: z
      .string()
      .startsWith(amdpProperty("value-chain").value, {
        message: "Must be a valid AMDP value chain",
      })
      .transform(removeNamespace),
    market: z
      .string()
      .startsWith(amdpProperty("market").value, { message: "Must be a valid AMDP market" })
      .transform(removeNamespace),
  })
  .transform((cubeSpec) => ({
    ...cubeSpec,
    timeView: cubeSpec.cube.match(/_(Year|Month)$/)?.[1] as TimeView,
  }));

export type CubeSpec = z.infer<typeof cubeSpecSchema>;

export const fetchCubes = async () => {
  const query = queryCubes();
  const cubesRaw = await fetchSparql(query);
  const cubes = z.array(cubeSpecSchema).parse(cubesRaw);
  return cubes;
};
