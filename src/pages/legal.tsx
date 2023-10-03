import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import { StructuredText } from "@/components/StructuredText";
import { ContentContainer } from "@/components/content-container";
import { Typography } from "@mui/material";

export default function LegalPage(props: GQL.LegalPageQuery) {
  const { legalPage, allMarketArticles, allFocusArticles } = props;
  if (!legalPage?.title || !legalPage.lead) {
    return null;
  }
  return (
    <AppLayout allMarkets={allMarketArticles} allFocusArticles={allFocusArticles}>
      <ContentContainer sx={{ mb: "96px", mt: "96px", maxWidth: "1096px" }}>
        <Typography variant="h1">{legalPage.title}</Typography>
        <Typography variant="body1">{legalPage.lead}</Typography>
      </ContentContainer>

      <ContentContainer sx={{ maxWidth: "1096px" }}>
        {legalPage.content && <StructuredText data={legalPage.content} />}
      </ContentContainer>
    </AppLayout>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await client.query<GQL.LegalPageQuery>(GQL.LegalPageDocument, { locale: context.locale }).toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: result.data };
};
