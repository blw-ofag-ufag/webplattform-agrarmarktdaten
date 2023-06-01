import { Header } from "@interactivethings/swiss-federal-ci";
import { Trans } from "@lingui/macro";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

import { BlogPostsGrid } from "@/components/blog/BlogPost";
import { ContentContainer } from "@/components/content-container";
import { Hero } from "@/components/hero";
import { CardsGrid } from "@/components/homepage/grids";
import { AppLayout } from "@/components/layout";
import { BlogPost, SEO } from "@/domain/types";
import * as GQL from "@/graphql";
import { client } from "@/graphql/api";

type HomePage = { title: string; lead: string; seo?: SEO };

export default function HomePage({
  homePage,
  allMarkets,
  allThemes,
  allBlogPosts,
}: {
  homePage: HomePage;
  allMarkets: GQL.MarketRecord[];
  allThemes: GQL.ThemeRecord[];
  allBlogPosts: BlogPost[];
}) {
  return (
    <AppLayout allMarkets={allMarkets}>
      <Hero title={homePage.title} lead={homePage.lead} />
      <Header />
      <ContentContainer>
        <Stack flexDirection="column" spacing={6}>
          <Typography variant="h2">
            <Trans id="homepage.section.market">Märkte</Trans>
          </Typography>
          <CardsGrid type="market" entries={allMarkets} />
        </Stack>

        <Stack flexDirection="column" spacing={6}>
          <Typography variant="h2">
            <Trans id="homepage.section.theme">Themen</Trans>
          </Typography>
          <CardsGrid type="theme" entries={allThemes} />
        </Stack>

        <Stack flexDirection="column" spacing={6}>
          <Typography variant="h5">
            <Trans id="homepage.section.latestBlogPosts">
              Neuste Blogbeiträge
            </Trans>
          </Typography>
          <BlogPostsGrid blogPosts={allBlogPosts as GQL.BlogPostRecord[]} />
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
              <Trans id="button.show.all">Alle Anzeigen</Trans>
            </Button>
          </Link>
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
