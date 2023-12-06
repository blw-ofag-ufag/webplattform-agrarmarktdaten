import { client } from "@/graphql/api";
import * as GQL from "@/graphql";
import { AppLayout } from "@/components/layout";
import { Box, Typography, Link } from "@mui/material";
import NextLink from "next/link";
import { makeStyles } from "@/components/style-utils";

const messages = [
  {
    locale: "de",
    title: "Diese Seite wurde nicht gefunden.",
    link: "Zurück zur Startseite",
  },
  {
    locale: "fr",
    title: "Cette page est introuvable.",
    link: "Retour à la page d'accueil",
  },
  {
    locale: "it",
    title: "Questa pagina non è stata trovata.",
    link: "Torna alla pagina iniziale",
  },
  // {
  //   locale: "en",
  //   title: "This page could not be found.",
  //   link: "Back to Homepage",
  // },
];

const useStyles = makeStyles()(({ spacing }) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    paddingBlock: "135px",
    gap: spacing(10),
  },
  message: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: spacing(5),
  },
  link: {
    textDecoration: "underline",
  },
}));

export default function Custom404(props: GQL.ErrorPageQuery) {
  const { allMarketArticles, allFocusArticles } = props;
  const { classes } = useStyles();
  return (
    <AppLayout allMarkets={allMarketArticles} allFocusArticles={allFocusArticles}>
      <Box className={classes.wrapper}>
        {messages.map(({ title, locale, link }) => {
          return (
            <Box key={locale} className={classes.message}>
              <Typography variant="h2">{title}</Typography>
              <NextLink href="/" locale={locale} passHref legacyBehavior>
                <Link>
                  <Typography variant="body1" className={classes.link}>
                    {link}
                  </Typography>
                </Link>
              </NextLink>
            </Box>
          );
        })}
      </Box>
    </AppLayout>
  );
}

export const getStaticProps = async (context: $FixMe) => {
  const result = await client
    .query<GQL.ErrorPageQuery>(
      GQL.ErrorPageDocument,
      { locale: context.locale },
      { requestPolicy: "network-only" }
    )
    .toPromise();

  if (!result.data) {
    console.error(result.error?.toString());
    throw new Error("Failed to fetch API");
  }

  return { props: result.data, revalidate: 10 };
};
