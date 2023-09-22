import { Trans } from "@lingui/macro";
import { Button, Stack, Typography } from "@mui/material";
import NextLink from "next/link";

import { BlogPostsGrid } from "@/components/blog/BlogPost";
import { ContentContainer } from "@/components/content-container";
import { Hero } from "@/components/hero";
import { CardsGrid } from "@/components/homepage/grids";
import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql/api";

export default function HomePage(props: GQL.HomePageQuery) {
  const { homePage, allMarketArticles, allFocusArticles, topBlogPosts } = props;
  if (!homePage?.title || !homePage.lead) {
    return null;
  }
  return (
    <AppLayout
      allMarkets={allMarketArticles}
      allFocusArticles={allFocusArticles}
    >
      <Hero title={homePage.title} lead={homePage.lead} />
      <ContentContainer>
        <Stack flexDirection="column" spacing={6}>
          <Typography variant="h2">
            <Trans id="homepage.section.market">Märkte</Trans>
          </Typography>
          <CardsGrid type="market" entries={homePage.markets} />
        </Stack>

        <Stack flexDirection="column" spacing={6}>
          <Typography variant="h2">
            <Trans id="homepage.section.theme">Focus</Trans>
          </Typography>
          <CardsGrid type="focus" entries={homePage.focusArticles} />
        </Stack>

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

export const getStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.HomePageQuery>(GQL.HomePageDocument, { locale: context.locale })
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: result.data };
};
