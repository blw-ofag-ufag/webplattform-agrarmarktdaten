import { default as NextLink } from "next/link";
import React from "react";
import { Box, Card, Grid, Heading, Link } from "theme-ui";
import { Icon } from "../components/Icon";
import { AppLayout } from "../components/layout";
import { fetchCMS } from "../lib/cms-api";

export default ({
  allSimplePages,
  allMarketAreas
}: {
  allSimplePages: { slug: string; title: string }[];
  allMarketAreas: { slug: string; title: string; icon: string }[];
}) => (
  <AppLayout>
    {/* <ul>
      {allSimplePages.map(page => {
        return (
          <li key={page.slug}>
            <NextLink href="/[locale]/[slug]" as={`/de/${page.slug}`} passHref>
              <Link>{page.title}</Link>
            </NextLink>
          </li>
        );
      })}
    </ul> */}
    <h2>Market Areas</h2>
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
              <Card>
                <Icon icon={area.icon} />
                <Heading>
                  <Link>{area.title}</Link>
                </Heading>
              </Card>
            </NextLink>
          </Box>
        );
      })}
    </Grid>
  </AppLayout>
);

export const getStaticProps = async (context: $FixMe) => {
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
