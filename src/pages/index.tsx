import "isomorphic-unfetch";
import React from "react";
import { default as NextLink } from "next/link";
import { fetchCMS } from "../lib/cms-api";
import { Box, Card, Heading, Grid, Link } from "theme-ui";
import { Icon } from "../components/Icon";

export default ({
  allSimplePages,
  allMarketAreas
}: {
  allSimplePages: { slug: string; title: string }[];
  allMarketAreas: { slug: string; title: string; icon: string }[];
}) => (
  <Box>
    <ul>
      {allSimplePages.map(page => {
        return (
          <li key={page.slug}>
            <NextLink href="/[locale]/[slug]" as={`/de/${page.slug}`} passHref>
              <Link>{page.title}</Link>
            </NextLink>
          </li>
        );
      })}
    </ul>
    Market Areas
    <Grid
      as="ul"
      sx={{ listStyle: "none", m: 0, p: 0 }}
      width={[200, null, 192]}
    >
      {allMarketAreas.map(area => {
        return (
          <Box as="li" key={area.slug}>
            <NextLink
              href="/[locale]/area/[slug]"
              as={`/de/area/${area.slug}`}
              passHref
            >
              <Link>
                <Card>
                  <Icon icon={area.icon} />
                  <Heading>{area.title}</Heading>
                </Card>
              </Link>
            </NextLink>
          </Box>
        );
      })}
    </Grid>
  </Box>
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
