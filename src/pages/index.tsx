import { Trans } from "@lingui/macro";
import { Button, Typography, Stack } from "@mui/material";
import Link from "next/link";
import React from "react";

import { BlogPostsGrid } from "@/components/blog/BlogPost";
import { ContentContainer } from "@/components/content-container";
import { Hero } from "@/components/hero";
import { CardsGrid } from "@/components/homepage/grids";
import { AppLayout } from "@/components/layout";
import { BlogPost, Market, SEO, Theme } from "@/domain/types";
import { fetchCMS } from "@/lib/cms-api";

type HomePage = { title: string; lead: string; seo?: SEO };

export default function HomePage({
  homePage,
  allMarkets,
  allThemes,
  allBlogPosts,
}: {
  homePage: HomePage;
  allMarkets: Pick<Market, "title" | "slug" | "tile">[];
  allThemes: Pick<Theme, "title" | "slug" | "tile">[];
  allBlogPosts: BlogPost[];
}) {
  return (
    <AppLayout allMarkets={allMarkets}>
      <Hero {...homePage} />
      <ContentContainer>
        <Stack flexDirection="column" spacing={6}>
          <Typography variant="h2">
            <Trans id="homepage.section.market">Markets</Trans>
          </Typography>
          <CardsGrid type="market" entries={allMarkets} />
        </Stack>

        <Stack flexDirection="column" spacing={6}>
          <Typography variant="h2">
            <Trans id="homepage.section.theme">Themes</Trans>
          </Typography>
          <CardsGrid type="theme" entries={allThemes} />
        </Stack>

        <Stack flexDirection="column" spacing={6}>
          <Typography variant="h6">
            <Trans id="homepage.section.latestBlogPosts">
              Latest Blog Posts
            </Trans>
          </Typography>
          <BlogPostsGrid blogPosts={allBlogPosts} />
          <Link href="/blog">
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
              <Trans id="button.show.all">Show All</Trans>
            </Button>
          </Link>
        </Stack>
      </ContentContainer>
    </AppLayout>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const query = `
    query PageQuery($locale: SiteLocale!) {
      homePage(locale: $locale) {
        title
        lead
        seo(locale: $locale) {
          title
          description
          image {
            url
          }
          twitterCard
        }
      }

      allMarkets(locale: $locale) {
        title
        slug
        tile {
          url
        }
      }

      allThemes(locale: $locale) {
        title
        slug
        tile {
          url
        }
      }

      allBlogPosts(locale: $locale, first: 3) {
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
