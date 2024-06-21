import { Trans } from "@lingui/macro";
import { Typography, useTheme } from "@mui/material";
import { Hero } from "@/components/hero";
import { CardsGrid } from "@/components/homepage/grids";
import { AppLayout, LayoutSections } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import { TopBlogpostsTeaser } from "@/components/TopBlogpostsTeaser";
import { s } from "@interactivethings/swiss-federal-ci";
import { GridContainer } from "@/components/Grid";
import { DataPageCard } from "../components/DataPageCard";
import Head from "next/head";
import { renderMetaTags } from "react-datocms";

export default function HomePage(props: GQL.HomePageQuery) {
  const {
    homePage,
    allMarketArticles,
    allFocusArticles,
    allMethodsPages,
    glossaryPage,
    topBlogPosts,
    site,
  } = props;
  const theme = useTheme();
  if (!homePage?.title || !homePage.lead) {
    return null;
  }
  return (
    <>
      <Head>{renderMetaTags([...homePage.seo, ...site?.favicon])}</Head>

      <div data-datocms-noindex>
        <AppLayout
          allMarkets={allMarketArticles}
          allFocusArticles={allFocusArticles}
          allMethodsPages={allMethodsPages}
          glossaryPage={glossaryPage}
        >
          <Hero
            title={homePage.title}
            lead={homePage.lead}
            hero={homePage.hero?.url}
            color="#ffffff"
            titleTypographyProps={{
              variant: "display1",
              sx: {
                // Exception because the title is so long in German
                [theme.breakpoints.down("xs")]: {
                  fontSize: "28px",
                  lineHeight: 1.5,
                },
              },
            }}
            leadStructuredTextProps={{
              paragraphTypographyProps: { variant: "h3", fontWeight: "normal" },
            }}
            // We vertically position the background on top so that sky is always visible
            sx={{ "&&": { backgroundPosition: "center top" } }}
          />
          <LayoutSections>
            {/* Markets */}
            <GridContainer disableItemMargin sx={{ gap: s(8), flexDirection: "column" }}>
              <Typography variant="h1" component="h2">
                <Trans id="homepage.section.market">Märkte</Trans>
              </Typography>
              <CardsGrid type="market" entries={homePage.markets} />
            </GridContainer>

            {/* Focus */}

            <GridContainer disableItemMargin sx={{ gap: s(8), flexDirection: "column" }}>
              <Typography variant="h1" component="h2">
                <Trans id="homepage.section.theme">Focus</Trans>
              </Typography>
              <CardsGrid type="focus" entries={homePage.focusArticles} />
            </GridContainer>

            {/* Analysis */}
            <TopBlogpostsTeaser blogposts={topBlogPosts} />

            {/* Data */}
            <GridContainer disableItemMargin sx={{ gap: s(8), flexDirection: "column" }}>
              <Typography variant="h1" component="h2">
                <Trans id="homepage.section.data">Data</Trans>
              </Typography>
              <DataPageCard />
            </GridContainer>
          </LayoutSections>
        </AppLayout>
      </div>
    </>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.HomePageQuery>(
      GQL.HomePageDocument,
      { locale: context.locale },
      { requestPolicy: "network-only" }
    )
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: result.data, revalidate: 10 };
};
