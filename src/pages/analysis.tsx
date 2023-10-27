import React from "react";
import { Hero } from "@/components/hero";
import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql";
import { c } from "@interactivethings/swiss-federal-ci";
import { BlogpostGrid } from "@/components/BlogpostGrid";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

export default function Analysis({
  analysisPage,
  allBlogPosts,
  allFocusArticles,
  allMarketArticles,
  _allBlogPostsMeta,
}: GQL.AnalysisPageQuery) {
  if (!analysisPage?.title || !analysisPage?.lead) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout allMarkets={allMarketArticles} allFocusArticles={allFocusArticles}>
        <Hero
          title={analysisPage?.title}
          lead={analysisPage?.lead}
          bgColor={c.cobalt[100]}
          shiftedRight
        />
        <BlogpostGrid
          blogposts={allBlogPosts}
          markets={allMarketArticles}
          focusArticles={allFocusArticles}
          totalBlogpostCount={_allBlogPostsMeta.count}
        />
      </AppLayout>
    </QueryClientProvider>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.AnalysisPageQuery>(
      GQL.AnalysisPageDocument,
      {
        locale: context.locale,
      },
      { requestPolicy: "network-only" }
    )
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: result.data, revalidate: 10 };
};
