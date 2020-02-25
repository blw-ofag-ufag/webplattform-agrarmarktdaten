import "isomorphic-unfetch";
import React from "react";
import Link from "next/link";
import { fetchCMS } from "../lib/cms-api";

export default ({
  allSimplePages
}: {
  allSimplePages: { slug: string; title: string }[];
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
  </div>
);

export const unstable_getStaticProps = async (context: $FixMe) => {
  const query = `
  query {
    allSimplePages {
      slug
      title
    }
  }
  `;

  const result = await fetchCMS(query, { preview: context.preview });

  return { props: { allSimplePages: result.allSimplePages } };
};
