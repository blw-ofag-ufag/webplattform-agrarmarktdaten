import "isomorphic-unfetch";
import React from "react";
import { Provider, createClient } from "urql";

const client = createClient({
  url: "https://test.visualize.admin.ch/api/graphql",
});

export const GraphqlProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Provider value={client}>{children}</Provider>;
};
