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
import { fetchCMS } from "@/lib/cms-api";

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
  const result = await fetchCMS<GQL.ThemePageQuery>(GQL.ThemePageDocument, {
    variables: { locale: context.locale, slug: context.params.slug },
    preview: context.preview,
  });

  return {
    props: {
      theme: result.theme,
      allThemes: result.allThemes,
      allBlogPosts: result.allBlogPosts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await fetchCMS<GQL.AllThemesSlugLocalesQuery>(
    GQL.AllThemesSlugLocalesDocument
  );
  const paths = result.allThemes.flatMap((page: $FixMe) => {
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
