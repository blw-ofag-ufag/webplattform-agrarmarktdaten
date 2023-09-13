import {
  Footer,
  FooterSection,
  FooterSectionSocialMediaButton,
  FooterSectionSocialMediaButtonGroup,
  FooterSectionText,
  FooterSectionTitle,
  Header,
  HeaderProps,
  LocaleSwitcher,
  Menu,
  MenuProps,
} from "@interactivethings/swiss-federal-ci";
import { t } from "@lingui/macro";
import { Box, Link } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import * as GQL from "@/graphql";
import { locales } from "@/locales/locales";

import { BackButton } from "./back-button";

export const AppLayout = ({
  children,
  allMarkets,
  alternates,
}: {
  children: React.ReactNode;
  allMarkets?: GQL.SimpleMarketArticleFragment[];
  alternates?: { href: string; as: string; locale: string }[];
}) => {
  const router = useRouter();
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
    ];
    const headerSections: HeaderProps["sections"] = menuSections.map((d) => ({
      ...d,
      mobileOnly: true,
    }));

    return { headerSections, menuSections };
  }, [allMarkets]);

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
      <Header
        shortTitle="BLW"
        longTitle="Bundesamt für Landwirtschaft"
        rootHref="/"
        sections={headerSections}
      />
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <Menu sections={menuSections} />
      </Box>
      <Box
        sx={{
          mt: [0, 0, "92px"],
          mb: "92px",
          overflow: "auto",
          position: "relative",
        }}
      >
        {router.pathname !== "/" ? <BackButton /> : null}
        {children}
      </Box>
      <Footer
        bottomLinks={[
          {
            title: t({
              id: "footer.impressum",
              message: "Impressum",
            }),
            href: "",
          },
          {
            title: t({
              id: "footer.legal",
              message: "Rechtliche Grundlagen",
            }),
            href: "",
          },
          {
            title: t({
              id: "footer.dataprotection",
              message: "Datenschutzverordnung",
            }),
            href: "",
          },
        ]}
      >
        <FooterSection>
          <FooterSectionTitle
            title={t({ id: "contact.contact", message: "Kontakt" })}
          />
          <FooterSectionText text="Bundesamt für Landwirtschaft BLW" />
          <FooterSectionText text="Fachbereich Marktanalysen" />
          <FooterSectionText text="3003 Bern" />
          <Link
            href="https://www.blw.admin.ch/blw/de/home.html"
            target="_blank"
          >
            <FooterSectionText text="www.blw.admin.ch" />
          </Link>
        </FooterSection>
        <FooterSection>
          <FooterSectionTitle
            title={t({ id: "contact.follow.us", message: "Folgen Sie Uns" })}
          />
          <FooterSectionSocialMediaButtonGroup>
            <FooterSectionSocialMediaButton type="facebook" href="/" />
            <FooterSectionSocialMediaButton type="twitter" href="/" />
            <FooterSectionSocialMediaButton type="youtube" href="/" />
          </FooterSectionSocialMediaButtonGroup>
        </FooterSection>
      </Footer>
    </>
  );
};
