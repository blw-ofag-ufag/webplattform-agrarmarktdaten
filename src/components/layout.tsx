import {
  Footer,
  FooterSection,
  FooterSectionSocialMediaButton,
  FooterSectionSocialMediaButtonGroup,
  FooterSectionText,
  FooterSectionTitle,
  FooterSectionButton,
  Header,
  HeaderProps,
  LocaleSwitcher,
  Menu,
  MenuProps,
  c,
  s,
} from "@interactivethings/swiss-federal-ci";
import { useTheme } from "@mui/material/styles";
import { t } from "@lingui/macro";
import { Box, Link, useMediaQuery, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import SvgIcControlArrowRight from "@/icons/icons-jsx/control/IcControlArrowRight";
import { useStickyBox } from "react-sticky-box";
import { ScrollToTop } from "@/components/ScrollToTop";
import { GridContainer } from "@/components/Grid";
import * as GQL from "@/graphql";
import { locales } from "@/locales/locales";

import { BackButton } from "./back-button";

interface Props {
  children: React.ReactNode;
  allMarkets?: GQL.SimpleMarketArticleFragment[];
  allFocusArticles?: GQL.SimpleFocusArticleFragment[];
  alternates?: { href: string; as: string; locale: string }[];
  showBackButton?: boolean;
}

export const AppLayout = (props: Props) => {
  const { children, allMarkets, allFocusArticles, alternates, showBackButton = false } = props;
  const theme = useTheme();
  const router = useRouter();
  const stickyRef = useStickyBox({ offsetTop: 0 });
  const { headerSections, menuSections } = React.useMemo(() => {
    const menuSections: MenuProps["sections"] = [
      {
        title: "Home",
        href: "/",
      },
      {
        title: t({ id: "menu.markets", message: "Märkte" }),
        sections:
          allMarkets?.map((market) => {
            return {
              title: market.title as string,
              href: `/market/${market.slug}`,
            };
          }) ?? [],
      },
      {
        title: t({ id: "menu.focus", message: "Fokus" }),
        sections:
          allFocusArticles?.map((focus) => {
            return {
              title: focus.title as string,
              href: `/focus/${focus.slug}`,
            };
          }) ?? [],
      },
      { title: t({ id: "menu.analysis", message: "Analysis" }), href: "/analysis" },
      { title: "Data", href: "/data" },
      { title: "Methods", href: "/methods" },
    ];
    const headerSections: HeaderProps["sections"] = menuSections.map((d) => ({
      ...d,
      mobileOnly: true,
    }));

    return { headerSections, menuSections };
  }, [allMarkets, allFocusArticles]);

  const localeSwitcherProps = alternates
    ? {
        alternates: alternates.map((d) => ({
          locale: d.locale,
          pathname: d.href,
          href: d.as,
        })),
      }
    : {
        locales,
      };

  return (
    <Box position="relative" minHeight="100vh" display="flex" flexDirection="column">
      <LocaleSwitcher {...localeSwitcherProps} />
      <Box
        sx={{
          borderBottom: `1px solid ${c.monochrome[200]}`,
          [theme.breakpoints.up("lg")]: { display: "flex", justifyContent: "center" },
        }}
      >
        <GridContainer>
          <Header
            shortTitle="BLW"
            longTitle="Bundesamt für Landwirtschaft"
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
        <GridContainer>
          <Menu
            sx={{ borderBottom: "none", ml: "-12px" }}
            ContentWrapperProps={{
              sx: {
                px: "0!important",
                width: "100%",
                [theme.breakpoints.only("xxxl")]: { maxWidth: "1676px" },
                [theme.breakpoints.only("xxl")]: { maxWidth: "1544px" },
                [theme.breakpoints.only("xl")]: { paddingX: "64px" },
                [theme.breakpoints.only("lg")]: { paddingX: "48px" },
                [theme.breakpoints.only("md")]: { paddingX: "36px" },
                [theme.breakpoints.only("sm")]: { paddingX: "36px" },
                [theme.breakpoints.only("xs")]: { paddingX: "28px" },
                [theme.breakpoints.only("xxs")]: { paddingX: "20px" },
              },
            }}
            sections={menuSections}
          />
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
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "50px",
                [theme.breakpoints.only("xxxl")]: { maxWidth: "1676px" },
                [theme.breakpoints.only("xxl")]: { maxWidth: "1544px" },
                [theme.breakpoints.only("xl")]: { paddingX: "64px" },
                [theme.breakpoints.only("lg")]: { paddingX: "48px" },
                [theme.breakpoints.only("md")]: { paddingX: "36px" },
                [theme.breakpoints.only("sm")]: { paddingX: "36px" },
                [theme.breakpoints.only("xs")]: { paddingX: "28px" },
                [theme.breakpoints.only("xxs")]: { paddingX: "20px" },
              }}
            >
              <BackButton />
            </Box>
          </Box>
        )}
        {children}
      </Box>

      {router.pathname !== "/data" && (
        <div className="debug-warn">
          <FooterBLW />
          <ScrollToTop />
        </div>
      )}
    </Box>
  );
};

