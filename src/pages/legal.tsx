import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import { StructuredText } from "@/components/StructuredText";
import { GridContainer, GridElement } from "@/components/Grid";
import { useTheme } from "@mui/material/styles";
import { Hero } from "@/components/hero";

export default function LegalPage(props: GQL.LegalPageQuery) {
  const { legalPage, allMarketArticles, allFocusArticles } = props;
  const theme = useTheme();
  if (!legalPage?.title || !legalPage.leadNew) {
    return null;
  }
  return (
    <AppLayout allMarkets={allMarketArticles} allFocusArticles={allFocusArticles} showBackButton>
      <Hero title={legalPage.title} lead={legalPage.leadNew} shifted />
      <GridContainer sx={{ mt: 4, mb: 8, position: "relative" }}>
        <GridElement
          sx={{
            [theme.breakpoints.only("xxxl")]: {
              width: "calc(81px * 8 + 64px * 7)",
              ml: "calc(81px * 2 + 64px * 2)",
            },
            [theme.breakpoints.only("xxl")]: {
              width: "calc(70px * 8 + 64px * 7)",
              ml: "calc(70px * 2 + 64px * 2)",
            },
            [theme.breakpoints.only("xl")]: {
              width: "calc(52px * 10 + 48px * 9)",
              ml: "calc(52px + 48px)",
              mr: "calc(52px + 48px)",
            },
          }}
          xxxl={9}
          xxl={9}
          xl={9}
          lg={6}
          md={6}
          sm={4}
          xs={4}
          xxs={4}
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
