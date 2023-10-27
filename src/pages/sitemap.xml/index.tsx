import { client } from "@/graphql";
import * as GQL from "@/graphql";
import { Locale } from "@/locales/locales";
import { GetServerSideProps } from "next";

const DOMAIN = "https://blw-agricultural-market-data-platform.vercel.app";

interface Paths {
  locale: Locale;
  params: {
    slug: string;
  };
}

function generateSiteMap(blogposts: Paths[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${blogposts
        .map(({ locale, params: { slug } }) => {
          return `
        <url>
            <loc>${`${DOMAIN}/${locale}/blog/${slug}`}</loc>
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
    return page._allSlugLocales!.map(
      (loc) =>
        ({
          locale: loc!.locale,
          params: { slug: loc!.value },
        }) as Paths
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
