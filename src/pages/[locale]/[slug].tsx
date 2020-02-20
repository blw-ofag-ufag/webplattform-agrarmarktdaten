import "isomorphic-unfetch";
import React from "react";
import Link from "next/link";

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

export const unstable_getStaticProps = async (context: $FixMe) => {
  console.log(context);
  const query = `
  query {
    simplePage(locale: ${context.params.locale}, filter: {slug: {eq: "${context.params.slug}"}}) {
      title
      body
      _allSlugLocales {
        locale
        value
      }
    }
  }
  `;

  const token = "880654d6951b0e08722848ff6881c9";

  const result = await fetch("https://graphql.datocms.com/preview", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      query
    })
  }).then(res => res.json());

  return { props: { simplePage: result.data.simplePage } };
};

export const unstable_getStaticPaths = async (context: $FixMe) => {
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

  const token = "880654d6951b0e08722848ff6881c9";

  const result = await fetch("https://graphql.datocms.com/preview", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      query
    })
  }).then(res => res.json());

  const paths = result.data.allSimplePages.flatMap((page: $FixMe) => {
    return page._allSlugLocales.map((loc: $FixMe) => ({
      params: { locale: loc.locale, slug: loc.value }
    }));
  });

  return {
    paths
  };
};
