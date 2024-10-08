import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { AppLayout, LayoutSections } from "@/components/layout";
import { Hero } from "@/components/hero";
import * as GQL from "@/graphql";
import { client } from "@/graphql";
import { TopBlogpostsTeaser } from "@/components/TopBlogpostsTeaser";
import { StructuredText } from "@/components/StructuredText";
import { TableOfContents } from "@/components/TableOfContents";
import { GridContainer } from "@/components/Grid/Grid";
import { useLayoutStyles, useTableOfContentsSticky } from "@/components/useLayoutStyles";
import { isValidLocale } from "@/locales/locales";
import slugs from "@/generated/slugs.json";
import Head from "next/head";
import { renderMetaTags } from "react-datocms";

export default function MarketPage(props: GQL.FocusArticlePageQuery) {
  const {
    focusArticle,
    allMarketArticles,
    allFocusArticles,
    topBlogPosts,
    allMethodsPages,
    glossaryPage,
    site,
  } = props;
  const stickyRef = useTableOfContentsSticky();
  const { classes } = useLayoutStyles();

  if (!focusArticle?.title || !focusArticle?.lead) {
    return null;
  }

  const alternates = focusArticle?._allSlugLocales?.map((loc) => ({
    href: `/focus/[slug]`,
    as: `/${slugs.find((slug) => slug.locale === loc.locale)?.slugs.focus}/${loc.value}`,
    locale: loc.locale as string,
  }));

  return (
    <>
      <Head>{renderMetaTags([...focusArticle.seo, ...site?.favicon])}</Head>
      <AppLayout
        alternates={alternates}
        allMarkets={allMarketArticles}
        allFocusArticles={allFocusArticles}
        allMethodsPages={allMethodsPages}
        glossaryPage={glossaryPage}
        showBackButton
      >
        <Hero
          title={focusArticle.title}
          lead={focusArticle.lead}
          bgColor="#ACB4BD"
          shiftedLeft
          variant="market"
        />
        <GridContainer sx={{ mt: 4, position: "relative" }}>
          <div className={classes.aside} ref={stickyRef}>
            {focusArticle.content && (
              <TableOfContents
                data={focusArticle.content}
                sx={{ height: "fit-content", width: "100%" }}
              />
            )}
          </div>
          <div className={classes.content}>
            {focusArticle.content && <StructuredText data={focusArticle.content} />}
          </div>
        </GridContainer>
        <LayoutSections>
          <TopBlogpostsTeaser blogposts={topBlogPosts} />
        </LayoutSections>
      </AppLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.FocusArticlePageQuery>(
      GQL.FocusArticlePageDocument,
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

  return { props: result.data, revalidate: 10 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await client
    .query<GQL.AllFocusArticlesSlugLocalesQuery>(GQL.AllFocusArticlesSlugLocalesDocument, {})
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  const paths = result.data.allFocusArticles.flatMap((page) => {
    return (
      page._allSlugLocales
        ?.filter((x) => isValidLocale(x.locale))
        ?.map((loc) => ({
          locale: loc.locale ?? undefined,
          params: { slug: loc.value ?? undefined },
        })) ?? []
    );
  });

  return {
    fallback: false,
    paths,
  };
};
