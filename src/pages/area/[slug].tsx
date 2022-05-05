import { Trans } from "@lingui/macro";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import Flex from "../../components/flex";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { Banner } from "../../components/banner";
import { ReportCard } from "../../components/card-data";
import { TradeLevelsGrid } from "../../components/card-trade";
import { InfografikTeaserLarge } from "../../components/homepage/infografik-teaser";
import { AppLayout } from "../../components/layout";
import { NewsfeedEntry } from "../../components/newsfeed";
import { getMarketAreaColor } from "../../domain/colors";
import { MarketArea, Newsfeed } from "../../domain/types";
import { IconName } from "../../icons";
import { fetchCMS } from "../../lib/cms-api";

export default function Area({
  marketArea,
  allMarketAreas,
  allNewsfeeds,
}: {
  marketArea?: {
    title: string;
    introduction?: string;
    slug: string;
    icon: IconName;
    infographic: { title: string; year: string };
    reports: { title: string; reportid: string }[];
    links?: { label: string; url: string }[];
    tradeLevels?: { title: string; icon: IconName }[];
    children: { title: string; icon: IconName; slug: string }[];
    _allSlugLocales: { locale: string; value: string }[];
  };
  allMarketAreas: MarketArea[];
  allNewsfeeds: Newsfeed[];
}) {
  const alternates = marketArea
    ? marketArea._allSlugLocales.map((loc) => {
        return {
          href: "/area/[slug]",
          as: `/area/${loc.value}`,
          locale: loc.locale,
        };
      })
    : undefined;

  return (
    <AppLayout alternates={alternates} allMarketAreas={allMarketAreas}>
      {marketArea ? (
        <>
          <Banner
            slug={marketArea.slug}
            title={marketArea.title}
            intro={marketArea.introduction}
          />
          <Box component="article">
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
                <Typography variant="h2">
                  <Trans id="article.section.infografic">Infografik</Trans>
                </Typography>
                {(marketArea.slug === "kartoffeln" ||
                  marketArea.slug === "potatoes") && <InfografikTeaserLarge />}
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
                  {marketArea.reports.length > 0 && (
                    <ReportCard
                      type="report"
                      title={marketArea.reports[0].title}
                      url=""
                    />
                  )}
                </Flex>
                {marketArea.tradeLevels && (
                  <>
                    <Typography variant="h2">
                      <Trans id="article.section.trade">Handelsstufen</Trans>
                    </Typography>
                    <TradeLevelsGrid
                      tradeLevels={marketArea.tradeLevels}
                      color={getMarketAreaColor(marketArea.slug)}
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
                    {marketArea.links && (
                      <>
                        <Typography variant="h2">
                          <Trans id="article.section.link">Links</Trans>
                        </Typography>
                        {marketArea.links.map((link) => (
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
            </Flex>
          </Box>
        </>
      ) : (
        // <div>
        //   <article>
        //     <h1>{marketArea.title}</h1>
        //     {marketArea.icon}
        //     <Typography variant="h2">Reports</Typography>
        //     {marketArea.reports.map(report => (
        //       <div key={report.title}>{report.title}</div>
        //     ))}
        //     <Typography variant="h2">Sub-Areas</Typography>
        //     <Grid
        //       component="ul"
        //       sx={{ listStyle: "none", m: 0, p: 0 }}
        //       width={[200, null, 192]}
        //     >
        //       {marketArea.children.map(area => (
        //         <Box component="li" key={area.slug}>
        //           <NextLink
        //             href="/area/[slug]"
        //             as={`/area/${area.slug}`}
        //             passHref
        //           >
        //             <Card>
        //               <MarketIcon icon={area.icon} />
        //               <Heading>
        //                 <Link>{area.title}</Link>
        //               </Heading>
        //             </Card>
        //           </NextLink>
        //         </Box>
        //       ))}
        //     </Grid>
        //   </article>
        // </div>
        <div>NOT FOUND</div>
      )}
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context: $FixMe) => {
  const query = `
  query PageQuery($locale: SiteLocale!, $slug: String!) {
    marketArea(locale: $locale, filter: {slug: {eq: $slug}}) {
      title
      introduction
      slug
      icon

      links {
        label
        url
      }
      tradeLevels {
        title
        icon
      }
      reports {
        title
        reportid
      }
      children {
        title
        icon
        slug
      }
      _allSlugLocales {
        locale
        value
      }
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
    variables: { locale: context.locale, slug: context.params.slug },
    preview: context.preview,
  });

  return {
    props: {
      marketArea: result.marketArea,
      allMarketAreas: result.allMarketAreas,
      allNewsfeeds: result.allNewsfeeds,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `
  query {
    allMarketAreas {
      _allSlugLocales {
        locale
        value
      }
    }
  }
  `;

  const result = await fetchCMS(query);

  const paths = result.allMarketAreas.flatMap((page: $FixMe) => {
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
