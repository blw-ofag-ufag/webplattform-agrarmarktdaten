import { Hero } from "@/components/hero";
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { AppLayout } from "@/components/layout";
import { StructuredText } from "@/components/StructuredText";
import * as GQL from "@/graphql";
import { client } from "@/graphql";
import { TopBlogpostsTeaser } from "@/components/TopBlogpostsTeaser";
import { Box } from "@mui/material";
import { default as MUIGrid } from "@mui/material/Unstable_Grid2";
import { getMarketColor } from "@/domain/colors";
import { Grid } from "@/components/Grid";
import { TableOfContents } from "@/components/TableOfContents";
import { s } from "@interactivethings/swiss-federal-ci";
import { useStickyBox } from "react-sticky-box";

export default function MarketPage(props: GQL.MarketPageQuery) {
  const { marketArticle, allMarketArticles, allFocusArticles, topBlogPosts } = props;

  const stickyRef = useStickyBox({ offsetTop: 200 });
  const alternates = marketArticle?._allSlugLocales?.map((loc) => {
    return {
      href: "/market/[slug]",
      as: `/market/${loc.value}`,
      locale: loc.locale as string,
    };
  });

  if (!marketArticle?.title || !marketArticle?.lead) {
    return null;
  }
  const [color, marketColor] = getMarketColor(marketArticle.slug);
  return (
    <AppLayout alternates={alternates} allMarkets={allMarketArticles} allFocusArticles={allFocusArticles}>
      <Box sx={{ bgcolor: marketColor /* , height: "250px" */ }}>
        <Grid>
          <MUIGrid
            xxxlOffset={2}
            xxxl={12}
            xxlOffset={2}
            xxl={12}
            xlOffset={2}
            xl={12}
            lg={6}
            md={6}
            sm={4}
            xs={4}
            xxs={4}
          >
            <Hero title={marketArticle.title} lead={marketArticle.lead} color={color} />
          </MUIGrid>
        </Grid>
      </Box>
      <Grid sx={{ mt: s(4), position: "relative" }}>
        <MUIGrid
          ref={stickyRef}
          sx={{ height: "fit-content" }}
          xxxl={3}
          xxl={3}
          xl={3}
          lg={0}
          md={0}
          sm={0}
          xs={0}
          xxs={0}
        >
          {marketArticle.content && (
            <TableOfContents
              data={marketArticle.content}
              activeColor={marketColor}
              sx={{
                height: "fit-content",
                width: "100%",
              }}
            />
          )}
        </MUIGrid>
        <MUIGrid xxxl={9} xxl={9} xl={9} lg={6} md={6} sm={4} xs={4} xxs={4}>
          {marketArticle.content && <StructuredText data={marketArticle.content} />}
        </MUIGrid>
      </Grid>

      <TopBlogpostsTeaser blogposts={topBlogPosts} />
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.MarketPageQuery>(GQL.MarketPageDocument, {
      locale: context.locale,
      slug: context.params.slug,
    })
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
