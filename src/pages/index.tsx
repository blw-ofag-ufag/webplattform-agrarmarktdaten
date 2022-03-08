import { Trans } from "@lingui/macro";
import React from "react";
import { Box, Button, Flex } from "theme-ui";
import { Banner } from "../components/banner";
import { InfografikTeaser } from "../components/homepage/infografik-teaser";
import { MarketAreasGrid } from "../components/homepage/market-areas-grid";
import { AppLayout } from "../components/layout";
import { NewsfeedEntry } from "../components/newsfeed";
import { MarketArea, Newsfeed } from "../domain/types";
import { fetchCMS } from "../lib/cms-api";

export default function HomePage({
  homePage,
  allMarketAreas,
  allNewsfeeds,
}: {
  homePage: { title: string; intro: string };
  allMarketAreas: MarketArea[];
  allNewsfeeds: Newsfeed[];
}) {
  return (
    <AppLayout allMarketAreas={allMarketAreas}>
      <Banner title={homePage.title} intro={homePage.intro} />
      {/* <ul>
      {allSimplePages.map(page => {
        return (
          <li key={page.slug}>
            <NextLink href="/[locale]/[slug]" as={`/de/${page.slug}`} passHref>
              <Link>{page.title}</Link>
            </NextLink>
          </li>
        );
      })}
    </ul> */}
      <Box as="main">
        <Flex
          sx={{
            flexDirection: ["column", "column", "row"],
            justifyContent: ["flex-start", "flex-start", "space-between"],
            maxWidth: "77rem",
            mx: "auto",
            px: [4, 4, 0],
            py: 4,
          }}
        >
          <Box sx={{ width: ["100%", "100%", "65%"] }}>
            <h2>
              <Trans id="homepage.section.market.area">Märkte</Trans>
            </h2>
            <MarketAreasGrid allMarketAreas={allMarketAreas} />
          </Box>

          <Box sx={{ width: ["100%", "100%", "30%"] }}>
            <h2>
              <Trans id="homepage.section.newsfeed">Aktuell</Trans>
            </h2>
            <div>
              {allNewsfeeds.map((news) => (
                <NewsfeedEntry
                  key={news.title}
                  title={news.title}
                  publicationDate={news.publicationDate}
                />
              ))}
            </div>
            <Button variant="inline">
              <Trans id="button.show.all">Alle Anzeigen</Trans>
            </Button>

            <h2>
              <Trans id="homepage.section.newest.infografic">
                Neueste Infografik
              </Trans>
            </h2>
            <InfografikTeaser />
          </Box>
        </Flex>
      </Box>
    </AppLayout>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const query = `
  query PageQuery($locale: SiteLocale!){
    homePage(locale: $locale) {
      title
      intro
    }
    allSimplePages(locale: $locale) {
      slug
      title
    }
    allMarketAreas(locale: $locale, filter: {parent: {exists: false}}) {
      title
      icon
      slug
    }
    allNewsfeeds(locale: $locale) {
      title
      publicationDate
    }
  }
  `;

  const result = await fetchCMS(query, {
    variables: { locale: context.locale },
    preview: context.preview,
  });

  return { props: result };
};
