import * as GQL from "@/graphql";
import { AppLayout } from "@/components/layout";
import { Box, Typography, Link } from "@mui/material";
import NextLink from "next/link";
import { makeStyles } from "@/components/style-utils";
import { GridContainer } from "@/components/Grid";
import { Trans } from "@lingui/macro";

const useStyles = makeStyles()(({ spacing, palette, breakpoints }) => ({
  centered: {
    marginTop: "80px",
    marginBottom: "400px",
    display: "flex",
    flexDirection: "column",
    gap: spacing(6),
    [breakpoints.up("xl")]: {
      marginInline: "calc(var(--BLWGrid-columnGutterWidth) * 3 + var(--BLWGrid-columnWidth) * 3)",
    },
  },
  link: {
    color: palette.red[600],
    "&:hover": {
      color: palette.red[800],
    },
  },
}));

export default function NotFoundError(props: GQL.ErrorPageQuery) {
  const { allMarketArticles, allFocusArticles, allMethodsPages } = props;
  const { classes } = useStyles();
  return (
    <AppLayout
      allMarkets={allMarketArticles}
      allFocusArticles={allFocusArticles}
      allMethodsPages={allMethodsPages}
    >
      <GridContainer>
        <Box className={classes.centered}>
          <Typography variant="h1">
            <Trans id="error.404.title">Page not found</Trans>
          </Typography>
          <Typography variant="h3" style={{ fontWeight: 400 }}>
            <Trans id="error.404.subtitle">Error 404</Trans>
          </Typography>
          <Typography variant="h3" style={{ fontWeight: 400 }}>
            <Trans id="error.404.message">
              You may have entered an incorrect address (URL), or the page or document no longer
              exists or its name may have been changed. The page you requested could not be found.
            </Trans>
          </Typography>
          <Typography variant="h3" style={{ fontWeight: 400 }}>
            <NextLink href="/" passHref legacyBehavior>
              <Link variant="body1" className={classes.link}>
                <Trans id="error.404.link">Return to the home page</Trans>
              </Link>
            </NextLink>
          </Typography>
        </Box>
      </GridContainer>
    </AppLayout>
  );
}
