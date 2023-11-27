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
import { format } from "date-fns";
import Chip from "@mui/material/Chip";
import { Intersperse } from "@/components/Intersperse";
import { GridContainer } from "@/components/Grid/Grid";
import { MarketChip } from "@/components/MarketChip";
import { Avatars } from "../../components/Avatars";
import { useLayoutStyles } from "@/components/useLayoutStyles";
import { makeStyles } from "@/components/style-utils";

const useStyles = makeStyles()(({ palette: c, spacing: s }) => ({
  chip: {
    backgroundColor: c.cobalt[100],
    color: c.monochrome[800],
    lineHeight: "18px",
    fontSize: "14px",
    paddingX: "18px",
    paddingY: "6px",
  },

  authors: {
    marginTop: s(1),
    borderTop: `${c.cobalt[100]} 1px solid`,
    borderBottom: `${c.cobalt[100]} 1px solid`,
    display: "flex",
    position: "relative",
    height: "88px",
    alignItems: "center",
    gap: "1rem",
  },

  lead: {
    marginTop: s(8),
    color: c.monochrome[800],
  },
}));

export default function BlogPostPage(props: GQL.BlogPostQuery) {
  const {
    blogPost,
    allMarketArticles,
    allFocusArticles,
    topBlogPosts,
    marketSlug,
    focusSlug,
    analysisSlug,
    dataSlug,
    infoSlug,
    legalSlug,
    methodsSlug,
    termsSlug,
  } = props;
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
    ? format(new Date(blogPost.publishedDate), "dd MMM yyyy")
    : null;

  return (
    <AppLayout
      alternates={alternates}
      allMarkets={allMarketArticles}
      allFocusArticles={allFocusArticles}
      marketSlug={marketSlug}
      focusSlug={focusSlug}
      analysisSlug={analysisSlug}
      dataSlug={dataSlug}
      infoSlug={infoSlug}
      legalSlug={legalSlug}
      methodsSlug={methodsSlug}
      termsSlug={termsSlug}
      showBackButton
    >
      <GridContainer sx={{ mt: 9, mb: 8, position: "relative" }}>
        <div className={layoutClasses.aside} />
        <div className={layoutClasses.content}>
          <Box sx={{ mb: 10 }}>
            {formattedDate && (
              <Typography variant="body1" color="monochrome.500">
                <Trans id="blogpost.publishedDate">Published on</Trans>
                &nbsp;
                {formattedDate}
              </Typography>
            )}
            <Typography variant="display2" display="block" fontWeight="regular" my="2rem">
              {blogPost.title}
            </Typography>
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
                return <Chip key={slug} label={title} className={classes.chip} />;
              })}
            </Box>
            <div className={classes.lead}>
              <StructuredText data={blogPost.lead} sx={{ "&&": { pb: "2.5rem" } }} />
            </div>
            {blogPost.authors.length > 0 && (
              <div className={classes.authors}>
                <Avatars
                  avatars={blogPost.authors.map((x) => ({
                    url: x.portrait?.url,
                    alt: `${x.firstName} ${x.lastName}`,
                  }))}
                />
                <Box display="flex" alignItems="center">
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
              </div>
            )}
          </Box>
          {blogPost.content && <StructuredText data={blogPost.content} />}
        </div>
      </GridContainer>
      <LayoutSections>
        <TopBlogpostsTeaser blogposts={topBlogPosts} />
      </LayoutSections>
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
