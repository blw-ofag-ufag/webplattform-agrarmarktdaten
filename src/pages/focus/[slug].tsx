import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { AppLayout } from "@/components/layout";
import { Hero } from "@/components/hero";
import * as GQL from "@/graphql";
import { client } from "@/graphql";
import { TopBlogpostsTeaser } from "@/components/TopBlogpostsTeaser";
import { StructuredText } from "@/components/StructuredText";
import { GridContainer, GridElement } from "@/components/Grid";
import { useTheme } from "@mui/material/styles";
import { TableOfContents } from "@/components/TableOfContents";
import { useStickyBox } from "react-sticky-box";

export default function MarketPage(props: GQL.FocusArticlePageQuery) {
  const { focusArticle, allMarketArticles, allFocusArticles, topBlogPosts } = props;
  const stickyRef = useStickyBox({ offsetTop: 200 });
  const theme = useTheme();
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
    >
      <Hero title={focusArticle.title} lead={focusArticle.lead} bgColor="#ACB4BD" shifted />
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
          {focusArticle.content && (
            <TableOfContents
              data={focusArticle.content}
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
          {focusArticle.content && <StructuredText data={focusArticle.content} />}
        </GridElement>
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
