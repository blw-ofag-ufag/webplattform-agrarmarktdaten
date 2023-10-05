import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import { StructuredText } from "@/components/StructuredText";
import { Typography } from "@mui/material";
import { Grid } from "@/components/Grid";
import { default as MUIGrid } from "@mui/material/Unstable_Grid2";
import { s } from "@interactivethings/swiss-federal-ci";

export default function LegalPage(props: GQL.LegalPageQuery) {
  const { legalPage, allMarketArticles, allFocusArticles } = props;
  if (!legalPage?.title || !legalPage.lead) {
    return null;
  }
  return (
    <AppLayout allMarkets={allMarketArticles} allFocusArticles={allFocusArticles}>
      <Grid sx={{ pt: "96px" }}>
        <MUIGrid
          xxxlOffset={2}
          xxxl={12}
          xxlOffset={2}
          xxl={12}
          xlOffset={2}
          xl={12}
          lg={6}
          md={6}
          sm={4}
          xs={4}
          xxs={4}
        >
          <Typography variant="h1" sx={{ pb: s(6) }}>
            {legalPage.title}
          </Typography>
          <Typography variant="body1">{legalPage.lead}</Typography>
        </MUIGrid>
      </Grid>
      <Grid sx={{ mt: "96px" }}>
        <MUIGrid xxxlOffset={2} xxxl={9} xxlOffset={2} xxl={9} xlOffset={2} xl={9} lg={6} md={6} sm={4} xs={4} xxs={4}>
          {legalPage.content && <StructuredText data={legalPage.content} />}
        </MUIGrid>
      </Grid>
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
