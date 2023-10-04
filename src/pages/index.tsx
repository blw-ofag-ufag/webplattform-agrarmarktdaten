import { Trans } from "@lingui/macro";
import { Typography, Box } from "@mui/material";
import { ContentContainer } from "@/components/content-container";
import { Hero } from "@/components/hero";
import { CardsGrid } from "@/components/homepage/grids";
import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import { TopBlogpostsTeaser } from "@/components/TopBlogpostsTeaser";
import { s } from "@interactivethings/swiss-federal-ci";

export default function HomePage(props: GQL.HomePageQuery) {
  const { homePage, allMarketArticles, allFocusArticles, topBlogPosts } = props;
  if (!homePage?.title || !homePage.lead) {
    return null;
  }
  return (
    <AppLayout allMarkets={allMarketArticles} allFocusArticles={allFocusArticles}>
      <Hero title={homePage.title} lead={homePage.lead} hero={homePage.hero?.url} color="#ffffff" />
      <Box sx={{ bgcolor: "#f9f9f9", pb: "92px" }}>
        <ContentContainer sx={{ gap: s(8), pt: s(20) }}>
          <Typography variant="h2" sx={{ fontWeight: 700 }}>
            <Trans id="homepage.section.market">Märkte</Trans>
          </Typography>
          <CardsGrid type="market" entries={homePage.markets} />

          <Typography variant="h2" sx={{ fontWeight: 700 }}>
            <Trans id="homepage.section.theme">Focus</Trans>
          </Typography>
          <CardsGrid type="focus" entries={homePage.focusArticles} />
        </ContentContainer>
        <TopBlogpostsTeaser blogposts={topBlogPosts} />
      </Box>
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
