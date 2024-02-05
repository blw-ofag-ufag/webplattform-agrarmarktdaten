import { Literal, Quad, Stream } from "@rdfjs/types";
import ParsingClient from "sparql-http-client";

const parseRdf = (obj: Record<string, Literal | NamedNode>) => {
  const res = {} as Record<string, string>;
  for (let k in obj) {
    const raw = obj[k];

    // @ts-ignore
    res[k] = raw?.value !== undefined ? raw.value : raw;
  }
  return res;
};

type NamedNode = string;

const streamAsPromise = (s: Stream) => {
  const res: Record<string, Literal | NamedNode>[] = [];
  return new Promise<typeof res>((resolve, reject) => {
    s.on("data", (row) => {
      res.push(row);
    });
    s.on("end", () => {
      resolve(res);
    });
    s.on("error", (err) => {
      reject(err);
    });
  });
};

const select = async (query: string, client: ParsingClient<Quad>) => {
  const stream = await client.query.select(query, {
    operation: "postUrlencoded",
  });
  const res = await streamAsPromise(stream);
  return res;
};

export const fetch = async (endpointUrl: string, query: string) => {
  const client = new ParsingClient({
    endpointUrl,
  });
  return (await select(query, client)).map((row) => parseRdf(row));
};
