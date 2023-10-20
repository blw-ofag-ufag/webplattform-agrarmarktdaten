import { Hero } from "@/components/hero";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { AppLayout } from "@/components/layout";
import { StructuredText } from "@/components/StructuredText";
import * as GQL from "@/graphql";
import { client } from "@/graphql";
import { TopBlogpostsTeaser } from "@/components/TopBlogpostsTeaser";
import { Box } from "@mui/material";
import { getMarketColor } from "@/domain/colors";
import { GridContainer, GridElement } from "@/components/Grid";
import { TableOfContents } from "@/components/TableOfContents";
import { useStickyBox } from "react-sticky-box";
import { useTheme } from "@mui/material/styles";

export default function MarketPage(props: GQL.MarketPageQuery) {
  const { marketArticle, allMarketArticles, allFocusArticles, topBlogPosts } = props;

  const theme = useTheme();
  const stickyRef = useStickyBox({ offsetTop: 200 });
  const alternates = marketArticle?._allSlugLocales?.map((loc) => ({
    href: "/market/[slug]",
    as: `/market/${loc.value}`,
    locale: loc.locale as string,
  }));

  if (!marketArticle?.title || !marketArticle?.lead) {
    return null;
  }
  const [color, marketColor] = getMarketColor(marketArticle.slug);
  return (
    <AppLayout
      alternates={alternates}
      allMarkets={allMarketArticles}
      allFocusArticles={allFocusArticles}
      showBackButton
    >
      <Box sx={{ bgcolor: marketColor }}>
        <Hero title={marketArticle.title} lead={marketArticle.lead} color={color} shifted />
      </Box>
      <GridContainer sx={{ mt: 4, position: "relative" }}>
        <GridElement
          ref={stickyRef}
          sx={{
            height: "fit-content",
            [theme.breakpoints.only("xxxl")]: { width: "calc(81px * 2 + 64px)" },
            [theme.breakpoints.only("xxl")]: { width: "calc(70px * 2 + 64px)" },
            [theme.breakpoints.down("xxl")]: { display: "none" },
          }}
        >
          {marketArticle.content && (
            <TableOfContents
              data={marketArticle.content}
              activeColor={marketColor}
              sx={{ height: "fit-content", width: "100%" }}
            />
          )}
        </GridElement>
        <GridElement
          sx={{
            [theme.breakpoints.only("xxxl")]: { width: "calc(81px * 8 + 64px * 7)", ml: "64px" },
            [theme.breakpoints.only("xxl")]: { width: "calc(70px * 8 + 64px * 7)", ml: "64px" },
            [theme.breakpoints.only("xl")]: {
              width: "calc(52px * 10 + 48px * 9)",
              ml: "calc(52px + 48px)",
              mr: "calc(52px + 48px)",
            },
          }}
          xxxl={9}
          xxl={9}
          xl={9}
          lg={6}
          md={6}
          sm={4}
          xs={4}
          xxs={4}
        >
          {marketArticle.content && <StructuredText data={marketArticle.content} />}
        </GridElement>
      </GridContainer>

      <TopBlogpostsTeaser blogposts={topBlogPosts} />
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.MarketPageQuery>(
      GQL.MarketPageDocument,
      {
        locale: context.locale,
        slug: context.params.slug,
      },
      { requestPolicy: "network-only" }
    )
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return {
    props: {
      marketArticle: result.data.marketArticle,
      allMarketArticles: result.data.allMarketArticles,
      allFocusArticles: result.data.allFocusArticles,
      topBlogPosts: result.data.topBlogPosts,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await client
    .query<GQL.AllMarketArticlesSlugLocalesQuery>(GQL.AllMarketArticlesSlugLocalesDocument, {})
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  const paths = result.data.allMarketArticles.flatMap((page) => {
    return page._allSlugLocales
      ? page._allSlugLocales?.map((loc) => ({
          locale: loc.locale ?? undefined,
          params: { slug: loc.value ?? undefined },
        }))
      : [];
  });

  return { fallback: false, paths };
};
