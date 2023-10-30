import { Hero } from "@/components/hero";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { AppLayout } from "@/components/layout";
import { StructuredText } from "@/components/StructuredText";
import * as GQL from "@/graphql";
import { client } from "@/graphql";
import { TopBlogpostsTeaser } from "@/components/TopBlogpostsTeaser";
import { getMarketColor } from "@/domain/colors";
import { GridElement } from "@/components/Grid";
import { TableOfContents } from "@/components/TableOfContents";
import { useStickyBox } from "react-sticky-box";
import { useTheme } from "@mui/material/styles";
import { GridContainer, gridColumn } from "@/components/Grid/Grid";

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
      <Hero
        title={marketArticle.title}
        lead={marketArticle.lead}
        bgColor={marketColor}
        color={color}
        shiftedLeft
      />
      <GridContainer sx={{ mt: 4, position: "relative" }}>
        <GridElement
          ref={stickyRef}
          sx={{
            height: "fit-content",
            [theme.breakpoints.down("xxxl")]: gridColumn(2),
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
            [theme.breakpoints.up("xl")]: gridColumn(2, 9),
            [theme.breakpoints.between("sm", "xl")]: gridColumn(6),
            [theme.breakpoints.down("sm")]: gridColumn(4),
          }}
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
