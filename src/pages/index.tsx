import { Trans } from "@lingui/macro";
import { Box, Button, Typography, Stack } from "@mui/material";
import React from "react";

import { ContentContainer } from "@/components/content-container";
import { Hero } from "@/components/hero";
import { InfografikTeaser } from "@/components/homepage/infografik-teaser";
import { MarketsGrid } from "@/components/homepage/markets-grid";
import { AppLayout } from "@/components/layout";
import { NewsfeedEntry } from "@/components/newsfeed";
import { Market, Newsfeed } from "@/domain/types";
import { fetchCMS } from "@/lib/cms-api";

export default function HomePage({
  homePage,
  allMarkets,
  allNewsfeeds,
}: {
  homePage: { title: string; lead: string };
  allMarkets: Market[];
  allNewsfeeds: Newsfeed[];
}) {
  return (
    <AppLayout allMarkets={allMarkets}>
      <Hero {...homePage} />
      <Box component="main">
        <ContentContainer
          sx={{
            display: "flex",
            flexDirection: ["column", "column", "row"],
            justifyContent: ["flex-start", "flex-start", "space-between"],
            px: [4, 4, 0],
            py: 4,
          }}
        >
          <Box sx={{ width: ["100%", "100%", "65%"] }}>
            <Typography variant="h2">
              <Trans id="homepage.section.market">Märkte</Trans>
            </Typography>
            <MarketsGrid allMarkets={allMarkets} />
          </Box>

          <Box sx={{ width: ["100%", "100%", "30%"] }}>
            <Stack flexDirection="column" spacing={8}>
              <div>
                <Typography variant="h2">
                  <Trans id="homepage.section.newsfeed">Aktuell</Trans>
                </Typography>
                <div>
                  {allNewsfeeds.map((news) => (
                    <NewsfeedEntry
                      key={news.title}
                      title={news.title}
                      publicationDate={news.publicationDate}
                    />
                  ))}
                </div>
                <Button variant="text" sx={{ ml: -2 }}>
                  <Trans id="button.show.all">Alle Anzeigen</Trans>
                </Button>
              </div>
              <div>
                <Typography variant="h2">
                  <Trans id="homepage.section.newest.infografic">
                    Neueste Infografik
                  </Trans>
                </Typography>
                <InfografikTeaser />
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
      }

      allSimplePages(locale: $locale) {
        slug
        title
      }

      allMarkets(locale: $locale) {
        name
        icon {
          url
        }
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