const FooterBLW = () => {
  const theme = useTheme();
  const { locale } = useRouter();
  const isXXlAndUp = useMediaQuery(theme.breakpoints.up("xxl"));
  return (
    <Footer
      ContentWrapperProps={{
        sx: {
          [theme.breakpoints.only("xxxl")]: { maxWidth: "1676px", px: "0!important" },
          [theme.breakpoints.only("xxl")]: { maxWidth: "1544px", px: "0!important" },
          [theme.breakpoints.only("xl")]: { paddingX: "64px" },
          [theme.breakpoints.only("lg")]: { paddingX: "48px" },
          [theme.breakpoints.only("md")]: { paddingX: "36px" },
          [theme.breakpoints.only("sm")]: { paddingX: "36px" },
          [theme.breakpoints.only("xs")]: { paddingX: "28px" },
          [theme.breakpoints.only("xxs")]: { paddingX: "20px" },
        },
      }}
      bottomLinks={[
        {
          title: t({ id: "footer.impressum", message: "Impressum" }),
          href: `https://www.blw.admin.ch/blw/${locale}/home/markt/marktbeobachtung.html`,
        },
        {
          title: t({ id: "footer.legal", message: "Rechtliche Grundlagen" }),
          external: false,
          href: `/${locale}/legal`,
        },
        {
          title: t({ id: "footer.about_us.label", message: "About Us" }),
          href: `https://www.blw.admin.ch/blw/${locale}/home.html`,
        },
        {
          title: t({ id: "footer.terms", message: "Terms and Conditions" }),
          external: false,
          href: `/${locale}/terms-and-conditions`,
        },
      ]}
      nCols={isXXlAndUp ? 4 : 3}
    >
      <FooterSection>
        <FooterSectionTitle title={t({ id: "footer.about_us.label", message: "About Us" })} />
        <FooterSectionText
          text={t({
            id: "footer.id",
            message:
              "The Federal Office for Agriculture FOAG is the Confederation's competence centre for all core issues relating to the agricultural sector. The FOAG is committed to ensuring that farmers produce high-quality food sustainably and with a focus on the market.",
          })}
        />
      </FooterSection>

      <FooterSection>
        <FooterSectionTitle title={t({ id: "contact.follow.us", message: "Folgen Sie Uns" })} />
        <FooterSectionSocialMediaButtonGroup>
          <FooterSectionSocialMediaButton type="twitter" href="https://twitter.com/CHblw" />
          <FooterSectionSocialMediaButton type="facebook" href="https://www.facebook.com/CHblw/" />
          <FooterSectionSocialMediaButton
            type="youtube"
            href="https://www.youtube.com/channel/UCK0IXZ5UU8WmZTd122LN79A?view_as=subscriber"
          />
          <FooterSectionSocialMediaButton
            type="instagram"
            href="https://www.instagram.com/blw_ofag_ufag/"
          />
          <FooterSectionSocialMediaButton
            type="linkedin"
            href="https://www.linkedin.com/company/federal-office-for-agriculture/"
          />
        </FooterSectionSocialMediaButtonGroup>
        <Box
          sx={{
            marginTop: s(10),
            display: "flex",
            bgcolor: c.cobalt[500],
            border: `${c.cobalt[50]} 1px solid`,
            width: "fit-content",
            px: s(5),
            py: s(2.5),
          }}
        >
          <Link href={`https://www.blw.admin.ch/blw/${locale}/home/services/newsletter.html`}>
            <Typography sx={{ mr: 2 }}>
              {t({
                id: "footer.newsletter",
                message: "Subscribe to newsletter",
              })}
            </Typography>
          </Link>
          <SvgIcControlArrowRight width="24px" height="24px" />
        </Box>
      </FooterSection>
      {isXXlAndUp ? (
        <>
          <FooterSection>
            <FooterSectionTitle
              title={t({
                id: "footer.furtherinformation",
                message: "Further Information",
              })}
            />
            <Link
              href={`https://www.blw.admin.ch/blw/${locale}/home.html`}
              target="_blank"
              sx={{ textDecoration: "none" }}
            >
              <FooterSectionButton
                iconName="external"
                label={t({ id: "footer.blw", message: "Bundesamt für Landwirtschaft" })}
              />
            </Link>
            <Link
              href={`https://2022.agrarbericht.ch/${locale}`}
              target="_blank"
              sx={{ textDecoration: "none" }}
            >
              <FooterSectionButton
                iconName="external"
                label={t({ id: "footer.report", message: "Agrarbericht" })}
              />
            </Link>
            <Link
              href={`https://www.bfs.admin.ch/bfs/${locale}/home/statistiken/preise/erhebungen/lik.html`}
              target="_blank"
              sx={{ textDecoration: "none" }}
            >
              <FooterSectionButton
                iconName="external"
                label={t({ id: "footer.priceindex", message: "Landesindex der Konsumentenpreise" })}
              />
            </Link>
            <Link
              href={`https://www.bfs.admin.ch/bfs/${locale}/home/statistiken/preise/produzentenpreise-importpreise.html`}
              target="_blank"
              sx={{ textDecoration: "none" }}
            >
              <FooterSectionButton
                iconName="external"
                label={t({
                  id: "footer.importpriceindex",
                  message: "Produzenten- und Importpreis-Index",
                })}
              />
            </Link>
          </FooterSection>
          <FooterSection>
            <FooterSectionTitle title="Feedback" />
            <Link
              href={`https://www.blw.admin.ch/blw/${locale}/home/markt/marktbeobachtung.html`}
              target="_blank"
            >
              <FooterSectionButton
                iconName="external"
                label={t({ id: "footer.feedback", message: "Feedback" })}
              />
            </Link>
          </FooterSection>
        </>
      ) : (
        <>
          <FooterSection
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: s(10),
              [theme.breakpoints.only("lg")]: {
                flexDirection: "row",
                justifyContent: "space-between",
              },
            }}
          >
            <Box sx={{ width: "100%" }}>
              <FooterSectionTitle
                title={t({
                  id: "footer.furtherinformation",
                  message: "Further Information",
                })}
              />
              <Link
                href={`https://www.blw.admin.ch/blw/${locale}/home.html`}
                target="_blank"
                sx={{ textDecoration: "none" }}
              >
                <FooterSectionButton
                  iconName="external"
                  label={t({ id: "footer.blw", message: "Bundesamt für Landwirtschaft" })}
                />
              </Link>
              <Link
                href={`https://2022.agrarbericht.ch/${locale}`}
                target="_blank"
                sx={{ textDecoration: "none" }}
              >
                <FooterSectionButton
                  iconName="external"
                  label={t({ id: "footer.report", message: "Agrarbericht" })}
                />
              </Link>
              <Link
                href={`https://www.bfs.admin.ch/bfs/${locale}/home/statistiken/preise/erhebungen/lik.html`}
                target="_blank"
                sx={{ textDecoration: "none" }}
              >
                <FooterSectionButton
                  iconName="external"
                  label={t({
                    id: "footer.priceindex",
                    message: "Landesindex der Konsumentenpreise",
                  })}
                />
              </Link>
              <Link
                href={`https://www.bfs.admin.ch/bfs/${locale}/home/statistiken/preise/produzentenpreise-importpreise.html`}
                target="_blank"
                sx={{ textDecoration: "none" }}
              >
                <FooterSectionButton
                  iconName="external"
                  label={t({
                    id: "footer.importpriceindex",
                    message: "Produzenten- und Importpreis-Index",
                  })}
                />
              </Link>
            </Box>
            <Box
              sx={{
                mt: s(10),
                width: "100%",
                [theme.breakpoints.only("lg")]: { mt: 0 },
                [theme.breakpoints.only("md")]: { mt: s(4) },
              }}
            >
              <FooterSectionTitle title="Feedback" />
              <Link
                href={`https://www.blw.admin.ch/blw/${locale}/home/markt/marktbeobachtung.html`}
                target="_blank"
              >
                <FooterSectionButton
                  iconName="external"
                  label={t({ id: "footer.feedback", message: "Feedback" })}
                />
              </Link>
            </Box>
          </FooterSection>
        </>
      )}
    </Footer>
  );
};
