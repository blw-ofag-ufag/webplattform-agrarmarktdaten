import { Trans } from "@lingui/macro";
import { Stack, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

import { BlogPostsGrid } from "@/components/blog/BlogPost";
import { ContentContainer } from "@/components/content-container";
import { Hero } from "@/components/hero";
import { AppLayout } from "@/components/layout";
import { Market } from "@/domain/types";
import * as GQL from "@/graphql";
import { client } from "@/graphql";

export default function MarketPage({
  market,
  allMarkets,
  allBlogPosts,
}: {
  market?: Market & {
    _allSlugLocales: { locale: string; value: string }[];
  };
  allMarkets: GQL.MarketRecord[];
  allBlogPosts: GQL.BlogPostRecord[];
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
                  Neuste Blogbeiträge
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
      market: result.data.market,
      allMarkets: result.data.allMarkets,
      allBlogPosts: result.data.allBlogPosts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await client
    .query<GQL.AllMarketsSlugLocalesQuery>(GQL.AllMarketsSlugLocalesDocument)
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  const paths = result.data.allMarkets.flatMap((page: $FixMe) => {
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
