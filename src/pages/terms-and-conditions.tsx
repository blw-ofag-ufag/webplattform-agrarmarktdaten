import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import { StructuredText } from "@/components/StructuredText";
import { NewGridContainer, GridElement } from "@/components/Grid";
import { useTheme } from "@mui/material/styles";
import { Hero } from "@/components/hero";
import { gridColumn } from "@/components/Grid/Grid";

export default function LegalPage(props: GQL.TermsPageQuery) {
  const { termsPage, allMarketArticles, allFocusArticles } = props;
  const theme = useTheme();
  if (!termsPage?.title || !termsPage.lead) {
    return null;
  }
  return (
    <AppLayout allMarkets={allMarketArticles} allFocusArticles={allFocusArticles} showBackButton>
      <Hero title={termsPage.title} lead={termsPage.lead} shiftedLeft />
      <NewGridContainer sx={{ mt: 4, mb: 8, position: "relative" }}>
        <GridElement
          sx={{
            [theme.breakpoints.down("xxxl")]: gridColumn(2, 9),
            [theme.breakpoints.down("lg")]: gridColumn(6),
            [theme.breakpoints.down("sm")]: gridColumn(4),
          }}
        >
          {termsPage.content && <StructuredText data={termsPage.content} />}
        </GridElement>
      </NewGridContainer>
    </AppLayout>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.TermsPageQuery>(
      GQL.TermsPageDocument,
      { locale: context.locale },
      { requestPolicy: "network-only" }
    )
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: result.data, revalidate: 10 };
};
