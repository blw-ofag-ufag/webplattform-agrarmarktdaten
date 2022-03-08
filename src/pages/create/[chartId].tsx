import {
  ChartEditor,
  ConfiguratorStateProvider,
  I18nProvider,
} from "@interactivethings/visualize-app";
// import { Header } from "../../../components/layout";
import "core-js/modules/es.array.flat";
import "core-js/modules/es.array.flat-map";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ThemeProvider } from "theme-ui";
import { Header } from "../../components/header";
import { MarketArea } from "../../domain/types";
import { fetchCMS } from "../../lib/cms-api";
import { useLocale } from "../../lib/use-locale";
import { i18n } from "../../locales/locales";
import { editorTheme } from "../../theme-editor";

export default function Create({
  allMarketAreas,
}: {
  allMarketAreas: MarketArea[];
}) {
  const { query } = useRouter();

  const locale = useLocale();
  const chartId = query.chartId as string;

  if (i18n.locale !== locale) {
    i18n.activate(locale);
  }

  return (
    <>
      {/* <Header
        alternates={[
          {
            href: "/create/[chartId]",
            as: "/create/new",
            label: "de"
          },
          {
            href: "/create/[chartId]",
            as: "/create/new",
            label: "en"
          }
        ]}
      ></Header> */}
      <Header allMarketAreas={allMarketAreas} />
      <I18nProvider i18n={i18n}>
        <ThemeProvider theme={editorTheme}>
          <ConfiguratorStateProvider chartId={chartId}>
            <ChartEditor />
          </ConfiguratorStateProvider>
        </ThemeProvider>
      </I18nProvider>
    </>
  );
}

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
    variables: { locale: context.locale },
    preview: context.preview,
  });

  return {
    props: {
      locale: context.locale,
      chartId: context.params?.chartId || "new",
      ...result,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [
      "/create/new",
      "/en/create/new",
      // "/fr/create/new",
      // "/en/create/new"
    ],
  };
};
