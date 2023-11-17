import {
  Header,
  HeaderProps,
  LocaleSwitcher,
  MenuProps,
  c,
  MenuContainer,
  MenuButton,
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
import { vars } from "@/components/Grid/Grid";
import { makeStyles } from "@/components/style-utils";
import { Footer } from "@/components/Footer";
import { IcInfoCircle } from "@/icons/icons-jsx/control";

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

  const { headerSections, menuSections } = React.useMemo(() => {
    const marketSections =
      allMarkets
        ?.map((market) => ({ title: market.title!, href: `/market/${market.slug}` }))
        .sort((a, b) => a.title.localeCompare(b.title)) ?? [];
    const focusSections =
      allFocusArticles
        ?.map((focus) => ({ title: focus.title!, href: `/focus/${focus.slug}` }))
        .sort((a, b) => a.title.localeCompare(b.title)) ?? [];
    const menuSections: (MenuProps["sections"][number] & { desktop?: false })[] = [
      { title: "Home", href: "/" },
      { title: t({ id: "menu.markets", message: "Märkte" }), sections: marketSections },
      { title: t({ id: "menu.focus", message: "Fokus" }), sections: focusSections },
      { title: t({ id: "menu.analysis", message: "Analysis" }), href: "/analysis" },
      { title: t({ id: "menu.data", message: "Data" }), href: "/data" },
      { title: t({ id: "menu.methods", message: "Methods" }), href: "/methods" },
      { title: t({ id: "menu.info", message: "Info" }), href: "/info", desktop: false },
    ];
    const headerSections: HeaderProps["sections"] = menuSections.map((d) => ({
      ...d,
      mobileOnly: true,
    }));

    return { headerSections, menuSections };
  }, [allMarkets, allFocusArticles]);

  const localeSwitcherProps = alternates
    ? {
        alternates: alternates
          .map((d) => ({ locale: d.locale, pathname: d.href, href: d.as }))
          .filter((x) => isAuthorizedLocale(x.locale)),
      }
    : {
        locales: locales.filter((x) => isAuthorizedLocale(x)),
      };

  return (
    <Box
      component="main"
      position="relative"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
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
        <GridContainer disableItemMargin className={classes.headerContainer}>
          <Header
            closeLabel={t({ id: "header.close", message: "Close" })}
            shortTitle={t({ id: "header.shortTitle", message: "BLW" })}
            longTitle={t({ id: "header.longTitle", message: "Bundesamt für Landwirtschaft" })}
            rootHref="/"
            sections={headerSections}
            ContentWrapperProps={{ sx: { px: "0!important" } }}
            sx={{ borderBottom: "none", px: 0, mx: 0 }}
          />
        </GridContainer>
      </Box>
      <Box
        ref={stickyRef}
        sx={{
          borderBottom: `1px solid ${c.monochrome[200]}`,
          display: { xxs: "none", xs: "none", lg: "block" },
          backgroundColor: "white",
          zIndex: 10,
        }}
      >
        <GridContainer data-datocms-noindex>
          <MenuContainer
            sx={{ borderBottom: "none", ml: "-12px" }}
            closeLabel={t({ id: "header.close", message: "Close" })}
            ContentWrapperProps={{
              sx: {
                px: "0!important",
                width: "100%",
                [theme.breakpoints.down("xl")]: { paddingX: `var(${vars.offset})` },
              },
            }}
          >
            {menuSections
              .filter((x) => x.desktop !== false)
              .map((section, i) => (
                <MenuButton key={i} {...section} />
              ))}
            <Box display="flex" flexGrow={1} />
            <MenuButton
              title={t({ id: "menu.info", message: "Info" })}
              href="/info"
              endIcon={
                <Box sx={{ ml: 1 }}>
                  <IcInfoCircle fontSize={16} />
                </Box>
              }
            />
          </MenuContainer>
        </GridContainer>
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
