import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { AppLayout } from "@/components/layout";
import { Hero } from "@/components/hero";
import * as GQL from "@/graphql";
import { client } from "@/graphql";
import { TopBlogpostsTeaser } from "@/components/TopBlogpostsTeaser";
import { StructuredText } from "@/components/StructuredText";
import { TableOfContents } from "@/components/TableOfContents";
import { useStickyBox } from "react-sticky-box";
import { GridContainer } from "@/components/Grid/Grid";
import { useLayoutStyles } from "@/components/useLayoutStyles";

export default function MarketPage(props: GQL.FocusArticlePageQuery) {
  const { focusArticle, allMarketArticles, allFocusArticles, topBlogPosts } = props;
  const stickyRef = useStickyBox({ offsetTop: 200 });
  const { classes } = useLayoutStyles();
  if (!focusArticle?.title || !focusArticle?.lead) {
    return null;
  }

  const alternates = focusArticle?._allSlugLocales?.map((loc) => ({
    href: "/market/[slug]",
    as: `/market/${loc.value}`,
    locale: loc.locale as string,
  }));

  return (
    <AppLayout
      alternates={alternates}
      allMarkets={allMarketArticles}
      allFocusArticles={allFocusArticles}
      showBackButton
    >
      <Hero title={focusArticle.title} lead={focusArticle.lead} bgColor="#ACB4BD" shiftedLeft />
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
      <TopBlogpostsTeaser blogposts={topBlogPosts} />
    </AppLayout>
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

  return {
    props: {
      focusArticle: result.data.focusArticle,
      allMarketArticles: result.data.allMarketArticles,
      allFocusArticles: result.data.allFocusArticles,
      topBlogPosts: result.data.topBlogPosts,
    },
    revalidate: 10,
  };
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
    return page._allSlugLocales
      ? page._allSlugLocales?.map((loc) => ({
          locale: loc.locale ?? undefined,
          params: { slug: loc.value ?? undefined },
        }))
      : [];
  });

  return {
    fallback: false,
    paths,
  };
};
