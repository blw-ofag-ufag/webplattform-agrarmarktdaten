import { Trans } from "@lingui/macro";
import { Stack, Typography } from "@mui/material";
import { Hero } from "@/components/hero";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { AppLayout } from "@/components/layout";

import { BlogPostsGrid } from "@/components/blog/BlogPost";
import { ContentContainer } from "@/components/content-container";
import * as GQL from "@/graphql";
import { client } from "@/graphql";

export default function MarketPage(props: GQL.MarketPageQuery) {
  const { marketArticle, allMarketArticles, allFocusArticles, topBlogPosts } =
    props;

  const alternates = marketArticle?._allSlugLocales?.map((loc) => {
    return {
      href: "/market/[slug]",
      as: `/market/${loc.value}`,
      locale: loc.locale as string,
    };
  });

  if (!marketArticle?.title || !marketArticle?.lead) {
    return null;
  }

  return (
    <AppLayout alternates={alternates} allMarkets={allMarketArticles}>
      <ContentContainer sx={{ mt: 7 }}>
        <Hero title={marketArticle.title} lead={marketArticle.lead} />
        <Stack flexDirection="column" spacing={6}>
          <Typography variant="h5">
            <Trans id="homepage.section.latestBlogPosts">
              Neuste Blogbeiträge
            </Trans>
          </Typography>
          <BlogPostsGrid blogPosts={topBlogPosts} />
        </Stack>
      </ContentContainer>
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.MarketPageQuery>(GQL.MarketPageDocument, {
      locale: context.locale,
      slug: context.params.slug,
    })
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return {
    props: {
      marketArticle: result.data.marketArticle,
      allMarketArticles: result.data.allMarketArticles,
      allFocusArticles: result.data.allFocusArticles,
      topBlogPosts: result.data.topBlogPosts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await client
    .query<GQL.AllMarketArticlesSlugLocalesQuery>(
      GQL.AllMarketArticlesSlugLocalesDocument,
      {}
    )
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  const paths = result.data.allMarketArticles.flatMap((page) => {
    return page._allSlugLocales
      ? page._allSlugLocales?.map((loc) => ({
          locale: loc.locale ?? undefined,
          params: { slug: loc.value ?? undefined },
        }))
      : [];
  });

  return {
    fallback: false,
    paths,
  };
};
