import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import { StructuredText } from "@/components/StructuredText";
import { GridContainer } from "@/components/Grid";
import { Hero } from "@/components/hero";
import { useLayoutStyles } from "@/components/useLayoutStyles";

export default function LegalPage(props: GQL.LegalPageQuery) {
  const { legalPage, allMarketArticles, allFocusArticles } = props;
  const { classes } = useLayoutStyles();
  if (!legalPage?.title || !legalPage.lead) {
    return null;
  }
  const alternates = legalPage?._allSlugLocales?.map((loc) => ({
    href: "/legal",
    as: `/${loc.value}`,
    locale: loc.locale as string,
  }));
  return (
    <AppLayout
      alternates={alternates}
      allMarkets={allMarketArticles}
      allFocusArticles={allFocusArticles}
      showBackButton
    >
      <Hero title={legalPage.title} lead={legalPage.lead} showTitleLine={false} shiftedLeft />
      <GridContainer
        sx={{
          mt: 4,
          mb: 8,
          position: "relative",
        }}
      >
        <div className={classes.aside} />
        <div className={classes.content}>
          {legalPage.content && <StructuredText data={legalPage.content} />}
        </div>
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
