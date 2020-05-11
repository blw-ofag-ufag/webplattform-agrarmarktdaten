import {
  catalogs,
  ChartEditor,
  ConfiguratorStateProvider,
  I18nProvider,
  useLocale
} from "@interactivethings/visualize-app";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ThemeProvider } from "theme-ui";
import { Header } from "../../../components/header";
import { MarketArea } from "../../../domain/types";
import { fetchCMS } from "../../../lib/cms-api";
import { editorTheme } from "../../../theme-editor";
// import { Header } from "../../../components/layout";

import "core-js/modules/es.array.flat"
import "core-js/modules/es.array.flat-map"

export default ({ allMarketAreas }: { allMarketAreas: MarketArea[] }) => {
  const { query } = useRouter();

  const locale = useLocale();
  const chartId = query.chartId as string;

  return (
    <>
      {/* <Header
        alternates={[
          {
            href: "/[locale]/create/[chartId]",
            as: "/de/create/new",
            label: "de"
          },
          {
            href: "/[locale]/create/[chartId]",
            as: "/en/create/new",
            label: "en"
          }
        ]}
      ></Header> */}
      <Header allMarketAreas={allMarketAreas} />
      <I18nProvider catalogs={catalogs} language={locale}>
        <ThemeProvider theme={editorTheme}>
          <ConfiguratorStateProvider chartId={chartId}>
            <ChartEditor />
          </ConfiguratorStateProvider>
        </ThemeProvider>
      </I18nProvider>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context: $FixMe) => {
  const query = `
  query PageQuery($locale: SiteLocale!){
    allMarketAreas(locale: $locale, filter: {parent: {exists: false}}) {
      title
      icon
      slug
    }
  }
  `;
  const result = await fetchCMS(query, {
    variables: context.params,
    preview: context.preview
  });

  return {
    props: {
      locale: context.params?.locale || "en",
      chartId: context.params?.chartId || "new",
      ...result
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [
      "/de/create/new",
      "/en/create/new"
      // "/fr/create/new",
      // "/en/create/new"
    ]
  };
};
