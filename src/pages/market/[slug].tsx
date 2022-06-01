import { Trans } from "@lingui/macro";
import { Stack, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

import { BlogPostsGrid } from "@/components/blog/BlogPost";
import { ContentContainer } from "@/components/content-container";
import { Hero } from "@/components/hero";
import { AppLayout } from "@/components/layout";
import { BlogPost, Market } from "@/domain/types";
import * as GQL from "@/graphql";
import { fetchCMS } from "@/lib/cms-api";

export default function MarketPage({
  market,
  allMarkets,
  allBlogPosts,
}: {
  market?: Market & {
    _allSlugLocales: { locale: string; value: string }[];
  };
  allMarkets: Market[];
  allBlogPosts: BlogPost[];
}) {
  const alternates = market
    ? market._allSlugLocales.map((loc) => {
        return {
          href: "/market/[slug]",
          as: `/market/${loc.value}`,
          locale: loc.locale,
        };
      })
    : undefined;

  return (
    <AppLayout alternates={alternates} allMarkets={allMarkets}>
      {market ? (
        <>
          <ContentContainer sx={{ mt: 7 }}>
            <Hero variant="market" title={market.title} lead={market.lead} />
            <Stack flexDirection="column" spacing={6}>
              <Typography variant="h5">
                <Trans id="homepage.section.latestBlogPosts">
                  Latest Blog Posts
                </Trans>
              </Typography>
              <BlogPostsGrid blogPosts={allBlogPosts} />
            </Stack>
          </ContentContainer>
        </>
      ) : (
        <div>NOT FOUND</div>
      )}
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context: $FixMe) => {
  const result = await fetchCMS<GQL.MarketPageQuery>(GQL.MarketPageDocument, {
    variables: { locale: context.locale, slug: context.params.slug },
    preview: context.preview,
  });

  return {
    props: {
      market: result.market,
      allMarkets: result.allMarkets,
      allBlogPosts: result.allBlogPosts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await fetchCMS<GQL.AllMarketsSlugLocalesQuery>(
    GQL.AllMarketsSlugLocalesDocument
  );
  const paths = result.allMarkets.flatMap((page: $FixMe) => {
    return page._allSlugLocales.map((loc: $FixMe) => ({
      locale: loc.locale,
      params: { slug: loc.value },
    }));
  });

  return {
    fallback: false,
    paths,
  };
};
