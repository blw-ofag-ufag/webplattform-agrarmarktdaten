import { Trans } from "@lingui/macro";
import { Stack, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

import { BlogPostsGrid } from "@/components/blog/BlogPost";
import { ContentContainer } from "@/components/content-container";
import { Hero } from "@/components/hero";
import { AppLayout } from "@/components/layout";
import { BlogPost, Theme } from "@/domain/types";
import * as GQL from "@/graphql";
import { client } from "@/graphql";

export default function ThemePage({
  theme,
  allThemes,
  allBlogPosts,
}: {
  theme?: Theme & {
    _allSlugLocales: { locale: string; value: string }[];
  };
  allThemes: Theme[];
  allBlogPosts: BlogPost[];
}) {
  const alternates = theme
    ? theme._allSlugLocales.map((loc) => {
        return {
          href: "/theme/[slug]",
          as: `/theme/${loc.value}`,
          locale: loc.locale,
        };
      })
    : undefined;

  return (
    <AppLayout alternates={alternates} allMarkets={allThemes}>
      {theme ? (
        <>
          <Hero title={theme.title} lead={theme.lead} />
          <ContentContainer>
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
  const result = await client
    .query<GQL.ThemePageQuery>(GQL.ThemePageDocument, {
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
      theme: result.data.theme,
      allThemes: result.data.allThemes,
      allBlogPosts: result.data.allBlogPosts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await client
    .query<GQL.AllThemesSlugLocalesQuery>(GQL.AllThemesSlugLocalesDocument)
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  const paths = result.data.allThemes.flatMap((d: $FixMe) => {
    return d._allSlugLocales.map((loc: $FixMe) => ({
      locale: loc.locale,
      params: { slug: loc.value },
    }));
  });

  return {
    fallback: false,
    paths,
  };
};
