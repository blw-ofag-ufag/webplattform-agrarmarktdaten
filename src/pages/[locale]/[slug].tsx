import React from "react";
import Link from "next/link";
import { fetchCMS } from "../../lib/cms-api";

export default ({
  simplePage
}: {
  simplePage?: {
    title: string;
    body: string;
    _allSlugLocales: { locale: string; value: string }[];
  };
}) => {
  return simplePage ? (
    <div>
      <ul>
        {simplePage._allSlugLocales.map(loc => {
          return (
            <li key={loc.locale}>
              <Link href="/[locale]/[slug]" as={`/${loc.locale}/${loc.value}`}>
                <a rel="alternate" hrefLang={loc.locale}>
                  {loc.locale}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
      <article>
        <h1>{simplePage.title}</h1>
        {simplePage.body}
      </article>
    </div>
  ) : (
    <div>NOT FOUND</div>
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
  }
  `;

  const result = await fetchCMS(query, { variables: context.params });

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
    paths
  };
};
