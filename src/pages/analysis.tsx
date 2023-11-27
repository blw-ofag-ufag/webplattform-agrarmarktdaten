import { BlogpostGrid } from "@/components/BlogpostGrid";
import { Hero } from "@/components/hero";
import { AppLayout } from "@/components/layout";
import * as GQL from "@/graphql";
import { client } from "@/graphql";
import { useTheme } from "@mui/material";

export default function Analysis(props: GQL.AnalysisPageQuery) {
  const {
    analysisPage,
    allFocusArticles,
    allMarketArticles,
    marketSlug,
    focusSlug,
    dataSlug,
    infoSlug,
    legalSlug,
    methodsSlug,
    termsSlug,
  } = props;
  const theme = useTheme();
  if (!analysisPage?.title || !analysisPage?.lead) {
    return null;
  }

  const alternates = analysisPage?._allSlugLocales?.map((loc) => ({
    href: "/analysis",
    as: `/${loc.value}`,
    locale: loc.locale as string,
  }));
  return (
    <AppLayout
      alternates={alternates}
      allMarkets={allMarketArticles}
      allFocusArticles={allFocusArticles}
      marketSlug={marketSlug}
      focusSlug={focusSlug}
      analysisSlug={analysisPage}
      dataSlug={dataSlug}
      infoSlug={infoSlug}
      legalSlug={legalSlug}
      methodsSlug={methodsSlug}
      termsSlug={termsSlug}
    >
      <Hero
        title={analysisPage?.title}
        lead={analysisPage?.lead}
        bgColor={theme.palette.cobalt[100]}
      />
      <BlogpostGrid markets={allMarketArticles} focusArticles={allFocusArticles} />
    </AppLayout>
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
