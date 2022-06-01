import { DocumentNode } from "graphql";
import "isomorphic-unfetch";
import { print } from "graphql";

const API_URL = "https://graphql.datocms.com";
const API_TOKEN = process.env.DATOCMS_API_TOKEN;
const DEV = process.env.NODE_ENV === "development";

type Options = {
  variables?: { [k: string]: any };
  preview?: boolean;
};

export async function fetchCMS<T>(
  document: DocumentNode,
  options: Options = {}
): Promise<T> {
  const { variables, preview } = options;
  const query = print(document);
  const result = await fetch(`${API_URL}${preview || DEV ? "/preview" : ""}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await result.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}
