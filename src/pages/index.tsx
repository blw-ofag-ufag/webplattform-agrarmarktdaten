import "isomorphic-unfetch";
import React from "react";
import Link from "next/link";
import { fetchCMS } from "../lib/cms-api";

export default ({
  allSimplePages,
  allMarketAreas
}: {
  allSimplePages: { slug: string; title: string }[];
  allMarketAreas: { slug: string; title: string; icon: string }[];
}) => (
  <div>
    Hello
    <ul>
      {allSimplePages.map(page => {
        return (
          <li key={page.slug}>
            <Link href="/[locale]/[slug]" as={`/de/${page.slug}`}>
              <a>{page.title}</a>
            </Link>
          </li>
        );
      })}
    </ul>
    Market Areas
    <ul>
      {allMarketAreas.map(page => {
        return (
          <li key={page.slug}>
            <Link href="/[locale]/area/[slug]" as={`/de/area/${page.slug}`}>
              <a>{page.title}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
);

export const unstable_getStaticProps = async (context: $FixMe) => {
  const query = `
  query {
    allSimplePages {
      slug
      title
    }
    allMarketAreas(filter: {parent: {exists: false}}) {
      title
      icon
      slug
    }
  }
  `;

  const result = await fetchCMS(query, { preview: context.preview });

  return { props: result };
};
