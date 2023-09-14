import { Trans } from "@lingui/macro";
import { Button, Stack, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { AppLayout } from "@/components/layout";
import { Hero } from "@/components/hero";
import * as GQL from "@/graphql";
import { client } from "@/graphql";
import { ContentContainer } from "@/components/content-container";
import { BlogPostsGrid } from "@/components/blog/BlogPost";
import NextLink from "next/link";

export default function MarketPage(props: GQL.FocusArticlePageQuery) {
  const { focusArticle, allMarketArticles, allFocusArticles, topBlogPosts } =
    props;
  if (!focusArticle?.title || !focusArticle?.lead) {
    return null;
  }
  return (
    <AppLayout allMarkets={allMarketArticles}>
      <Hero title={focusArticle.title} lead={focusArticle.lead} />
      <ContentContainer>
        <Stack flexDirection="column" spacing={6}>
          <Typography variant="h5">
            <Trans id="homepage.section.latestBlogPosts">
              Neuste Blogbeiträge
            </Trans>
          </Typography>
          <BlogPostsGrid blogPosts={topBlogPosts} />
          <NextLink href="/blog" legacyBehavior>
            <Button
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "184px",
                height: "48px",
                backgroundColor: "grey.300",
                color: "black",

                "&:hover": {
                  backgroundColor: "grey.500",
                },
              }}
            >
              <Trans id="button.show.all">Alle Anzeigen</Trans>
            </Button>
          </NextLink>
        </Stack>
      </ContentContainer>
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.FocusArticlePageQuery>(GQL.FocusArticlePageDocument, {
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
      focusArticle: result.data.focusArticle,
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
