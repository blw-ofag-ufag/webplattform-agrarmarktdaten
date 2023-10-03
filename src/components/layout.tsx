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
  b,
} from "@interactivethings/swiss-federal-ci";
import { t } from "@lingui/macro";
import { Box, Link, useMediaQuery, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import SvgIcControlArrowRight from "@/icons/icons-jsx/control/IcControlArrowRight";
import { useStickyBox } from "react-sticky-box";

import * as GQL from "@/graphql";
import { locales } from "@/locales/locales";

import { BackButton } from "./back-button";

interface Props {
  children: React.ReactNode;
  allMarkets?: GQL.SimpleMarketArticleFragment[];
  allFocusArticles?: GQL.SimpleFocusArticleFragment[];
  alternates?: { href: string; as: string; locale: string }[];
}

export const AppLayout = ({ children, allMarkets, allFocusArticles, alternates }: Props) => {
  const router = useRouter();
  const isXXlAndUp = useMediaQuery(b.up("xxl"));
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
      { title: "Analysis", href: "/analysis" },
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
    <>
      <LocaleSwitcher {...localeSwitcherProps} />
      <Box sx={{ borderBottom: `1px solid ${c.monochrome[200]}` }}>
        <Box sx={{ maxWidth: "1920px", margin: "0 auto" }}>
          <Header
            shortTitle="BLW"
            longTitle="Bundesamt für Landwirtschaft"
            rootHref="/"
            sections={headerSections}
            sx={{ borderBottom: "none" }}
          />
        </Box>
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
        <Box sx={{ maxWidth: "1920px", margin: "0 auto" }}>
          <Menu sx={{ borderBottom: "none" }} sections={menuSections} />
        </Box>
      </Box>
      <Box sx={{ mb: "92px", position: "relative" }}>
        {router.pathname !== "/" ? <BackButton /> : null}
        {children}
      </Box>
      <Footer
        ContentWrapperProps={{ sx: { maxWidth: "1920px" } }}
        bottomLinks={[
          {
            title: t({ id: "footer.impressum", message: "Impressum" }),
            href: "",
          },
          {
            title: t({ id: "footer.legal", message: "Rechtliche Grundlagen" }),
            href: "/legal",
          },
          {
            title: t({ id: "footer.about_us.label", message: "About Us" }),
            href: "#",
          },
          {
            title: t({ id: "footer.terms", message: "Terms and Conditions" }),
            href: "/terms-and-conditions",
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
            <FooterSectionSocialMediaButton type="twitter" href="https://www.twitter.com" />
            <FooterSectionSocialMediaButton type="facebook" href="https://www.facebook.com" />
            <FooterSectionSocialMediaButton type="youtube" href="https://www.youtube.com" />
            <FooterSectionSocialMediaButton type="instagram" href="https://www.instagram.com" />
            <FooterSectionSocialMediaButton type="linkedin" href="https://www.linkedin.com" />
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
            <Link href="https://www.blw.admin.ch/blw/de/home/services/newsletter.html">
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
              <Link href="https://www.blw.admin.ch/blw/de/home.html" sx={{ textDecoration: "none" }}>
                <FooterSectionButton label="Bundesamt für Landwirtschaft" />
              </Link>
              <Link href="https://2022.agrarbericht.ch/de" sx={{ textDecoration: "none" }}>
                <FooterSectionButton label="Agrarbericht" />
              </Link>
              <Link
                href="https://www.bfs.admin.ch/bfs/de/home/statistiken/preise/erhebungen/lik.html"
                sx={{ textDecoration: "none" }}
              >
                <FooterSectionButton label="Landesindex der Konsumentenpreise" />
              </Link>
              <Link
                href="https://www.bfs.admin.ch/bfs/de/home/statistiken/preise/produzentenpreise-importpreise.html"
                sx={{ textDecoration: "none" }}
              >
                <FooterSectionButton label="Produzenten- und Importpreis-Index" />
              </Link>
            </FooterSection>
            <FooterSection>
              <FooterSectionTitle title="Feedback" />
              <Link href="https://www.blw.admin.ch/blw/de/home.html" target="_blank">
                <FooterSectionButton label="Feedback" />
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
                [b.only("lg")]: {
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
                <Link href="https://www.blw.admin.ch/blw/de/home.html" sx={{ textDecoration: "none" }}>
                  <FooterSectionButton label="Bundesamt für Landwirtschaft" />
                </Link>
                <Link href="https://2022.agrarbericht.ch/de" sx={{ textDecoration: "none" }}>
                  <FooterSectionButton label="Agrarbericht" />
                </Link>
                <Link
                  href="https://www.bfs.admin.ch/bfs/de/home/statistiken/preise/erhebungen/lik.html"
                  sx={{ textDecoration: "none", textAlign: "left" }}
                >
                  <FooterSectionButton label="Landesindex der Konsumentenpreise" />
                </Link>
                <Link
                  href="https://www.bfs.admin.ch/bfs/de/home/statistiken/preise/produzentenpreise-importpreise.html"
                  sx={{ textDecoration: "none" }}
                >
                  <FooterSectionButton label="Produzenten- und Importpreis-Index" />
                </Link>
              </Box>
              <Box
                sx={{
                  mt: s(10),
                  width: "100%",
                  [b.only("lg")]: { mt: 0 },
                  [b.only("md")]: { mt: s(4) },
                }}
              >
                <FooterSectionTitle title="Feedback" />
                <Link href="https://www.blw.admin.ch/blw/de/home.html" target="_blank">
                  <FooterSectionButton label="Kontakt" />
                </Link>
              </Box>
            </FooterSection>
          </>
        )}
      </Footer>
    </>
  );
};
