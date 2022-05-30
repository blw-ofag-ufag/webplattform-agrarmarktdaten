import { GetStaticPaths } from "next";
import React from "react";

import { AppLayout } from "@/components/layout";
import { Market } from "@/domain/types";
import { fetchCMS } from "@/lib/cms-api";

export default function Page({
  simplePage,
  allMarkets,
}: {
  simplePage?: {
    title: string;
    body: string;
    _allSlugLocales: { locale: string; value: string }[];
  };
  allMarkets: Market[];
}) {
  const alternates = simplePage
    ? simplePage._allSlugLocales.map((loc) => {
        return {
          href: "/[slug]",
          as: `${loc.locale}/${loc.value}`,
          locale: loc.locale,
        };
      })
    : undefined;

  return (
    <AppLayout alternates={alternates} allMarkets={allMarkets}>
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
}

export const getStaticProps = async (context: $FixMe) => {
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

      allMarkets(locale: $locale) {
        name
        icon {
          url
        }
        slug
      }
    }
  `;

  const result = await fetchCMS(query, {
    variables: { locale: context.locale, slug: context.params.slug },
    preview: context.preview,
  });

  return { props: { simplePage: result.simplePage } };
};

export const getStaticPaths: GetStaticPaths = async () => {
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
      locale: loc.locale,
      params: { slug: loc.value },
    }));
  });

  return {
    fallback: false,
    paths,
  };
};
