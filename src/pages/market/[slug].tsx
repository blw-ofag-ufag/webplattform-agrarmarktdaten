import { Trans } from "@lingui/macro";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

import { Banner } from "@/components/banner";
import { ReportCard } from "@/components/card-data";
import { TradeLevelsGrid } from "@/components/card-trade";
import { ContentContainer } from "@/components/content-container";
import Flex from "@/components/flex";
import { InfografikTeaserLarge } from "@/components/homepage/infografik-teaser";
import { AppLayout } from "@/components/layout";
import { NewsfeedEntry } from "@/components/newsfeed";
import { getMarketColor } from "@/domain/colors";
import { Market, Newsfeed } from "@/domain/types";
import { IconName } from "@/icons";
import { fetchCMS } from "@/lib/cms-api";

export default function MarketPage({
  market,
  allMarkets,
  allNewsfeeds,
}: {
  market?: {
    title: string;
    description?: string;
    slug: string;
    tile: {
      url: string;
    };
    infographic: { title: string; year: string };
    reports: { title: string; reportid: string }[];
    links?: { label: string; url: string }[];
    tradeLevels?: { title: string; icon: IconName }[];
    children: { title: string; icon: IconName; slug: string }[];
    _allSlugLocales: { locale: string; value: string }[];
  };
  allMarkets: Market[];
  allNewsfeeds: Newsfeed[];
}) {
  const alternates = market
    ? market._allSlugLocales.map((loc) => {
        return {
          href: "/market/[slug]",
          as: `/market/${loc.value}`,
          locale: loc.locale,
        };
      })
    : undefined;

  return (
    <AppLayout alternates={alternates} allMarkets={allMarkets}>
      {market ? (
        <>
          <Banner
            slug={market.slug}
            title={market.title}
            intro={market.description}
          />
          <Box component="article">
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
                  <Trans id="article.section.infografic">Infografik</Trans>
                </Typography>
                {(market.slug === "kartoffeln" ||
                  market.slug === "potatoes") && <InfografikTeaserLarge />}
                <Typography variant="h2">
                  <Trans id="article.section.data">Daten</Trans>
                </Typography>
                <Flex
                  sx={{
                    flexDirection: ["column", "column", "column"],
                    justifyContent: [
                      "flex-start",
                      "flex-start",
                      "space-between",
                    ],
                  }}
                >
                  <ReportCard
                    type="data"
                    title={
                      <Trans id="article.teaser.data.title">
                        Daten zum Kartoffelmarkt
                      </Trans>
                    }
                    url=""
                  />
                  {market.reports.length > 0 && (
                    <ReportCard
                      type="report"
                      title={market.reports[0].title}
                      url=""
                    />
                  )}
                </Flex>
                {market.tradeLevels && (
                  <>
                    <Typography variant="h2">
                      <Trans id="article.section.trade">Handelsstufen</Trans>
                    </Typography>
                    <TradeLevelsGrid
                      tradeLevels={market.tradeLevels}
                      color={getMarketColor(market.slug)}
                    />
                  </>
                )}
              </Box>
              <Box sx={{ width: ["100%", "100%", "30%"] }}>
                <Stack spacing={5}>
                  <div>
                    <Typography variant="h2">
                      <Trans id="article.section.news">Neuigkeiten</Trans>
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
                    {market.links && (
                      <>
                        <Typography variant="h2">
                          <Trans id="article.section.link">Links</Trans>
                        </Typography>
                        {market.links.map((link) => (
                          <Box key={link.label} sx={{ mb: 3 }}>
                            <Link href={link.url}>
                              {">"} {link.label}
                            </Link>
                          </Box>
                        ))}
                      </>
                    )}
                  </div>
                </Stack>
              </Box>
            </ContentContainer>
          </Box>
        </>
      ) : (
        <div>NOT FOUND</div>
      )}
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context: $FixMe) => {
  const query = `
    query PageQuery($locale: SiteLocale!, $slug: String!) {
      market(locale: $locale, filter: {slug: {eq: $slug}}) {
        title
        lead
        slug
        tile {
          url
        }
      }

      allMarkets(locale: $locale) {
        title
        lead
        slug
      }

      allNewsfeeds(locale: $locale) {
        title
        publicationDate
      }
    }
  `;

  const result = await fetchCMS(query, {
    variables: { locale: context.locale, slug: context.params.slug },
    preview: context.preview,
  });

  return {
    props: {
      market: result.market,
      allMarkets: result.allMarkets,
      allNewsfeeds: result.allNewsfeeds,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `
  query {
    allMarkets {
      _allSlugLocales {
        locale
        value
      }
    }
  }
  `;

  const result = await fetchCMS(query);

  const paths = result.allMarkets.flatMap((page: $FixMe) => {
    return page._allSlugLocales.map((loc: $FixMe) => ({
      locale: loc.locale,
      params: { slug: loc.value },
    }));
  });

  return {
    fallback: false,
    paths,
  };
};
