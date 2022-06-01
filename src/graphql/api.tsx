import "isomorphic-unfetch";
import React from "react";
import { Provider, createClient, defaultExchanges } from "urql";

import {
  DATOCMS_API_TOKEN,
  DATOCMS_API_URL,
  IS_DEV_ENVIRONMENT,
} from "@/domain/env";

export const client = createClient({
  url: DATOCMS_API_URL,
  fetchOptions: {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DATOCMS_API_TOKEN}`,
    },
  },
  exchanges: IS_DEV_ENVIRONMENT
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
