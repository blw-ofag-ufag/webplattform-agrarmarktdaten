import React from "react";

import { BlogMarketFilters } from "@/components/blog/BlogMarketFilters";
import { BlogPostsGrid } from "@/components/blog/BlogPost";
import { ContentContainer } from "@/components/content-container";
import { Hero } from "@/components/hero";
import { AppLayout } from "@/components/layout";
import { BlogPost, Market } from "@/domain/types";
import * as GQL from "@/graphql";
import { client } from "@/graphql";

type Props = {
  blogPage: {
    title: string;
    lead: string;
  };
  allMarkets: Market[];
  allBlogPosts: BlogPost[];
};

export default function Blog(props: Props) {
  const { blogPage, allMarkets, allBlogPosts } = props;

  return (
    <AppLayout>
      <Hero title={blogPage.title} lead={blogPage.lead} />
      <ContentContainer>
        <BlogMarketFilters allMarkets={allMarkets} />
        <BlogPostsGrid blogPosts={allBlogPosts} />
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
