/**
 * This file is meant to contain meta information on our Dato instance.
 * It serves as a way to audit throught the dato:audit script
 * but also to express types that can be used down the line, for example
 * to make sure that we handle all possible internal links in StructuredText.
 */

import type * as GQL from "@/graphql";

export const internalLinks = [
  "AnalysisPageRecord",
  "BlogPostRecord",
  "DataPageRecord",
  "FocusArticleRecord",
  "InfoPageRecord",
  "HomePageRecord",
  "LegalPageRecord",
  "MarketArticleRecord",
  "MethodsPageRecord",
  "PowerBiPageRecord",
  "TermsPageRecord",
] as const;

// Should stay in sync with internal link variable above ^
// Unfortunately, I was not able to link them through indexing
// like so GQL[(typeof internalLinks)[number]]
export type InternalLink =
  | GQL.AnalysisPageRecord
  | GQL.BlogPostRecord
  | GQL.DataPageRecord
  | GQL.FocusArticleRecord
  | GQL.InfoPageRecord
  | GQL.HomePageRecord
  | GQL.PowerBiPageRecord
  | GQL.HomePageRecord
  | GQL.LegalPageRecord
  | GQL.MarketArticleRecord
  | GQL.MethodsPageRecord
  | GQL.TermsPageRecord;

/**
 * For those pages, we check that their lead & content is configured in Dato to
 * link to any internal link. This is done through the dato:audit script.
 */
export const pages = [
  "AnalysisPageRecord",
  "BlogPostRecord",
  "DataPageRecord",
  "FocusArticleRecord",
  "InfoPageRecord",
  "PowerBiPageRecord",
  "HomePageRecord",
  "LegalPageRecord",
  "MarketArticleRecord",
  "MethodsPageRecord",
];

export type InlineRecord =
  | GQL.PowerBiReportRecord
  | GQL.FileDownloadSectionRecord
  | GQL.HighlightSectionRecord;
