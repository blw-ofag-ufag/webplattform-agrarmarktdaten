import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Banner } from "../../../components/banner";
import { AppLayout } from "../../../components/layout";
import { MarketArea, Newsfeed } from "../../../domain/types";
import { IconName } from "../../../icons";
import { fetchCMS } from "../../../lib/cms-api";
import { Box, Flex, Button, Link } from "@theme-ui/components";
import { Trans } from "@lingui/macro";
import { NewsfeedEntry } from "../../../components/newsfeed";
import { TradeLevelsGrid } from "../../../components/card-trade";
import { getMarketAreaColor } from "../../../domain/colors";
import { ReportCard } from "../../../components/card-data";
import { InfografikTeaserLarge } from "../../../components/homepage/infografik-teaser";

export default ({
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
}) => {
  const {
    query: { locale },
  } = useRouter();
  const alternates = marketArea
    ? marketArea._allSlugLocales.map((loc) => {
        return {
          href: "/[locale]/area/[slug]",
          as: `/${loc.locale}/area/${loc.value}`,
          label: loc.locale,
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
          <Box as="article">
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
                  <Trans id="article.section.infografic">Infografik</Trans>
                </h2>
                {(marketArea.slug === "kartoffeln" ||
                  marketArea.slug === "potatoes") && <InfografikTeaserLarge />}
                <h2>
                  <Trans id="article.section.data">Daten</Trans>
                </h2>
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
                    <h2>
                      <Trans id="article.section.trade">Handelsstufen</Trans>
                    </h2>
                    <TradeLevelsGrid
                      tradeLevels={marketArea.tradeLevels}
                      color={getMarketAreaColor(marketArea.slug)}
                    />
                  </>
                )}
              </Box>
              <Box sx={{ width: ["100%", "100%", "30%"] }}>
                <h2>
                  <Trans id="article.section.news">Neuigkeiten</Trans>
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

                {marketArea.links && (
                  <>
                    <h2>
                      <Trans id="article.section.link">Links</Trans>
                    </h2>
                    {marketArea.links.map((link) => (
                      <Box key={link.label} sx={{ mb: 3 }}>
                        <Link variant="primary" href={link.url}>
                          > {link.label}
                        </Link>
                      </Box>
                    ))}
                  </>
                )}
              </Box>
            </Flex>
          </Box>
        </>
      ) : (
        // <div>
        //   <article>
        //     <h1>{marketArea.title}</h1>
        //     {marketArea.icon}
        //     <h2>Reports</h2>
        //     {marketArea.reports.map(report => (
        //       <div key={report.title}>{report.title}</div>
        //     ))}
        //     <h2>Sub-Areas</h2>
        //     <Grid
        //       as="ul"
        //       sx={{ listStyle: "none", m: 0, p: 0 }}
        //       width={[200, null, 192]}
        //     >
        //       {marketArea.children.map(area => (
        //         <Box as="li" key={area.slug}>
        //           <NextLink
        //             href="/[locale]/area/[slug]"
        //             as={`/${locale}/area/${area.slug}`}
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
};

export const getStaticProps: GetStaticProps = async (context) => {
  console.log("GSP", context);

  const query = `
  query PageQuery($locale: SiteLocale!, $slug: String!){
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
    variables: context.params,
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
      params: { locale: loc.locale, slug: loc.value },
    }));
  });

  return {
    fallback: false,
    paths,
  };
};
