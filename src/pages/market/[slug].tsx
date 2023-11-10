import { Hero } from "@/components/hero";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { AppLayout } from "@/components/layout";
import { StructuredText } from "@/components/StructuredText";
import * as GQL from "@/graphql";
import { client } from "@/graphql";
import { TopBlogpostsTeaser } from "@/components/TopBlogpostsTeaser";
import { getMarketColor } from "@/domain/colors";
import { TableOfContents } from "@/components/TableOfContents";
import { GridContainer } from "@/components/Grid/Grid";
import { useLayoutStyles, useTableOfContentsSticky } from "@/components/useLayoutStyles";

export default function MarketPage(props: GQL.MarketPageQuery) {
  const { marketArticle, allMarketArticles, allFocusArticles, topBlogPosts } = props;

  const stickyRef = useTableOfContentsSticky();
  const alternates = marketArticle?._allSlugLocales?.map((loc) => ({
    href: "/market/[slug]",
    as: `/market/${loc.value}`,
    locale: loc.locale as string,
  }));
  const { classes } = useLayoutStyles();

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
        <div className={classes.aside} ref={stickyRef}>
          {marketArticle.content && (
            <TableOfContents
              data={marketArticle.content}
              activeColor={marketColor}
              sx={{ height: "fit-content", width: "100%" }}
            />
          )}
        </div>
        <div className={classes.content}>
          {marketArticle.content && <StructuredText data={marketArticle.content} />}
        </div>
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
