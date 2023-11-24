import { Trans } from "@lingui/macro";
import { Typography, Box, Card, Button, useTheme } from "@mui/material";
import { Hero } from "@/components/hero";
import { CardsGrid } from "@/components/homepage/grids";
import { AppLayout, LayoutSections } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import { TopBlogpostsTeaser } from "@/components/TopBlogpostsTeaser";
import { s } from "@interactivethings/swiss-federal-ci";
import { Download } from "@/icons/icons-jsx/control";
import { GridContainer } from "@/components/Grid";
import { makeStyles } from "@/components/style-utils";
import CardActionButton from "@/components/CardActionButton";
import Link from "next/link";

const useStyles = makeStyles()(({ palette: c, spacing: s, shadows: e }) => ({
  button: {
    backgroundColor: c.cobalt[500],
    fontWeight: 700,
    width: "fit-content",
    marginTop: s(6),
  },

  card: {
    boxShadow: e.lg,
    borderRadius: s(2),
  },
}));

export default function HomePage(props: GQL.HomePageQuery) {
  const { classes } = useStyles();
  const { homePage, allMarketArticles, allFocusArticles, topBlogPosts } = props;
  const theme = useTheme();
  if (!homePage?.title || !homePage.lead) {
    return null;
  }
  return (
    <div data-datocms-noindex>
      <AppLayout allMarkets={allMarketArticles} allFocusArticles={allFocusArticles}>
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
            <Card sx={{ p: s(8) }} className={classes.card}>
              <Box display="flex" alignItems="center">
                <Box display="flex" flexDirection="column" pr="50px">
                  <Typography variant="body1">
                    <Trans id="homepage.section.data.content">
                      Various data can be selected and downloaded via the data download, in
                      particular price series, and in some cases also quantity and area data. Data
                      are available from the year 2000 onwards.
                    </Trans>
                  </Typography>
                  <Button className={classes.button} component={Link} href="/data">
                    <Trans id="homepage.section.data.button">Learn More</Trans>
                  </Button>
                </Box>
                <CardActionButton component={Link} href="/data">
                  <Download width={32} height={32} />
                </CardActionButton>
              </Box>
            </Card>
          </GridContainer>
        </LayoutSections>
      </AppLayout>
    </div>
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
