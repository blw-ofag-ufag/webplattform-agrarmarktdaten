import {
  Header,
  HeaderProps,
  LocaleSwitcher,
  MenuProps,
  c,
  MenuContainer,
  MenuButton,
  LocaleSwitcherProps,
} from "@interactivethings/swiss-federal-ci";
import { useTheme } from "@mui/material/styles";
import { t } from "@lingui/macro";
import { Box, BoxProps } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useStickyBox } from "react-sticky-box";
import ScrollToTop from "@/components/ScrollToTop";
import { GridContainer } from "@/components/Grid";
import * as GQL from "@/graphql";
import { locales } from "@/locales/locales";
import { BackButton } from "./back-button";
import { makeContentWrapperSx } from "@/components/Grid/Grid";
import { makeStyles } from "@/components/style-utils";
import { Footer } from "@/components/Footer";
import { IcInfoCircle } from "@/icons/icons-jsx/control";
import slugs from "@/generated/slugs.json";
import { useInPlaceDialogStyles } from "@/components/InPlaceDialog";

interface Props {
  children: React.ReactNode;
  allMarkets?: GQL.SimpleMarketArticleFragment[];
  allFocusArticles?: GQL.SimpleFocusArticleFragment[];
  alternates?: { href: string; as: string; locale: string }[];
  showBackButton?: boolean;
}

const useStyles = makeStyles()({
  headerContainer: {
    zIndex: 10,
  },
  backButton: {
    position: "absolute",
    width: "100%",
    zIndex: 2,
    height: "50px",
    display: "flex",
    justifyContent: "center",
  },
});

// Forbid English for the moment
export const isAuthorizedLocale = (locale: string) => locale !== "en";

export const AppLayout = (props: Props) => {
  const { classes } = useStyles();
  const { children, allMarkets, allFocusArticles, alternates, showBackButton = false } = props;
  const theme = useTheme();
  const router = useRouter();
  const stickyRef = useStickyBox({ offsetTop: 0 });

  const localeSlugs = slugs.find(({ locale }) => locale === router.locale)?.slugs;

  const { headerSections, menuSections } = React.useMemo(() => {
    const marketSections =
      allMarkets
        ?.map((market) => ({
          title: market.title!,
          href: `/${localeSlugs?.market}/${market.slug}`,
        }))
        .sort((a, b) => a.title.localeCompare(b.title)) ?? [];
    const focusSections =
      allFocusArticles
        ?.map((focus) => ({ title: focus.title!, href: `/${localeSlugs?.focus}/${focus.slug}` }))
        .sort((a, b) => a.title.localeCompare(b.title)) ?? [];
    const menuSections: (MenuProps["sections"][number] & { desktop?: false })[] = [
      { title: "Home", href: "/" },
      { title: t({ id: "menu.markets", message: "Märkte" }), sections: marketSections },
      { title: t({ id: "menu.focus", message: "Fokus" }), sections: focusSections },
      { title: t({ id: "menu.analysis", message: "Analysis" }), href: `/${localeSlugs?.analysis}` },
      { title: t({ id: "menu.data", message: "Data" }), href: `/${localeSlugs?.data}` },
      { title: t({ id: "menu.methods", message: "Methods" }), href: `/${localeSlugs?.methods}` },
      {
        title: t({ id: "menu.info", message: "Info" }),
        href: `/${localeSlugs?.info}`,
        desktop: false,
      },
    ];
    const headerSections: HeaderProps["sections"] = menuSections.map((d) => ({
      ...d,
      mobileOnly: true,
    }));

    return { headerSections, menuSections };
  }, [allMarkets, allFocusArticles, localeSlugs]);

  const dynamicLocaleSwitcherProps: LocaleSwitcherProps = alternates
    ? {
        alternates: alternates
          .map((d) => ({ locale: d.locale, pathname: d.href, href: d.as }))
          .filter((x) => isAuthorizedLocale(x.locale)),
      }
    : {
        locales: locales.filter((x) => isAuthorizedLocale(x)),
      };

  /**
   * TODO Use className when https://github.com/interactivethings/swiss-federal-ci/pull/29
   * is merged.
   */
  const contentWrapperSx = makeContentWrapperSx(theme);
  const commonLocaleSwitcherProps: Pick<LocaleSwitcherProps, "ContentWrapperProps"> = {
    ContentWrapperProps: {
      sx: contentWrapperSx,
    },
  };

  const localeSwitcherProps = {
    ...commonLocaleSwitcherProps,
    ...dynamicLocaleSwitcherProps,
  };

  const { classes: inPlaceDialogClasses } = useInPlaceDialogStyles();

  return (
    <Box
      component="main"
      position="relative"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      maxHeight={router.pathname === "/data" ? "100vh" : undefined}
    >
      <div data-datocms-noindex>
        <LocaleSwitcher {...localeSwitcherProps} />
      </div>
      <Box
        data-datocms-noindex
        sx={{
          borderBottom: `1px solid ${c.monochrome[200]}`,
          [theme.breakpoints.up("lg")]: { display: "flex", justifyContent: "center" },
        }}
      >
        <Header
          closeLabel={t({ id: "header.close", message: "Close" })}
          shortTitle={t({ id: "header.shortTitle", message: "BLW" })}
          longTitle={t({ id: "header.longTitle", message: "Bundesamt für Landwirtschaft" })}
          rootHref="/"
          sections={headerSections}
          ContentWrapperProps={{ sx: contentWrapperSx }}
          sx={{ borderBottom: "none", px: 0, mx: 0 }}
        />
      </Box>
      <Box
        ref={stickyRef}
        data-datocms-noindex
        className={inPlaceDialogClasses.hideWhenOpened}
        sx={{
          borderBottom: `1px solid ${c.monochrome[200]}`,
          display: { xxs: "none", xs: "none", lg: "block" },
          backgroundColor: "white",
          zIndex: 10,
        }}
      >
        <MenuContainer
          closeLabel={t({ id: "header.close", message: "Close" })}
          ContentWrapperProps={{ sx: contentWrapperSx }}
        >
          {menuSections
            .filter((x) => x.desktop !== false)
            .map((section, i) => (
              <MenuButton key={i} {...section} />
            ))}
          <Box display="flex" flexGrow={1} />
          <MenuButton
            title={t({ id: "menu.info", message: "Info" })}
            href={`/${localeSlugs?.info}`}
            endIcon={
              <Box sx={{ ml: 1 }}>
                <IcInfoCircle fontSize={16} />
              </Box>
            }
          />
        </MenuContainer>
      </Box>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          minHeight: 0,
        }}
      >
        {showBackButton && (
          <div className={classes.backButton}>
            <GridContainer
              sx={{
                width: "100%",
                height: "50px",
              }}
              data-datocms-noindex
            >
              <BackButton />
            </GridContainer>
          </div>
        )}
        {children}
        {router.pathname !== "/data" ? <ScrollToTop /> : null}
      </Box>

      {router.pathname !== "/data" && (
        <div data-datocms-noindex>
          <Footer />
        </div>
      )}
    </Box>
  );
};

export const LayoutSections = (props: BoxProps) => {
  return (
    <Box
      {...props}
      sx={{
        bgcolor: "cobalt.50",
        pt: "5rem",
        pb: "92px",
        "& > * + *": { mt: "80px" },
      }}
    />
  );
};
