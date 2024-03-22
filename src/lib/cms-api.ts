import { DocumentNode } from "graphql";
import "isomorphic-unfetch";
import { print } from "graphql";

import { DATOCMS_API_TOKEN, DATOCMS_API_URL, IS_DEV_ENVIRONMENT } from "@/domain/env";

type Options = {
  variables?: { [k: string]: any };
  preview?: boolean;
};

export async function fetchCMS<T>(document: DocumentNode, options: Options = {}): Promise<T> {
  const { variables, preview } = options;
  const query = print(document);
  const result = await fetch(
    `${DATOCMS_API_URL}${preview || IS_DEV_ENVIRONMENT ? "/preview" : ""}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DATOCMS_API_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );

  const json = await result.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}
