import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql/api";
import { StructuredText } from "@/components/StructuredText";
import { GridContainer } from "@/components/Grid";
import { Hero } from "@/components/hero";
import { useLayoutStyles } from "@/components/useLayoutStyles";
import Head from "next/head";
import { renderMetaTags } from "react-datocms";

export default function AboutUsPage(props: GQL.AboutUsPageQuery) {
  const { aboutUsPage, allMarketArticles, allFocusArticles, allMethodsPages, site } = props;
  const { classes } = useLayoutStyles();

  if (!aboutUsPage?.title || !aboutUsPage.lead) {
    return null;
  }
  const alternates = aboutUsPage?._allSlugLocales?.map((loc) => ({
    href: "/about-us",
    as: `/${loc.value}`,
    locale: loc.locale as string,
  }));
  return (
    <>
      <Head>{renderMetaTags([...aboutUsPage.seo, ...site?.favicon])}</Head>
      <AppLayout
        alternates={alternates}
        allMarkets={allMarketArticles}
        allFocusArticles={allFocusArticles}
        allMethodsPages={allMethodsPages}
        showBackButton
      >
        <Hero title={aboutUsPage.title} lead={aboutUsPage.lead} showTitleLine={false} shiftedLeft />
        <GridContainer sx={{ mt: 4, mb: 8, position: "relative" }}>
          <div className={classes.aside} />
          <div className={classes.content}>
            {aboutUsPage.content && <StructuredText data={aboutUsPage.content} />}
          </div>
        </GridContainer>
      </AppLayout>
    </>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.AboutUsPageQuery>(
      GQL.AboutUsPageDocument,
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
