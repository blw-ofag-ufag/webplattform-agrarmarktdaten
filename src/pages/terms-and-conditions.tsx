import { ContentContainer } from "@/components/content-container";
import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import { StructuredText } from "@/components/StructuredText";
import { Typography } from "@mui/material";

export default function LegalPage(props: GQL.TermsPageQuery) {
  const { termsPage, allMarketArticles, allFocusArticles } = props;
  if (!termsPage?.title || !termsPage.lead) {
    return null;
  }
  return (
    <AppLayout allMarkets={allMarketArticles} allFocusArticles={allFocusArticles}>
      <ContentContainer sx={{ mb: "96px", mt: "96px", maxWidth: "1096px" }}>
        <Typography variant="h1">{termsPage.title}</Typography>
        <Typography variant="body1">{termsPage.lead}</Typography>
      </ContentContainer>
      <ContentContainer sx={{ maxWidth: "1096px" }}>
        {termsPage.content && <StructuredText data={termsPage.content} />}
      </ContentContainer>
    </AppLayout>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await client.query<GQL.TermsPageQuery>(GQL.TermsPageDocument, { locale: context.locale }).toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: result.data };
};
