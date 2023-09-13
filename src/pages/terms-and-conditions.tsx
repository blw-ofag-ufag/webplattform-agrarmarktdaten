import { ContentContainer } from "@/components/content-container";
import { Hero } from "@/components/hero";
import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql/api";

export default function LegalPage(props: GQL.TermsPageQuery) {
  const { termsPage, allMarketArticles, allFocusArticles } = props;
  if (!termsPage?.title || !termsPage.lead) {
    return null;
  }
  return (
    <AppLayout allMarkets={allMarketArticles}>
      <Hero title={termsPage.title} lead={termsPage.lead} />
      <ContentContainer>{/* {termsPage.content} */}</ContentContainer>
    </AppLayout>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.TermsPageQuery>(GQL.TermsPageDocument, {
      locale: context.locale,
    })
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: result.data };
};
