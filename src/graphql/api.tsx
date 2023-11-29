import "isomorphic-unfetch";
import { cacheExchange } from "@urql/exchange-graphcache";
import React from "react";
import { Provider, createClient, fetchExchange } from "urql";

import {
  DATOCMS_API_TOKEN,
  DATOCMS_API_URL,
  IS_DEV_ENVIRONMENT,
  DATO_CMS_INCLUDE_DRAFTS,
} from "@/domain/env";

const defaultExchanges = [
  cacheExchange({
    schema: require("./schema.json"),
    keys: {
      VideoField: (parent) => String(parent.url),

      // For fields without id or _id, we must disable the cache
      StringMultiLocaleField: () => null,
      AnalysisPageModelLeadField: () => null,
      AnalysisPageModelLeadFieldMultiLocaleField: () => null,
      BlogPostModelLeadField: () => null,
      BlogPostModelLeadFieldMultiLocaleField: () => null,
      FocusArticleModelLeadField: () => null,
      FocusArticleModelLeadFieldMultiLocaleField: () => null,
      HomePageModelLeadField: () => null,
      HomePageModelLeadFieldMultiLocaleField: () => null,
      InfoPageModelLeadField: () => null,
      InfoPageModelLeadFieldMultiLocaleField: () => null,
      LegalPageModelLeadField: () => null,
      LegalPageModelLeadFieldMultiLocaleField: () => null,
      MarketArticleModelLeadField: () => null,
      MarketArticleModelLeadFieldMultiLocaleField: () => null,
      MethodsPageModelLeadField: () => null,
      MethodsPageModelLeadFieldMultiLocaleField: () => null,
      TermsPageModelLeadField: () => null,
      TermsPageModelLeadFieldMultiLocaleField: () => null,
      ResponsiveImage: () => null,
    },
    resolvers: {
      BlogPostRecord: {
        _firstPublishedAt: (parent) =>
          new Date(parent._firstPublishedAt as string).toLocaleDateString(),
      },
    },
  }),
  fetchExchange,
];

export const client = createClient({
  url: DATOCMS_API_URL,
  fetchOptions: {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DATOCMS_API_TOKEN}`,
      ...(DATO_CMS_INCLUDE_DRAFTS === "true" && { "X-Include-Drafts": "true" }),
    },
  },
  exchanges: IS_DEV_ENVIRONMENT
    ? [require("@urql/devtools").devtoolsExchange, ...defaultExchanges]
    : defaultExchanges,
});

export const GraphqlProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider value={client}>{children}</Provider>;
};
