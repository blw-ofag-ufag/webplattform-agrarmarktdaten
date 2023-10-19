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
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout allMarkets={allMarketArticles} allFocusArticles={allFocusArticles}>
        <Hero
          title={analysisPage?.title as string}
          lead={analysisPage?.lead as string}
          bgColor={c.cobalt[100]}
        />
        <BlogpostGrid blogposts={allBlogPosts} totalBlogpostCount={_allBlogPostsMeta.count} />
      </AppLayout>
    </QueryClientProvider>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.AnalysisPageQuery>(GQL.AnalysisPageDocument, {
      locale: context.locale,
    })
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: result.data, revalidate: 10 };
};
