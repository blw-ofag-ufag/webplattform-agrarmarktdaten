import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import { StructuredText } from "@/components/StructuredText";
import { GridContainer } from "@/components/Grid";
import { Hero } from "@/components/hero";
import { useLayoutStyles } from "@/components/useLayoutStyles";
import Head from "next/head";
import { renderMetaTags } from "react-datocms";

export default function LegalPage(props: GQL.TermsPageQuery) {
  const { termsPage, allMarketArticles, allFocusArticles, site } = props;
  const { classes } = useLayoutStyles();

  if (!termsPage?.title || !termsPage.lead) {
    return null;
  }
  const alternates = termsPage?._allSlugLocales?.map((loc) => ({
    href: "/terms-and-conditions",
    as: `/${loc.value}`,
    locale: loc.locale as string,
  }));
  return (
    <>
      <Head>{renderMetaTags([...termsPage.seo, ...site?.favicon])}</Head>
      <AppLayout
        alternates={alternates}
        allMarkets={allMarketArticles}
        allFocusArticles={allFocusArticles}
        showBackButton
      >
        <Hero title={termsPage.title} lead={termsPage.lead} showTitleLine={false} shiftedLeft />
        <GridContainer sx={{ mt: 4, mb: 8, position: "relative" }}>
          <div className={classes.aside} />
          <div className={classes.content}>
            {termsPage.content && <StructuredText data={termsPage.content} />}
          </div>
        </GridContainer>
      </AppLayout>
    </>
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
