import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import { AppLayout } from "@/components/layout";
import { Hero } from "@/components/hero";
import { ContentContainer } from "@/components/content-container";
import { Button, Stack, Typography } from "@mui/material";
import { Trans } from "@lingui/macro";
import { BlogPostsGrid } from "@/components/blog/BlogPost";
import NextLink from "next/link";

export default function MethodsPage(props: GQL.MethodsPageQuery) {
  const { methodsPage, allMarketArticles, allFocusArticles, topBlogPosts } =
    props;
  if (!methodsPage?.title || !methodsPage.lead) {
    return null;
  }
  return (
    <AppLayout
      allMarkets={allMarketArticles}
      allFocusArticles={allFocusArticles}
    >
      <Hero title={methodsPage.title} lead={methodsPage.lead} />
      <ContentContainer>
        <Stack flexDirection="column" spacing={6}>
          <Typography variant="h5">
            <Trans id="homepage.section.latestBlogPosts">
              Neuste Blogbeiträge
            </Trans>
          </Typography>
          <BlogPostsGrid blogPosts={topBlogPosts} />
          <NextLink href="/blog" legacyBehavior>
            <Button
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "184px",
                height: "48px",
                backgroundColor: "grey.300",
                color: "black",

                "&:hover": {
                  backgroundColor: "grey.500",
                },
              }}
            >
              <Trans id="button.show.all">Alle Anzeigen</Trans>
            </Button>
          </NextLink>
        </Stack>
      </ContentContainer>
    </AppLayout>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.MethodsPageQuery>(GQL.MethodsPageDocument, {
      locale: context.locale,
    })
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: result.data };
};
