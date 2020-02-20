import "isomorphic-unfetch";
import React from "react";
import Link from "next/link";

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
            <Link href={`/de/${page.slug}`}>
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

  return { props: { allSimplePages: result.data.allSimplePages } };
};
