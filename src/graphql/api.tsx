import "isomorphic-unfetch";
import React from "react";
import { Provider, createClient, defaultExchanges } from "urql";

const API_URL = "https://graphql.datocms.com";
const API_TOKEN = process.env.DATOCMS_API_TOKEN;

export const client = createClient({
  url: API_URL,
  fetchOptions: {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  },
  exchanges:
    process.env.NODE_ENV === "development"
      ? [require("@urql/devtools").devtoolsExchange, ...defaultExchanges]
      : defaultExchanges,
});

export const GraphqlProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Provider value={client}>{children}</Provider>;
};
