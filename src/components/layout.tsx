import {
  Header,
  LocaleSwitcher,
  Menu,
} from "@interactivethings/swiss-federal-ci";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import { Footer } from "@/components/footer";
import * as GQL from "@/graphql";
import { locales } from "@/locales/locales";

import { BackButton } from "./back-button";

export const AppLayout = ({
  children,
  allMarkets,
  alternates,
}: {
  children: React.ReactNode;
  allMarkets?: GQL.MarketRecord[];
  alternates?: { href: string; as: string; locale: string }[];
}) => {
  const router = useRouter();
  const { headerSections, menuSections } = React.useMemo(() => {
    const menuSections =
      allMarkets?.map((market) => {
        return {
          title: market.title as string,
          // FIXME - the slug is also localized
          href: `/market/${market.slug}`,
        };
      }) ?? [];
    const headerSections = menuSections.map((d) => ({
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
    : { locales };

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
      <Box sx={{ mt: [0, 0, "92px"], overflow: "auto", position: "relative" }}>
        {router.pathname !== "/" ? <BackButton /> : null}
        {children}
      </Box>
      <Footer />
    </>
  );
};
