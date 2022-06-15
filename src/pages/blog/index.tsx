import React from "react";

import { BlogMarketFilters } from "@/components/blog/BlogMarketFilters";
import { BlogPostsGrid } from "@/components/blog/BlogPost";
import { ContentContainer } from "@/components/content-container";
import { Hero } from "@/components/hero";
import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql";

export default function Blog({blogPage, allMarkets, allBlogPosts}: GQL.BlogPageQuery) {

  return (
    <AppLayout>
      <Hero title={blogPage?.title as string} lead={blogPage?.lead as string} />
      <ContentContainer>
        <BlogMarketFilters allMarkets={allMarkets as GQL.MarketRecord[]} />
        <BlogPostsGrid blogPosts={allBlogPosts as GQL.BlogPostRecord[]} />
      </ContentContainer>
    </AppLayout>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.BlogPageQuery>(GQL.BlogPageDocument, { locale: context.locale })
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: result.data };
};
