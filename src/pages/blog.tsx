import { Box, Typography } from "@mui/material";
import React from "react";

import { AppLayout } from "@/components/layout";
import { fetchCMS } from "@/lib/cms-api";

type BlogProps = {
  blogPage: {
    title: string;
    description: string;
  };
};

export default function Blog(props: BlogProps) {
  const {
    blogPage: { title, description },
  } = props;

  return (
    <AppLayout>
      <Box>
        <Typography variant="h1">{title}</Typography>
        <Typography variant="subtitle1">{description}</Typography>
      </Box>
    </AppLayout>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const query = `
    query BlogPageQuery($locale: SiteLocale!) {
      blogPage (locale: $locale) {
        title
        description
      }
    }
  `;

  const result = await fetchCMS(query, {
    variables: { locale: context.locale },
    preview: context.preview,
  });

  return { props: result };
};
