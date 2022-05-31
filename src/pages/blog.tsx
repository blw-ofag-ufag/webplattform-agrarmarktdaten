import React from "react";

import { BlogMarketFilters } from "@/components/blog/BlogMarketFilters";
import { BlogPostsGrid } from "@/components/blog/BlogPost";
import { ContentContainer } from "@/components/content-container";
import { Hero } from "@/components/hero";
import { AppLayout } from "@/components/layout";
import { BlogPost, Market } from "@/domain/types";
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
  const query = `
    query BlogPageQuery($locale: SiteLocale!) {
      blogPage(locale: $locale) {
        title
        lead
      }

      allMarkets(locale: $locale) {
        title
        tile {
          url
        }
        slug
      }

      allBlogPosts(locale: $locale) {
        title
        lead
        slug
        image {
          url
        }
        markets {
          title
        }
        themes {
          title
        }
        _firstPublishedAt
      }
    }
  `;

  const result = await fetchCMS(query, {
    variables: { locale: context.locale },
    preview: context.preview,
  });

  return { props: result };
};
