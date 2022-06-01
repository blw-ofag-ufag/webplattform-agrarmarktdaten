import { DocumentNode } from "graphql";
import "isomorphic-unfetch";
import { print } from "graphql";

const API_URL = "https://graphql.datocms.com";
const API_TOKEN = process.env.DATOCMS_API_TOKEN;
const DEV = process.env.NODE_ENV === "development";

export async function fetchCMS<T>(
  document: DocumentNode,
  {
    variables,
    preview,
  }: { variables?: { [k: string]: $FixMe }; preview?: boolean } = {}
): Promise<T> {
  const res = await fetch(API_URL + (preview || DEV ? "/preview" : ""), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query: print(document),
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}
