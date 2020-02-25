import React from "react";
import Link from "next/link";
import { fetchCMS } from "../../../lib/cms-api";

export default ({
  marketArea
}: {
  marketArea?: {
    title: string;
    icon: string;
    reports: { title: string; url: string }[];
    _allSlugLocales: { locale: string; value: string }[];
  };
}) => {
  return marketArea ? (
    <div>
      <ul>
        {marketArea._allSlugLocales.map(loc => {
          return (
            <li key={loc.locale}>
              <Link
                href="/[locale]/area/[slug]"
                as={`/${loc.locale}/area/${loc.value}`}
              >
                <a rel="alternate" hrefLang={loc.locale}>
                  {loc.locale}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
      <article>
        <h1>{marketArea.title}</h1>
        {marketArea.icon}
        <h2>Reports</h2>
        {marketArea.reports.map(report => (
          <div key={report.title}>{report.title}</div>
        ))}
      </article>
    </div>
  ) : (
    <div>NOT FOUND</div>
  );
};

export const unstable_getStaticProps = async (context: $FixMe) => {
  console.log(context);
  const query = `
  query PageQuery($locale: SiteLocale!, $slug: String!){
    marketArea(locale: $locale, filter: {slug: {eq: $slug}}) {
      title
      icon
      reports {
        title
        url
      }
      _allSlugLocales {
        locale
        value
      }
    }
  }
  `;

  const result = await fetchCMS(query, { variables: context.params });

  return { props: { marketArea: result.marketArea } };
};

export const unstable_getStaticPaths = async (context: $FixMe) => {
  const query = `
  query {
    allMarketAreas {
      _allSlugLocales {
        locale
        value
      }
    }
  }
  `;

  const result = await fetchCMS(query);

  const paths = result.allMarketAreas.flatMap((page: $FixMe) => {
    return page._allSlugLocales.map((loc: $FixMe) => ({
      params: { locale: loc.locale, slug: loc.value }
    }));
  });

  return {
    paths
  };
};
