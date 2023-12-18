import { Trans } from "@lingui/macro";
import { Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import { AppLayout, LayoutSections } from "@/components/layout";
import { client } from "@/graphql";
import * as GQL from "@/graphql";
import { Locale, isValidLocale } from "@/locales/locales";
import { Box } from "@mui/material";
import { StructuredText } from "@/components/StructuredText";
import { TopBlogpostsTeaser } from "@/components/TopBlogpostsTeaser";
import Chip from "@mui/material/Chip";
import { GridContainer } from "@/components/Grid/Grid";
import { MarketChip } from "@/components/MarketChip";
import { useLayoutStyles } from "@/components/useLayoutStyles";
import { makeStyles } from "@/components/style-utils";
import { Authors } from "@/components/Authors";
import Head from "next/head";
import { renderMetaTags } from "react-datocms";
import { i18n } from "@lingui/core";

const useStyles = makeStyles()(({ palette: c }) => ({
  publishedDate: {
    marginBottom: "2rem",
    color: c.monochrome[500],
  },

  title: {
    marginBottom: "1.5rem",
    display: "block",
    fontWeight: "regular",
  },

  marketChips: {
    marginBottom: "2rem",
  },

  chip: {
    backgroundColor: c.cobalt[100],
    color: c.monochrome[800],
    lineHeight: "18px",
    fontSize: "14px",
  },

  lead: {
    color: c.monochrome[800],
    marginBottom: "2.5rem",
  },

  leadParagraph: {
    "&&": {
      fontSize: "20px",
      lineHeight: "32px",
    },
  },

  authors: {
    marginBottom: "6rem",
    borderTop: `${c.cobalt[100]} 1px solid`,
    borderBottom: `${c.cobalt[100]} 1px solid`,
  },
}));

export default function BlogPostPage(props: GQL.BlogPostQuery) {
  const { blogPost, allMarketArticles, allFocusArticles, topBlogPosts, site } = props;
  const { classes: layoutClasses } = useLayoutStyles();
  const { classes } = useStyles();

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
    ? i18n.date(blogPost.publishedDate, { year: "numeric", month: "long", day: "numeric" })
    : null;

  return (
    <>
      <Head>{renderMetaTags([...blogPost.seo, ...site?.favicon])}</Head>
      <AppLayout
        alternates={alternates}
        allMarkets={allMarketArticles}
        allFocusArticles={allFocusArticles}
        showBackButton
        showShareButton
      >
        <GridContainer sx={{ mt: 9, mb: 8, position: "relative" }}>
          <div className={layoutClasses.aside} />
          <div className={layoutClasses.content}>
            <Box sx={{ mb: 10 }}>
              {formattedDate && (
                <Typography variant="body1" data-datocms-noindex className={classes.publishedDate}>
                  <Trans id="blogpost.publishedDate">Published on</Trans>
                  &nbsp;
                  {formattedDate}
                </Typography>
              )}
              <Typography component="h1" variant="display2" className={classes.title}>
                {blogPost.title}
              </Typography>
              <Box sx={{ display: "flex", gap: "1rem" }} className={classes.marketChips}>
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
                  return <Chip key={slug} label={title} className={classes.chip} />;
                })}
              </Box>
              <div className={classes.lead}>
                <StructuredText
                  data={blogPost.lead}
                  paragraphTypographyProps={{ className: classes.leadParagraph }}
                  sx={{ "&&": { pb: 0 } }}
                />
              </div>
              {blogPost.authors.length > 0 && (
                <Authors
                  authors={blogPost.authors.map((x) => ({
                    img: x.portrait?.url,
                    firstName: x.firstName,
                    lastName: x.lastName,
                  }))}
                  className={classes.authors}
                />
              )}
            </Box>
            {blogPost.content && <StructuredText data={blogPost.content} />}
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

  return { props: blogPostQuery.data, revalidate: 10 };
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
    return (
      page
        ?._allSlugLocales!.filter((x) => isValidLocale(x.locale))
        .map((loc) => ({
          locale: loc!.locale as Locale,
          params: { slug: loc!.value as string },
        })) ?? []
    );
  });

  return { fallback: false, paths };
};
