import { Hero } from "@/components/hero";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { AppLayout, LayoutSections } from "@/components/layout";
import { StructuredText } from "@/components/StructuredText";
import * as GQL from "@/graphql";
import { client } from "@/graphql";
import { TopBlogpostsTeaser } from "@/components/TopBlogpostsTeaser";
import { getMarketColor } from "@/domain/colors";
import { TableOfContents } from "@/components/TableOfContents";
import { GridContainer } from "@/components/Grid/Grid";
import { useLayoutStyles, useTableOfContentsSticky } from "@/components/useLayoutStyles";
import { isValidLocale } from "@/locales/locales";
import slugs from "@/generated/slugs.json";
import Head from "next/head";
import { renderMetaTags } from "react-datocms";
import _ from "lodash";

function selectTopBlogposts(
  marketBlogPosts: GQL.BlogPostRecord[],
  topBlogPosts: GQL.BlogPostRecord[]
) {
  return _.uniqBy([...marketBlogPosts, ...topBlogPosts], (d) => d.id).slice(0, 3);
}

export default function MarketPage(props: GQL.MarketPageQuery & GQL.TopMarketBlogPostsQuery) {
  const {
    marketArticle,
    allMarketArticles,
    allFocusArticles,
    topBlogPosts,
    allMethodsPages,
    site,
    topMarketBlogPosts,
  } = props;

  const stickyRef = useTableOfContentsSticky();

  const highlightedBlogposts = selectTopBlogposts(
    topMarketBlogPosts as GQL.BlogPostRecord[],
    topBlogPosts as GQL.BlogPostRecord[]
  );

  const alternates = marketArticle?._allSlugLocales?.map((loc) => ({
    href: `/market/[slug]`,
    as: `/${slugs.find((slug) => slug.locale === loc.locale)?.slugs.market}/${loc.value}`,
    locale: loc.locale as string,
  }));

  const { classes } = useLayoutStyles();

  if (!marketArticle?.title || !marketArticle?.lead) {
    return null;
  }
  const [color, marketColor] = getMarketColor(marketArticle.slug);
  return (
    <>
      <Head>{renderMetaTags([...marketArticle.seo, ...site?.favicon])}</Head>
      <AppLayout
        alternates={alternates}
        allMarkets={allMarketArticles}
        allFocusArticles={allFocusArticles}
        allMethodsPages={allMethodsPages}
        backButtonColor={color}
        showBackButton
      >
        <Hero
          title={marketArticle.title}
          lead={marketArticle.lead}
          bgColor={marketColor}
          color={color}
          shiftedLeft
          variant="market"
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
        <LayoutSections>
          <TopBlogpostsTeaser blogposts={highlightedBlogposts} />
        </LayoutSections>
      </AppLayout>
    </>
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

  const topMarketBlogposts = await client
    .query<GQL.TopMarketBlogPostsQuery>(
      GQL.TopMarketBlogPostsDocument,
      {
        locale: context.locale,
        marketId: result.data?.marketArticle?.id,
      },
      { requestPolicy: "network-only" }
    )
    .toPromise();

  if (!topMarketBlogposts.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: { ...result.data, ...topMarketBlogposts.data }, revalidate: 10 };
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
      ? page._allSlugLocales
          .filter((x) => isValidLocale(x.locale))
          ?.map((loc) => ({
            locale: loc.locale ?? undefined,
            params: { slug: loc.value ?? undefined },
          }))
      : [];
  });

  return { fallback: false, paths };
};
