import "isomorphic-unfetch";
import React from "react";
import { Provider, createClient } from "urql";

const client = createClient({
  // url: "https://dev.visualize.admin.ch/api/graphql"
  url: "https://gentle-escarpment-19386.herokuapp.com/api/graphql"
  // url: "http://localhost:4000/api/graphql"
});

export const GraphqlProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return <Provider value={client}>{children}</Provider>;
};
