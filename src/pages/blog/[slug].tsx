import { Trans } from "@lingui/macro";
import { Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import { GridElement } from "@/components/Grid";
import { AppLayout } from "@/components/layout";
import { client } from "@/graphql";
import * as GQL from "@/graphql";
import { Locale } from "@/locales/locales";
import { Box } from "@mui/material";
import { StructuredText } from "@/components/StructuredText";
import { TopBlogpostsTeaser } from "@/components/TopBlogpostsTeaser";
import { s, c } from "@interactivethings/swiss-federal-ci";
import { format } from "date-fns";
import Chip from "@mui/material/Chip";
import { Intersperse } from "@/components/Intersperse";
import { useTheme } from "@mui/material/styles";
import { GridContainer, gridColumn } from "@/components/Grid/Grid";
import { MarketChip } from "@/components/MarketChip";
import { useMemo } from "react";
import { Avatars } from "../../components/Avatars";

export default function BlogPostPage(props: GQL.BlogPostQuery) {
  const { blogPost, topBlogPosts, allMarketArticles, allFocusArticles } = props;
  const theme = useTheme();
  const alternates = blogPost
    ? blogPost?._allSlugLocales?.map((loc) => ({
        href: "/blog/[slug]",
        as: `/blog/${loc!.value!}`,
        locale: loc!.locale!,
      }))
    : undefined;

  if (!blogPost?.title || !blogPost.lead) {
    return null;
  }

  const formattedDate = blogPost.publishedDate
    ? format(new Date(blogPost.publishedDate), "dd MMM yyyy")
    : null;

  return (
    <AppLayout
      alternates={alternates}
      allMarkets={allMarketArticles}
      allFocusArticles={allFocusArticles}
      showBackButton
    >
      <GridContainer sx={{ mt: 9, mb: 8, position: "relative" }}>
        <GridElement
          sx={{
            [theme.breakpoints.between("xl", "xxxl")]: gridColumn(2, 9),
            [theme.breakpoints.between("sm", "lg")]: gridColumn(6),
            [theme.breakpoints.down("sm")]: gridColumn(4),
          }}
        >
          <Box sx={{ mb: 10 }}>
            {formattedDate && (
              <Typography variant="body1" sx={{ color: c.monochrome[500] }}>
                <Trans id="blogpost.publishedDate">Published on</Trans>
                &nbsp;
                {formattedDate}
              </Typography>
            )}
            <h1 style={{ fontSize: "48px", fontWeight: 400, lineHeight: "72px", marginTop: s(8) }}>
              {blogPost.title}
            </h1>
            <Box sx={{ display: "flex", gap: "16px" }}>
              {blogPost.markets.map(({ slug, title }) => {
                return (
                  <MarketChip
                    key={slug}
                    label={title}
                    slug={slug}
                    sx={{
                      paddingX: "18px",
                      paddingY: "6px",
                    }}
                  />
                );
              })}
              {blogPost.focusArticles.map(({ slug, title }) => {
                return (
                  <Chip
                    key={slug}
                    sx={{
                      backgroundColor: c.cobalt[100],
                      color: c.monochrome[800],
                      lineHeight: "18px",
                      fontSize: "14px",
                      paddingX: "18px",
                      paddingY: "6px",
                    }}
                    label={title}
                  />
                );
              })}
            </Box>
            <Box sx={{ mt: s(8), color: c.monochrome[800], fontWeight: 400 }}>
              <StructuredText data={blogPost.lead} />
            </Box>
            {blogPost.authors.length > 0 && (
              <Box
                sx={{
                  marginTop: s(10),
                  borderTop: `${c.cobalt[100]} 1px solid`,
                  borderBottom: `${c.cobalt[100]} 1px solid`,
                  display: "flex",
                  position: "relative",
                  height: "88px",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <Avatars
                  avatars={blogPost.authors.map((x) => ({
                    url: x.portrait?.url,
                    alt: `${x.firstName} ${x.lastName}`,
                  }))}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Intersperse separator=",&nbsp;">
                    {blogPost.authors.map((author) => {
                      return (
                        <Typography variant="body1" key={`${author.firstName} ${author.lastName}`}>
                          {`${author.firstName} ${author.lastName}`}
                        </Typography>
                      );
                    })}
                  </Intersperse>
                </Box>
              </Box>
            )}
          </Box>
          {blogPost.content && <StructuredText data={blogPost.content} />}
        </GridElement>
      </GridContainer>
      <TopBlogpostsTeaser blogposts={topBlogPosts} />
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context: $FixMe) => {
  const blogPostQuery = await client
    .query<GQL.BlogPostQuery>(
      GQL.BlogPostDocument,
      {
        locale: context.locale,
        slug: context.params.slug,
      },
      { requestPolicy: "network-only" }
    )
    .toPromise();

  if (!blogPostQuery.data) {
    console.error(blogPostQuery.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return {
    props: {
      blogPost: blogPostQuery.data.blogPost,
      allMarketArticles: blogPostQuery.data.allMarketArticles,
      allFocusArticles: blogPostQuery.data.allFocusArticles,
      topBlogPosts: blogPostQuery.data.topBlogPosts,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await client
    .query<GQL.AllBlogPostsSlugLocalesQuery>(GQL.AllBlogPostsSlugLocalesDocument, {})
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  const paths = result.data.allBlogPosts.flatMap((page) => {
    return page._allSlugLocales!.map((loc) => ({
      locale: loc!.locale as Locale,
      params: { slug: loc!.value as string },
    }));
  });

  return { fallback: false, paths };
};
