import { client } from "@/graphql";
import * as GQL from "@/graphql";
import { Locale } from "@/locales/locales";
import { GetServerSideProps } from "next";
import { isValidLocale } from "@/locales/locales";

const DOMAIN = "https://www.agrimarketdata.ch";

interface Paths {
  locale: Locale;
  params: {
    slug: string;
  };
}

function generateSiteMap(blogposts: Paths[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${blogposts
        .map(({ locale, params: { slug } }) => {
          return `
        <url>
            <loc>${`${DOMAIN}/${locale}/blog/${slug}`}</loc>
            <xhtml:link rel="alternate" hreflang="${locale}" href="${`${DOMAIN}/${locale}/blog/${slug}`}"/>
        </url>
      `;
        })
        .join("")}
    </urlset>
`;
}

const SitemapXML: React.FC = () => {
  return null;
};

export default SitemapXML;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const result = await client
    .query<GQL.AllBlogPostsSlugLocalesQuery>(GQL.AllBlogPostsSlugLocalesDocument, {})
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  const paths = result.data.allBlogPosts.flatMap((page) => {
    return (
      page._allSlugLocales
        ?.filter((x) => isValidLocale(x.locale))!
        .map(
          (loc) =>
            ({
              locale: loc!.locale,
              params: { slug: loc!.value },
            }) as Paths
        ) ?? []
    );
  });

  const sitemap = generateSiteMap(paths);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};
