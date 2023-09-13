import { ContentContainer } from "@/components/content-container";
import { Hero } from "@/components/hero";
import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql/api";

export default function LegalPage(props: GQL.LegalPageQuery) {
  const { legalPage, allMarketArticles, allFocusArticles } = props;
  if (!legalPage?.title || !legalPage.lead) {
    return null;
  }
  return (
    <AppLayout allMarkets={allMarketArticles}>
      <Hero title={legalPage.title} lead={legalPage.lead} />
      <ContentContainer>{/* {legalPage.content} */}</ContentContainer>
    </AppLayout>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.LegalPageQuery>(GQL.LegalPageDocument, {
      locale: context.locale,
    })
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: result.data };
};
