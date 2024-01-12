import { client } from "@/graphql";
import * as GQL from "@/graphql";
import { Locale } from "@/locales/locales";
import { GetServerSideProps } from "next";
import { isValidLocale } from "@/locales/locales";
import { domains, previewDomains, defaultLocale as fallbackLocale } from "@/locales/locales.json";

const getDomain = (locale: Locale) => {
  const currentDomain = process.env.VERCEL_ENV === "production" ? domains : previewDomains;
  const found = currentDomain.find(({ defaultLocale }) => defaultLocale === locale);
  return found
    ? found.domain
    : currentDomain.find(({ defaultLocale }) => defaultLocale === fallbackLocale)?.domain;
};

interface SimplePath {
  locale: Locale;
  url: string;
}

interface Paths {
  locale: Locale;
  params: {
    slug: string;
  };
}

interface Props {
  blogposts: Paths[];
  marketArticles: SimplePath[];
}

function generateSiteMap(props: Props) {
  const { blogposts, marketArticles } = props;
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${blogposts
        .map(({ locale, params: { slug } }) => {
          const domain = getDomain(locale);
          return `
        <url>
            <loc>${`https://${domain}/blog/${slug}`}</loc>
            <xhtml:link rel="alternate" hreflang="${locale}" href="${`https://${domain}/blog/${slug}`}"/>
        </url>
      `;
        })
        .join("")}
      ${generateSimplePath(marketArticles)}
    </urlset>
`;
}

function generateSimplePath(paths: SimplePath[]) {
  return paths
    .map(({ locale, url }) => {
      const domain = getDomain(locale);
      return `
        <url>
            <loc>${`https://${domain}/${url}`}</loc>
            <xhtml:link rel="alternate" hreflang="${locale}" href="${`https://${domain}/${url}`}"/>
        </url>
      `;
    })
    .join("");
}

const SitemapXML: React.FC = () => {
  return null;
};

export default SitemapXML;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const result = await client.query<GQL.SiteMapQuery>(GQL.SiteMapDocument, {}).toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  const blogposts = result.data.allBlogPosts.flatMap((page) => {
    return (
      page._allSlugLocales
        ?.filter((x) => isValidLocale(x.locale))!
        .map((loc) => ({ locale: loc!.locale, params: { slug: loc!.value } }) as Paths) ?? []
    );
  });

  const marketArticles = result.data.allMarketArticles.flatMap((page) => {
    return (
      page._allSlugLocales
        ?.filter((x) => isValidLocale(x.locale))!
        .map((loc) => ({ locale: loc!.locale, params: { slug: loc!.value } }) as Paths) ?? []
    );
  });

  const markets = result.data.market?._allSlugLocales
    ?.filter((x) => isValidLocale(x.locale))
    ?.reduce((acc, loc) => ({ ...acc, [loc.locale! as Locale]: loc.value }), {}) as Record<
    Locale,
    string
  >;

  const consolidatedMarkets = marketArticles.map(({ locale, params }) => ({
    locale: locale,
    url: `${markets[locale]}/${params.slug}`,
  })) as SimplePath[];

  const sitemap = generateSiteMap({ blogposts, marketArticles: consolidatedMarkets });

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};
