import { GetStaticPaths } from "next";
import React from "react";
import { Banner } from "../../components/banner";
import { AppLayout } from "../../components/layout";
import { fetchCMS } from "../../lib/cms-api";
import { MarketArea } from "../../domain/types";

export default ({
  aboutPage,
  allMarketAreas
}: {
  aboutPage: { title: string; introduction: string };
  allMarketAreas: MarketArea[];
}) => {
  return (
    <AppLayout allMarketAreas={allMarketAreas}>
      <Banner title={aboutPage.title} intro={aboutPage.introduction} />
    </AppLayout>
  );
};

export const getStaticProps = async (context: $FixMe) => {
  const query = `
  query PageQuery($locale: SiteLocale!){
    aboutPage(locale: $locale) {
      title
      introduction
    }
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

  return { props: result };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `
  query {
    aboutPage {
      _allTitleLocales {
        locale
      }
    }
  }
  `;

  const result = await fetchCMS(query);

  const paths = result.aboutPage._allTitleLocales.map(
    (loc: { locale: "de" | "en" }) => ({
      params: { locale: loc.locale }
    })
  );

  return {
    fallback: false,
    paths
  };
};
