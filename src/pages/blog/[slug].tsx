import { Trans } from "@lingui/macro";
import { Stack, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";

import { BlogPostsGrid } from "@/components/blog/BlogPost";
import { ContentContainer } from "@/components/content-container";
import { Hero } from "@/components/hero";
import { AppLayout } from "@/components/layout";
import { client } from "@/graphql";
import * as GQL from "@/graphql";
import { Locale } from "@/locales/locales";

export default function BlogPostPage({
  blogPost,
  allBlogPosts,
}: {
  blogPost: GQL.BlogPostQuery;
  allBlogPosts: GQL.AllBlogPostsQuery;
}) {
  const alternates = blogPost
    ? blogPost.blogPost?._allSlugLocales?.map((loc) => {
        return {
          href: "/blog/[slug]",
          as: `/blog/${loc!.value!}`,
          locale: loc!.locale!,
        };
      })
    : undefined;

  return (
    <AppLayout alternates={alternates} allMarkets={[]}>
      {blogPost.blogPost ? (
        <>
          <ContentContainer sx={{ mt: 7 }}>
            <Hero title={blogPost.blogPost.title as string} lead={blogPost.blogPost.lead as string} />
            {allBlogPosts.allBlogPosts ? (<Stack flexDirection="column" spacing={6}>
              <Typography variant="h5">
                <Trans id="homepage.section.latestBlogPosts">
                  Neuste Blogbeiträge
                </Trans>
              </Typography>
              <BlogPostsGrid blogPosts={allBlogPosts.allBlogPosts as GQL.BlogPostRecord[]} />
            </Stack>) : null}
          </ContentContainer>
        </>
      ) : (
        <div>NOT FOUND</div>
      )}
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

  const allBlogPostsQuery = await client.query<GQL.AllBlogPostsQuery>(GQL.AllBlogPostsDocument, {
    locale: context.locale,
    first: 3
  }).toPromise();

  if (!allBlogPostsQuery.data) {
    console.error(allBlogPostsQuery.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return {
    props: {
      blogPost: blogPostQuery.data,
      allBlogPosts: allBlogPostsQuery.data
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await client
    .query<GQL.AllBlogPostsSlugLocalesQuery>(
      GQL.AllBlogPostsSlugLocalesDocument
    )
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

  return {
    fallback: false,
    paths,
  };
};
