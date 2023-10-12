import { Trans } from "@lingui/macro";
import { Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import { Grid } from "@/components/Grid";
import { AppLayout } from "@/components/layout";
import { client } from "@/graphql";
import * as GQL from "@/graphql";
import { Locale } from "@/locales/locales";
import { Box } from "@mui/material";
import { default as MUIGrid } from "@mui/material/Unstable_Grid2";
import { StructuredText } from "@/components/StructuredText";
import { TopBlogpostsTeaser } from "@/components/TopBlogpostsTeaser";
import { s, c } from "@interactivethings/swiss-federal-ci";
import { format } from "date-fns";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { getMarketColor } from "@/domain/colors";
import { Intersperse } from "@/components/Intersperse";

export default function BlogPostPage(props: GQL.BlogPostQuery) {
  const { blogPost, topBlogPosts, allMarketArticles, allFocusArticles } = props;
  const alternates = blogPost
    ? blogPost?._allSlugLocales?.map((loc) => {
        return {
          href: "/blog/[slug]",
          as: `/blog/${loc!.value!}`,
          locale: loc!.locale!,
        };
      })
    : undefined;

  if (!blogPost?.title || !blogPost.lead) {
    return null;
  }

  const formattedDate = format(new Date(blogPost.publishedDate ?? ""), "dd MMM yyyy");

  return (
    <AppLayout
      alternates={alternates}
      allMarkets={allMarketArticles}
      allFocusArticles={allFocusArticles}
    >
      <Grid sx={{ mt: "84px" }}>
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
          <Typography variant="body1" sx={{ color: c.monochrome[500] }}>
            <Trans id="blogpost.publishedDate">Published on</Trans>
            &nbsp;
            {formattedDate}
          </Typography>
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
          <Typography
            variant="h6"
            sx={{ mt: s(8), mb: 24, color: c.monochrome[800], fontWeight: 400 }}
          >
            {blogPost.lead}
          </Typography>
          <Box
            sx={{
              marginTop: s(10),
              marginBottom: "96px",
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
        </MUIGrid>
        <MUIGrid
          xxxlOffset={2}
          xxxl={9}
          xxlOffset={2}
          xxl={9}
          xlOffset={2}
          xl={9}
          lg={6}
          md={6}
          sm={4}
          xs={4}
          xxs={4}
        >
          {blogPost.content && <StructuredText data={blogPost.content} />}
        </MUIGrid>
      </Grid>
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
