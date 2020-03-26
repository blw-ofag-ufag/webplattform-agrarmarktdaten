import {
  ChartEditor,
  ConfiguratorStateProvider,
  LocaleProvider,
  I18nProvider,
  catalogs,
  parseLocaleString,
  useLocale
} from "@interactivethings/visualize-app";
import { ThemeProvider } from "theme-ui";
import { editorTheme } from "../../../theme-editor";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { Header } from "../../../components/header";
// import { Header } from "../../../components/layout";

export default () => {
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
      <Header />
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: true,
    paths: [
      "/de/create/new",
      "/en/create/new",
      "/fr/create/new",
      "/en/create/new"
    ]
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      locale: params?.locale || "en",
      chartId: params?.chartId || "new"
    }
  };
};
