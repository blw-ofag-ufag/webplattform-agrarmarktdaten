import { BlogpostGrid } from "@/components/BlogpostGrid";
import { Hero } from "@/components/hero";
import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql";
import Head from "next/head";
import { renderMetaTags } from "react-datocms";

export default function Analysis(props: GQL.AnalysisPageQuery) {
  const { analysisPage, allFocusArticles, allMarketArticles, allMethodsPages, glossaryPage, site } =
    props;
  if (!analysisPage?.title || !analysisPage?.lead) {
    return null;
  }

  const alternates = analysisPage?._allSlugLocales?.map((loc) => ({
    href: "/analysis",
    as: `/${loc.value}`,
    locale: loc.locale as string,
  }));
  return (
    <>
      <Head>{renderMetaTags([...analysisPage.seo, ...site?.favicon])}</Head>
      <AppLayout
        alternates={alternates}
        allMarkets={allMarketArticles}
        allFocusArticles={allFocusArticles}
        allMethodsPages={allMethodsPages}
        glossaryPage={glossaryPage}
      >
        <Hero title={analysisPage?.title} lead={analysisPage?.lead} />
        <BlogpostGrid markets={allMarketArticles} focusArticles={allFocusArticles} />
      </AppLayout>
    </>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.AnalysisPageQuery>(
      GQL.AnalysisPageDocument,
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
