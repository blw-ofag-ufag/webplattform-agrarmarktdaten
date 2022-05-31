import { Trans } from "@lingui/macro";
import { Box, Button, Typography, Stack } from "@mui/material";
import Link from "next/link";
import React from "react";

import { BlogPostsGrid } from "@/components/blog/BlogPost";
import { ContentContainer } from "@/components/content-container";
import Flex from "@/components/flex";
import { Hero } from "@/components/hero";
import { MarketsGrid } from "@/components/homepage/markets-grid";
import { AppLayout } from "@/components/layout";
import { BlogPost, Market, SEO } from "@/domain/types";
import { fetchCMS } from "@/lib/cms-api";

type HomePage = { title: string; lead: string; seo?: SEO };

export default function HomePage({
  homePage,
  allMarkets,
  allBlogPosts,
}: {
  homePage: HomePage;
  allMarkets: Pick<Market, "title" | "slug" | "tile">[];
  allBlogPosts: BlogPost[];
}) {
  return (
    <AppLayout allMarkets={allMarkets}>
      <Hero {...homePage} />
      <Box component="main">
        <ContentContainer
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: ["flex-start", "flex-start", "space-between"],
            px: [4, 4, 0],
            py: 4,
          }}
        >
          <Flex sx={{ flexDirection: "column", mt: 7, gap: 6 }}>
            <Typography variant="h2">
              <Trans id="homepage.section.market">Märkte</Trans>
            </Typography>
            <MarketsGrid allMarkets={allMarkets} />
          </Flex>

          <Box mt={7}>
            <Stack flexDirection="column" spacing={8}>
              <div>
                <Typography variant="h6" mb={6}>
                  <Trans id="homepage.section.latestBlogPosts">
                    Latest Blog Posts
                  </Trans>
                </Typography>
                <BlogPostsGrid blogPosts={allBlogPosts} />
                <Link href="/blog">
                  <Button variant="text" sx={{ ml: -2 }}>
                    <Trans id="button.show.all">Show All</Trans>
                  </Button>
                </Link>
              </div>
            </Stack>
          </Box>
        </ContentContainer>
      </Box>
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
