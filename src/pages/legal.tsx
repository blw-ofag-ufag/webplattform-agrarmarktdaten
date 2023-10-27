import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import { StructuredText } from "@/components/StructuredText";
import { GridContainer, GridElement } from "@/components/Grid";
import { useTheme } from "@mui/material/styles";
import { Hero } from "@/components/hero";
import { gridColumn } from "@/components/Grid/Grid";

export default function LegalPage(props: GQL.LegalPageQuery) {
  const { legalPage, allMarketArticles, allFocusArticles } = props;
  const theme = useTheme();
  if (!legalPage?.title || !legalPage.lead) {
    return null;
  }
  return (
    <AppLayout allMarkets={allMarketArticles} allFocusArticles={allFocusArticles} showBackButton>
      <Hero title={legalPage.title} lead={legalPage.lead} shiftedLeft />
      <GridContainer
        sx={{
          mt: 4,
          mb: 8,
          position: "relative",
        }}
      >
        <GridElement
          sx={{
            [theme.breakpoints.down("xxxl")]: gridColumn(2, 9),
            [theme.breakpoints.down("xxl")]: gridColumn(12),
            [theme.breakpoints.down("xl")]: gridColumn(12),
          }}
        >
          {legalPage.content && <StructuredText data={legalPage.content} />}
        </GridElement>
      </GridContainer>
    </AppLayout>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.LegalPageQuery>(
      GQL.LegalPageDocument,
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
