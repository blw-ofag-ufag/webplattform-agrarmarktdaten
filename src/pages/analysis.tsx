import React from "react";
import { BlogMarketFilters } from "@/components/blog/BlogMarketFilters";
import { BlogPostsGrid } from "@/components/blog/BlogPost";
import { ContentContainer } from "@/components/content-container";
import { Hero } from "@/components/hero";
import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql";

export default function Analysis({
  analysisPage,
  allBlogPosts,
  allFocusArticles,
  allMarketArticles,
}: GQL.AnalysisPageQuery) {
  return (
    <AppLayout>
      <Hero
        title={analysisPage?.title as string}
        lead={analysisPage?.lead as string}
      />
      <ContentContainer>
        <BlogMarketFilters allMarkets={allMarketArticles} />
        <BlogPostsGrid blogPosts={allBlogPosts} />
      </ContentContainer>
    </AppLayout>
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

  return { props: result.data };
};
