import { default as NextLink } from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Box, Card, Heading, Link, Grid } from "theme-ui";
import { Icon } from "../../../components/Icon";
import { fetchCMS } from "../../../lib/cms-api";

export default ({
  marketArea
}: {
  marketArea?: {
    title: string;
    icon: string;
    reports: { title: string; url: string }[];
    children: { title: string; icon: string; slug: string }[];
    _allSlugLocales: { locale: string; value: string }[];
  };
}) => {
  const {
    query: { locale }
  } = useRouter();

  return marketArea ? (
    <div>
      <ul>
        {marketArea._allSlugLocales.map(loc => {
          return (
            <li key={loc.locale}>
              <NextLink
                href="/[locale]/area/[slug]"
                as={`/${loc.locale}/area/${loc.value}`}
              >
                <Link rel="alternate" hrefLang={loc.locale}>
                  {loc.locale}
                </Link>
              </NextLink>
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
        <h2>Sub-Areas</h2>
        <Grid
          as="ul"
          sx={{ listStyle: "none", m: 0, p: 0 }}
          width={[200, null, 192]}
        >
          {marketArea.children.map(area => (
            <Box as="li" key={area.slug}>
              <NextLink
                href="/[locale]/area/[slug]"
                as={`/${locale}/area/${area.slug}`}
                passHref
              >
                <Card>
                  <Icon icon={area.icon} />
                  <Heading>
                    <Link>{area.title}</Link>
                  </Heading>
                </Card>
              </NextLink>
            </Box>
          ))}
        </Grid>
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
      children {
        title
        icon
        slug
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
