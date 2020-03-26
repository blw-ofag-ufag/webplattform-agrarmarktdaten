import React from "react";
import Link from "next/link";
import { fetchCMS } from "../../lib/cms-api";
import { AppLayout } from "../../components/layout";
import { MarketArea } from "../../domain/types";

export default ({
  simplePage,
  allMarketAreas
}: {
  simplePage?: {
    title: string;
    body: string;
    _allSlugLocales: { locale: string; value: string }[];
  };
  allMarketAreas: MarketArea[];
}) => {
  const alternates = simplePage
    ? simplePage._allSlugLocales.map(loc => {
        return {
          href: "/[locale]/[slug]",
          as: `/${loc.locale}/${loc.value}`,
          label: loc.locale
        };
      })
    : undefined;

  return (
    <AppLayout alternates={alternates} allMarketAreas={allMarketAreas}>
      {simplePage ? (
        <div>
          <ul></ul>
          <article>
            <h1>{simplePage.title}</h1>
            {simplePage.body}
          </article>
        </div>
      ) : (
        <div>NOT FOUND</div>
      )}
    </AppLayout>
  );
};

export const getStaticProps = async (context: $FixMe) => {
  console.log(context);
  const query = `
  query PageQuery($locale: SiteLocale!, $slug: String!){
    simplePage(locale: $locale, filter: {slug: {eq: $slug}}) {
      title
      body
      _allSlugLocales {
        locale
        value
      }
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

  return { props: { simplePage: result.simplePage } };
};

export const getStaticPaths = async (context: $FixMe) => {
  const query = `
  query {
    allSimplePages {
      _allSlugLocales {
        locale
        value
      }
    }
  }
  `;

  const result = await fetchCMS(query);

  const paths = result.allSimplePages.flatMap((page: $FixMe) => {
    return page._allSlugLocales.map((loc: $FixMe) => ({
      params: { locale: loc.locale, slug: loc.value }
    }));
  });

  return {
    fallback: false,
    paths
  };
};
