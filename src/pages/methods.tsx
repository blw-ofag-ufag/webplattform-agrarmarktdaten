import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import { AppLayout } from "@/components/layout";
import { Hero } from "@/components/hero";
import { ContentContainer } from "@/components/content-container";
import { TopBlogpostsTeaser } from "@/components/TopBlogpostsTeaser";
import { StructuredText } from "@/components/StructuredText";

export default function MethodsPage(props: GQL.MethodsPageQuery) {
  const { methodsPage, allMarketArticles, allFocusArticles, topBlogPosts } = props;
  if (!methodsPage?.title || !methodsPage.lead) {
    return null;
  }
  return (
    <AppLayout allMarkets={allMarketArticles} allFocusArticles={allFocusArticles}>
      <Hero title={methodsPage.title} lead={methodsPage.lead} />
      {methodsPage.content && (
        <ContentContainer>
          <StructuredText data={methodsPage.content} />
        </ContentContainer>
      )}
      <TopBlogpostsTeaser blogposts={topBlogPosts} />
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
