import { Stream } from "stream";

import { Literal } from "@rdfjs/types";
import { NextApiRequest, NextApiResponse } from "next";
import jsonpack from "jsonpack";

// @ts-ignore
import ParsingClient from "sparql-http-client";

export const sparqlEndpoint = "https://int.lindas.admin.ch";

const client = new ParsingClient({
  endpointUrl: `${sparqlEndpoint}/query`,
});

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

const select = async (query: string) => {
  const stream = await client.query.select(query, {
    operation: "postUrlencoded",
  });
  const res = await streamAsPromise(stream);
  return res;
};

const serve = async (req: NextApiRequest, res: NextApiResponse) => {
  const options = req.body ? JSON.parse(req.body) : {};
  res.setHeader("Content-type", "application/json");
  const body = JSON.stringify((await select(options.query)).map((row) => parseRdf(row)));
  res.end(jsonpack.pack(body));
};

export default serve;
