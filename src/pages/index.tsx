import { Trans } from "@lingui/macro";
import { Typography, Box, Card, Button } from "@mui/material";
import { Hero } from "@/components/hero";
import { CardsGrid } from "@/components/homepage/grids";
import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import { TopBlogpostsTeaser } from "@/components/TopBlogpostsTeaser";
import { s } from "@interactivethings/swiss-federal-ci";
import { Download } from "@/icons/icons-jsx/control";
import { GridContainer } from "@/components/Grid";
import { makeStyles } from "@/components/style-utils";
import Link from "next/link";

const useStyles = makeStyles()(({ palette: c, spacing: s }) => ({
  root0: {
    backgroundColor: c.cobalt[500],
    fontWeight: 700,
    width: "fit-content",
    marginTop: s(6),
  },

  root1: {
    backgroundColor: c.cobalt[100],
    borderRadius: 80,
    minWidth: "80px",
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function HomePage(props: GQL.HomePageQuery) {
  const { classes } = useStyles();
  const { homePage, allMarketArticles, allFocusArticles, topBlogPosts } = props;
  if (!homePage?.title || !homePage.lead) {
    return null;
  }
  return (
    <AppLayout allMarkets={allMarketArticles} allFocusArticles={allFocusArticles}>
      <Hero
        title={homePage.title}
        lead={homePage.lead}
        hero={homePage.hero?.url}
        color="#ffffff"
        titleTypographyProps={{ variant: "display1" }}
        leadStructuredTextProps={{
          paragraphTypographyProps: { variant: "h3", fontWeight: "normal" },
        }}
        // We vertically position the background on top so that sky is always visible
        sx={{ "&&": { backgroundPosition: "center top" } }}
      />
      <Box sx={{ bgcolor: "cobalt.50", pb: "92px" }}>
        <GridContainer disableItemMargin sx={{ gap: s(8), pt: s(20), flexDirection: "column" }}>
          <Typography variant="h1" component="h2" data-debug-good sx={{ fontWeight: 700 }}>
            <Trans id="homepage.section.market">Märkte</Trans>
          </Typography>
          <CardsGrid type="market" entries={homePage.markets} />

          <Typography variant="h1" component="h2" data-debug-good sx={{ fontWeight: 700 }}>
            <Trans id="homepage.section.theme">Focus</Trans>
          </Typography>
          <CardsGrid type="focus" entries={homePage.focusArticles} />
        </GridContainer>
        <TopBlogpostsTeaser blogposts={topBlogPosts} />
        <GridContainer disableItemMargin sx={{ gap: s(8), pt: s(20), flexDirection: "column" }}>
          <Typography variant="h1" component="h2" data-debug-good sx={{ fontWeight: 700 }}>
            <Trans id="homepage.section.data">Data</Trans>
          </Typography>
          <Card sx={{ p: s(8) }}>
            <Box display="flex" alignItems="center">
              <Box display="flex" flexDirection="column" pr="50px">
                <Typography variant="body1" data-debug-good>
                  <Trans id="homepage.section.data.content">
                    Various data can be selected and downloaded via the data download, in particular
                    price series, and in some cases also quantity and area data. Data are available
                    from the year 2000 onwards.
                  </Trans>
                </Typography>
                <Button className={classes.root0} component={Link} href="/data">
                  <Trans id="homepage.section.data.button">Learn More</Trans>
                </Button>
              </Box>
              <Box className={classes.root1}>
                <Download width={40} height={40} />
              </Box>
            </Box>
          </Card>
        </GridContainer>
      </Box>
    </AppLayout>
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
