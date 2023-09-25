import { Trans } from "@lingui/macro";
import { Stack, Typography } from "@mui/material";
import { ContentContainer } from "@/components/content-container";
import { Hero } from "@/components/hero";
import { CardsGrid } from "@/components/homepage/grids";
import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import { TopBlogpostsTeaser } from "@/components/TopBlogpostsTeaser";

export default function HomePage(props: GQL.HomePageQuery) {
  const { homePage, allMarketArticles, allFocusArticles, topBlogPosts } = props;
  if (!homePage?.title || !homePage.lead) {
    return null;
  }
  return (
    <AppLayout allMarkets={allMarketArticles} allFocusArticles={allFocusArticles}>
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
      </ContentContainer>
      <Stack flexDirection="column" spacing={6}>
        <TopBlogpostsTeaser blogposts={topBlogPosts} />
      </Stack>
    </AppLayout>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await client.query<GQL.HomePageQuery>(GQL.HomePageDocument, { locale: context.locale }).toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: result.data };
};
