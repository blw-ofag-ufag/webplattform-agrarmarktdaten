import { Trans } from "@lingui/macro";
import { Stack, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

import { BlogPostsGrid } from "@/components/blog/BlogPost";
import { ContentContainer } from "@/components/content-container";
import { Hero } from "@/components/hero";
import { AppLayout } from "@/components/layout";
import { Theme } from "@/domain/types";
import * as GQL from "@/graphql";
import { client } from "@/graphql";
import { Locale } from "@/locales/locales";

export default function ThemePage({
  theme,
  allThemes,
  allBlogPosts,
}: {
  theme?: GQL.ThemeRecord;
  allThemes: Theme[];
  allBlogPosts: GQL.BlogPostRecord[];
}) {
  const alternates = theme
    ? theme._allSlugLocales!.map((loc) => {
        return {
          href: "/theme/[slug]",
          as: `/theme/${loc.value}`,
          locale: loc.locale as Locale,
        };
      })
    : undefined;

  return (
    <AppLayout alternates={alternates} allMarkets={[]}>
      {theme ? (
        <>
          <Hero title={theme.title as string} lead={theme.lead as string} />
          <ContentContainer>
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

  const paths = result.data.allThemes.flatMap((d) => {
    return d._allSlugLocales!.map((loc) => ({
      locale: loc!.locale as Locale,
      params: { slug: loc!.value as string },
    }));
  });

  return {
    fallback: false,
    paths,
  };
};
