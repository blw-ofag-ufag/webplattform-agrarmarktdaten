import { Trans } from "@lingui/macro";
import { Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import { GridContainer, GridElement } from "@/components/Grid";
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
import Avatar from "@mui/material/Avatar";
import { getMarketColor } from "@/domain/colors";
import { Intersperse } from "@/components/Intersperse";
import { useTheme } from "@mui/material/styles";

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
    >
      <GridContainer sx={{ mt: 9, mb: 8, position: "relative" }}>
        <GridElement
          sx={{
            [theme.breakpoints.only("xxxl")]: {
              width: "calc(81px * 8 + 64px * 7)",
              ml: "calc(81px * 2 + 64px * 2)",
            },
            [theme.breakpoints.only("xxl")]: {
              width: "calc(70px * 8 + 64px * 7)",
              ml: "calc(70px * 2 + 64px * 2)",
            },
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
                  <Chip
                    key={slug}
                    sx={{
                      backgroundColor: getMarketColor(slug),
                      color: "#ffffff",
                      lineHeight: "18px",
                      fontSize: "14px",
                      paddingX: "18px",
                      paddingY: "6px",
                    }}
                    label={title}
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
            <Typography variant="h6" sx={{ mt: s(8), color: c.monochrome[800], fontWeight: 400 }}>
              {blogPost.lead}
            </Typography>
            {blogPost.authors.length > 0 && (
              <Box
                sx={{
                  marginTop: s(10),
                  borderTop: `${c.cobalt[100]} 1px solid`,
                  borderBottom: `${c.cobalt[100]} 1px solid`,
                  display: "flex",
                  position: "relative",
                  height: "88px",
                }}
              >
                {blogPost.authors.map((author, i) => {
                  return (
                    <Avatar
                      sx={{
                        border: "2px solid #fff",
                        position: "absolute",
                        top: 13,
                        left: `${i * 40}px`,
                        width: "56px",
                        height: "56px",
                      }}
                      key={`${author.firstName} ${author.lastName}`}
                      alt={`${author.firstName} ${author.lastName}`}
                      src={author.portrait?.url}
                    />
                  );
                })}
                <Box
                  sx={{
                    marginLeft: `${blogPost.authors.length * 60}px`,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Intersperse separator=",&nbsp;">
                    {blogPost.authors.map((author) => {
                      return (
                        <Typography
                          variant="body1"
                          sx={{ color: c.monochrome[800] }}
                          key={`${author.firstName} ${author.lastName}`}
                        >
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
    .query<GQL.BlogPostQuery>(GQL.BlogPostDocument, {
      locale: context.locale,
      slug: context.params.slug,
    })
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
