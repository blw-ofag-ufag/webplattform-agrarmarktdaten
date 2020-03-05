import {
  ChartEditor,
  ConfiguratorStateProvider,
  LocaleProvider,
  I18nProvider,
  catalogs,
  parseLocaleString
} from "@interactivethings/visualize-app";
import { ThemeProvider } from "theme-ui";
import { editorTheme } from "../../../theme-editor";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";

export default () => {
  const { query } = useRouter();

  const locale = parseLocaleString(query.locale as string);

  const chartId = query.chartId as string;

  return (
    <LocaleProvider value={locale}>
      <I18nProvider catalogs={catalogs} language={locale}>
        <ThemeProvider theme={editorTheme}>
          <ConfiguratorStateProvider chartId={chartId}>
            <ChartEditor />
          </ConfiguratorStateProvider>
        </ThemeProvider>
      </I18nProvider>
    </LocaleProvider>
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
