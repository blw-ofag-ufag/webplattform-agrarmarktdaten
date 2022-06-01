import React from "react";

import { BlogMarketFilters } from "@/components/blog/BlogMarketFilters";
import { BlogPostsGrid } from "@/components/blog/BlogPost";
import { ContentContainer } from "@/components/content-container";
import { Hero } from "@/components/hero";
import { AppLayout } from "@/components/layout";
import { BlogPost, Market } from "@/domain/types";
import * as GQL from "@/graphql";
import { fetchCMS } from "@/lib/cms-api";

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
      <Hero {...blogPage} />
      <ContentContainer>
        <BlogMarketFilters allMarkets={allMarkets} />
        <BlogPostsGrid blogPosts={allBlogPosts} />
      </ContentContainer>
    </AppLayout>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await fetchCMS<GQL.BlogPageQuery>(GQL.BlogPageDocument, {
    variables: { locale: context.locale },
    preview: context.preview,
  });

  return { props: result };
};
