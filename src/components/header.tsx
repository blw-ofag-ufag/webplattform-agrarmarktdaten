import { Trans } from "@lingui/macro";
import { Box, Button, Flex, Link, Text } from "@theme-ui/components";
import NextLink from "next/link";
import * as React from "react";
import { useState } from "react";
import { MarketArea } from "../domain/types";
import { Icon } from "../icons";
import { MarketAreaHeader } from "./header-market-areas";
import { LanguageMenu } from "./language-menu";
import { HomeLink } from "./links";

export const Header = ({
  allMarketAreas,
  alternates,
}: {
  allMarketAreas?: MarketArea[];
  alternates?: { href: string; as: string; locale: string }[];
}) => {
  const [expanded, toggleMenu] = useState(false); // mobile
  const [marketMenuexpanded, toggleMarketMenu] = useState(false);

  return (
    <Box
      as="header"
      sx={{
        color: "text",
        // Needs to be "fixed" to prevent
        // iOS full-page scrolling
        position: ["relative", "relative", "fixed"],
        top: 0,
        left: 0,
        width: "100%",
        bg: "monochrome100",
        overflowY: "hidden",
        zIndex: 13,
        boxShadow: "0 3px 5px 0 rgba(0,0,0,0.10)",
      }}
    >
      <Flex
        sx={{
          flexDirection: ["column", "column", "row"],
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderBottomColor: "monochrome200",
          px: [0, 0, 4],
          pt: [0, 0, 3],
          pb: [0, 0, 5],
        }}
      >
        <DesktopMenu
          marketMenuexpanded={marketMenuexpanded}
          toggleMarketMenu={toggleMarketMenu}
        />
        <Box sx={{ display: ["none", "none", "block"], order: [1, 3, 3] }}>
          <LanguageMenu alternates={alternates} />
        </Box>
        <MobileMenu expanded={expanded} toggleMenu={toggleMenu} />
      </Flex>
      {expanded && (
        <MobileMenuExpanded
          marketMenuexpanded={marketMenuexpanded}
          toggleMarketMenu={toggleMarketMenu}
          allMarketAreas={allMarketAreas}
          alternates={alternates}
        />
      )}
      <Box sx={{ display: ["none", "none", "block"] }}>
        {marketMenuexpanded && allMarketAreas && (
          <MarketAreaHeader
            marketMenuexpanded={marketMenuexpanded}
            toggleMarketMenu={toggleMarketMenu}
            allMarketAreas={allMarketAreas}
          />
        )}
      </Box>
    </Box>
  );
};
const MobileHamburger = ({
  expanded,
  toggleMenu,
}: {
  expanded: boolean;
  toggleMenu: (x: boolean) => void;
}) => {
  return (
    <Button
      variant="reset"
      onClick={() => toggleMenu(!expanded)}
      sx={{
        display: ["block", "block", "none"],
        ml: "auto",
        mr: 4,
        fontSize: 5,
      }}
    >
      <Icon name={expanded ? "close" : "menu"} />
    </Button>
  );
};
const MobileMenuExpanded = ({
  marketMenuexpanded,
  toggleMarketMenu,
  allMarketAreas,
  alternates,
}: {
  marketMenuexpanded: boolean;
  toggleMarketMenu: (x: boolean) => void;
  allMarketAreas?: MarketArea[];
  alternates?: { href: string; as: string; locale: string }[];
}) => {
  return (
    <Box sx={{ display: ["flex", "flex", "none"], flexDirection: "column" }}>
      <Link
        variant="menu"
        onClick={() => toggleMarketMenu(!marketMenuexpanded)}
        sx={{
          cursor: "pointer",
          position: "relative",
          mr: 5,
          svg: {
            display: "inline",
            fontSize: 3,
            ml: 3,
          },
        }}
      >
        <Trans id="menu.markets">Märkte</Trans>
        <Icon name={marketMenuexpanded ? "navUp" : "navDown"} />
      </Link>
      {marketMenuexpanded && allMarketAreas && (
        <MarketAreaHeader
          marketMenuexpanded={marketMenuexpanded}
          toggleMarketMenu={toggleMarketMenu}
          allMarketAreas={allMarketAreas}
        />
      )}
      <NextLink href="/create/[chartId]" as="/create/new" passHref>
        <Link variant="menu">
          <Trans id="menu.data">Daten</Trans>
        </Link>
      </NextLink>
      <NextLink href="/about" passHref>
        <Link variant="menu">
          <Trans id="menu.about">Über uns</Trans>
        </Link>
      </NextLink>
      <LanguageMenu alternates={alternates} />
    </Box>
  );
};

const DesktopMenu = ({
  marketMenuexpanded,
  toggleMarketMenu,
}: {
  marketMenuexpanded: boolean;
  toggleMarketMenu: (x: boolean) => void;
}) => {
  return (
    <Box sx={{ display: ["none", "none", "flex"], order: 2, mx: "auto" }}>
      <Link
        variant="menu"
        onClick={() => toggleMarketMenu(!marketMenuexpanded)}
        sx={{
          cursor: "pointer",
          position: "relative",
          mr: 5,
          svg: {
            display: "inline-block",
            fontSize: 3,
            ml: 1,
          },
        }}
      >
        <Trans id="menu.markets">Märkte</Trans>
        <Icon name={marketMenuexpanded ? "navUp" : "navDown"} />
      </Link>
      <NextLink href="/create/[chartId]" as="/create/new" passHref>
        <Link variant="menu">
          <Trans id="menu.data">Daten</Trans>
        </Link>
      </NextLink>
      <NextLink href="/about" as="/about" passHref>
        <Link variant="menu">
          <Trans id="menu.about">Über uns</Trans>
        </Link>
      </NextLink>
    </Box>
  );
};
const Logo = () => (
  <HomeLink passHref>
    <Flex sx={{ alignItems: ["center", "center", "flex-start"] }}>
      <Box
        role="figure"
        aria-labelledby="logo"
        sx={{ display: ["block", "block", "none"], mx: 4, my: 4, width: 24 }}
      >
        <LogoMobile />
      </Box>
      <Box
        role="figure"
        aria-labelledby="logo"
        sx={{
          display: ["none", "none", "block"],
          pr: 6,
          borderRightWidth: "1px",
          borderRightStyle: "solid",
          borderRightColor: "monochrome300",
          color: "monochrome900",
        }}
      >
        <LogoDesktop />
      </Box>
      <Text
        as="h1"
        variant="lead"
        sx={{
          pl: [0, 0, 6],
          textDecoration: "none",
          color: "text",
          fontSize: 6,
          lineHeight: "heading",
          fontWeight: "extraBold",
        }}
      >
        <Trans id="title.agricultural.market.data">Agrarmarktdaten</Trans>
      </Text>
    </Flex>
  </HomeLink>
);
export const MobileMenu = ({
  expanded,
  toggleMenu,
}: {
  expanded: boolean;
  toggleMenu: (x: boolean) => void;
}) => {
  return (
    <Flex
      as="a"
      sx={{
        order: [2, 2, 1],
        alignItems: ["center", "center", "flex-start"],
        cursor: "pointer",
        textDecoration: "none",
        color: "monochrome900",
      }}
    >
      <Logo />
      <MobileHamburger
        expanded={expanded}
        toggleMenu={toggleMenu}
      ></MobileHamburger>
    </Flex>
  );
};

const LogoMobile = () => (
  <svg width={30} height={34}>
    <title id="logo">
      <Trans id="logo.swiss.confederation">
        Logo of the Swiss Confederation
      </Trans>
    </title>
    <g fillRule="nonzero" fill="none">
      <path
        d="M29.948 2.505S24.36 0 15.002 0H15C5.641 0 .051 2.505.051 2.505s-.5 11.094 1.621 17.367C5.42 30.902 14.997 34 14.997 34h.006s9.576-3.098 13.325-14.128c2.122-6.273 1.62-17.367 1.62-17.367z"
        fill="red"
      />
      <path
        fill="#FFF"
        d="M25 11.999v6h-7V25h-6v-7H5v-6.001h7V5h5.999L18 11.999z"
      />
    </g>
  </svg>
);
const LogoDesktop = () => (
  <svg width={224} height={56}>
    <title id="logo">
      <Trans id="logo.swiss.confederation">
        Logo of the Swiss Confederation
      </Trans>
    </title>
    <g fillRule="nonzero" fill="none">
      <g fill="currentColor">
        <path d="M42.275 8.644c.437.277.948.437 1.641.437.917 0 1.674-.469 1.674-1.524 0-1.461-3.411-1.642-3.411-3.592 0-1.194 1.045-1.94 2.356-1.94.362 0 .948.053 1.46.245l-.117.672c-.33-.182-.853-.277-1.354-.277-.767 0-1.609.32-1.609 1.279 0 1.493 3.411 1.503 3.411 3.678 0 1.503-1.289 2.1-2.441 2.1-.725 0-1.289-.149-1.684-.32l.074-.758zM52.103 4.88c-.362-.16-.799-.277-1.162-.277-1.311 0-2.047.949-2.047 2.27 0 1.237.746 2.271 1.972 2.271.427 0 .821-.096 1.226-.245l.064.629c-.459.16-.885.192-1.396.192-1.749 0-2.601-1.333-2.601-2.846 0-1.674 1.077-2.846 2.687-2.846.65 0 1.119.149 1.311.213l-.054.639zM54.128 1.597h.672v3.475h.022a1.844 1.844 0 011.695-1.045c1.461 0 1.855.97 1.855 2.313v3.251h-.671V6.352c0-.938-.181-1.748-1.29-1.748-1.194 0-1.61 1.13-1.61 2.079v2.91h-.671V1.597h-.002zM66.473 9.592h-.81l-1.482-4.701h-.022l-1.482 4.701h-.81l-1.748-5.437h.735l1.428 4.702h.022l1.514-4.702h.81l1.439 4.702h.021l1.503-4.702h.672zM73.658 9.422a4.454 4.454 0 01-1.578.298c-1.801 0-2.473-1.215-2.473-2.846 0-1.663.917-2.846 2.292-2.846 1.535 0 2.164 1.237 2.164 2.697v.341h-3.721c0 1.152.619 2.079 1.791 2.079.49 0 1.205-.203 1.525-.405v.682zm-.331-2.932c0-.949-.384-1.887-1.385-1.887-.992 0-1.599.991-1.599 1.887h2.984zM76.844 2.706h-.671v-.895h.671v.895zm-.671 1.45h.671v5.437h-.671V4.156zM78.87 9.028l3.273-4.297h-3.145v-.575h3.923v.576l-3.272 4.285h3.272v.576h-4.05v-.565zM88.581 9.422a4.454 4.454 0 01-1.578.298c-1.801 0-2.473-1.215-2.473-2.846 0-1.663.917-2.846 2.292-2.846 1.535 0 2.164 1.237 2.164 2.697v.341h-3.721c0 1.152.619 2.079 1.791 2.079.49 0 1.205-.203 1.525-.405v.682zM88.25 6.49c0-.949-.384-1.887-1.385-1.887-.992 0-1.599.991-1.599 1.887h2.984zM91.096 5.371c0-.597 0-.821-.042-1.215h.671V5.2h.021c.245-.607.704-1.172 1.397-1.172.16 0 .352.032.469.064v.704a1.751 1.751 0 00-.49-.064c-1.066 0-1.354 1.194-1.354 2.175v2.687h-.672V5.371zM96.149 2.706h-.672v-.895h.672v.895zm-.672 1.45h.672v5.437h-.672V4.156zM98.26 8.804c.405.203.896.341 1.418.341.64 0 1.204-.352 1.204-.97 0-1.289-2.612-1.087-2.612-2.665 0-1.077.874-1.482 1.77-1.482.288 0 .864.064 1.343.246l-.064.586a3.17 3.17 0 00-1.204-.256c-.693 0-1.173.213-1.173.906 0 1.013 2.676.885 2.676 2.665 0 1.152-1.077 1.545-1.898 1.545-.522 0-1.045-.064-1.525-.255l.065-.661zM107.192 4.88c-.362-.16-.799-.277-1.162-.277-1.311 0-2.047.949-2.047 2.27 0 1.237.746 2.271 1.972 2.271.427 0 .821-.096 1.226-.245l.064.629c-.458.16-.885.192-1.396.192-1.749 0-2.601-1.333-2.601-2.846 0-1.674 1.077-2.846 2.687-2.846.65 0 1.119.149 1.311.213l-.054.639zM109.217 1.597h.672v3.475h.021a1.845 1.845 0 011.695-1.045c1.461 0 1.855.97 1.855 2.313v3.251h-.671V6.352c0-.938-.181-1.748-1.289-1.748-1.194 0-1.61 1.13-1.61 2.079v2.91h-.672V1.597h-.001zM119.622 9.422a4.454 4.454 0 01-1.578.298c-1.801 0-2.473-1.215-2.473-2.846 0-1.663.917-2.846 2.292-2.846 1.535 0 2.164 1.237 2.164 2.697v.341h-3.721c0 1.152.619 2.079 1.791 2.079.49 0 1.205-.203 1.525-.405v.682zm-.331-2.932c0-.949-.384-1.887-1.385-1.887-.992 0-1.599.991-1.599 1.887h2.984zM125.687 2.152h3.645v.64h-2.91v2.655h2.761v.64h-2.761v2.868h3.038v.64h-3.773V2.152zM132.445 2.706h-.672v-.895h.672v.895zm-.671 1.45h.672v5.437h-.672V4.156zM139.278 9.592h-.672v-.863h-.021c-.363.693-.917.991-1.695.991-1.492 0-2.238-1.236-2.238-2.846 0-1.652.64-2.846 2.238-2.846 1.066 0 1.599.778 1.695 1.045h.021V1.597h.672v7.995zm-2.281-.447c1.194 0 1.609-1.28 1.609-2.271 0-.991-.416-2.27-1.609-2.27-1.279 0-1.61 1.215-1.61 2.27 0 1.056.33 2.271 1.61 2.271zM146.036 9.145c0 1.514-.683 2.75-2.548 2.75-.714 0-1.364-.203-1.642-.288l.053-.671a3.671 3.671 0 001.599.384c1.727 0 1.876-1.258 1.876-2.793h-.022c-.362.789-.959 1.066-1.652 1.066-1.738 0-2.292-1.514-2.292-2.718 0-1.652.64-2.846 2.238-2.846.725 0 1.194.096 1.695.746h.021v-.619h.672v4.989h.002zm-2.324-.128c1.215 0 1.652-1.152 1.652-2.143 0-1.311-.384-2.27-1.609-2.27-1.279 0-1.61 1.215-1.61 2.27 0 1.066.426 2.143 1.567 2.143zM152.134 9.422a4.454 4.454 0 01-1.578.298c-1.801 0-2.473-1.215-2.473-2.846 0-1.663.917-2.846 2.292-2.846 1.535 0 2.164 1.237 2.164 2.697v.341h-3.721c0 1.152.619 2.079 1.791 2.079.49 0 1.205-.203 1.525-.405v.682zm-.331-2.932c0-.949-.384-1.887-1.385-1.887-.992 0-1.6.991-1.6 1.887h2.985zM154.649 5.435c0-.416 0-.842-.042-1.28h.65v.97h.022c.223-.49.628-1.098 1.758-1.098 1.344 0 1.855.895 1.855 2.089v3.475h-.671V6.288c0-1.023-.362-1.684-1.29-1.684-1.226 0-1.61 1.077-1.61 1.983v3.006h-.671V5.435h-.001zM163.528 4.028c1.759 0 2.537 1.364 2.537 2.846s-.778 2.846-2.537 2.846c-1.758 0-2.537-1.364-2.537-2.846s.779-2.846 2.537-2.846zm0 5.117c1.173 0 1.801-1.013 1.801-2.271s-.628-2.27-1.801-2.27c-1.172 0-1.801 1.013-1.801 2.27 0 1.258.629 2.271 1.801 2.271zM167.75 8.804a3.19 3.19 0 001.418.341c.64 0 1.204-.352 1.204-.97 0-1.289-2.612-1.087-2.612-2.665 0-1.077.874-1.482 1.77-1.482.288 0 .864.064 1.343.246l-.064.586a3.17 3.17 0 00-1.204-.256c-.693 0-1.173.213-1.173.906 0 1.013 2.675.885 2.675 2.665 0 1.152-1.077 1.545-1.897 1.545-.522 0-1.045-.064-1.524-.255l.064-.661zM172.728 8.804a3.19 3.19 0 001.418.341c.64 0 1.204-.352 1.204-.97 0-1.289-2.612-1.087-2.612-2.665 0-1.077.874-1.482 1.77-1.482.288 0 .864.064 1.343.246l-.064.586a3.17 3.17 0 00-1.204-.256c-.693 0-1.173.213-1.173.906 0 1.013 2.675.885 2.675 2.665 0 1.152-1.077 1.545-1.897 1.545-.522 0-1.045-.064-1.524-.255l.064-.661zM181.768 9.422a4.454 4.454 0 01-1.578.298c-1.801 0-2.473-1.215-2.473-2.846 0-1.663.917-2.846 2.292-2.846 1.535 0 2.164 1.237 2.164 2.697v.341h-3.721c0 1.152.619 2.079 1.791 2.079.49 0 1.205-.203 1.525-.405v.682zm-.331-2.932c0-.949-.384-1.887-1.385-1.887-.992 0-1.599.991-1.599 1.887h2.984zM184.283 5.435c0-.416 0-.842-.042-1.28h.65v.97h.021c.223-.49.628-1.098 1.758-1.098 1.344 0 1.855.895 1.855 2.089v3.475h-.672V6.288c0-1.023-.362-1.684-1.29-1.684-1.226 0-1.61 1.077-1.61 1.983v3.006h-.672V5.435h.002zM190.626 8.804c.405.203.896.341 1.418.341.64 0 1.204-.352 1.204-.97 0-1.289-2.612-1.087-2.612-2.665 0-1.077.874-1.482 1.77-1.482.288 0 .864.064 1.343.246l-.064.586a3.17 3.17 0 00-1.204-.256c-.693 0-1.173.213-1.173.906 0 1.013 2.675.885 2.675 2.665 0 1.152-1.077 1.545-1.897 1.545-.522 0-1.045-.064-1.524-.255l.064-.661zM199.559 4.88c-.362-.16-.799-.277-1.162-.277-1.311 0-2.047.949-2.047 2.27 0 1.237.746 2.271 1.972 2.271.427 0 .821-.096 1.226-.245l.064.629c-.459.16-.885.192-1.396.192-1.749 0-2.601-1.333-2.601-2.846 0-1.674 1.077-2.846 2.687-2.846.65 0 1.119.149 1.311.213l-.054.639zM201.584 1.597h.671v3.475h.022a1.844 1.844 0 011.695-1.045c1.461 0 1.855.97 1.855 2.313v3.251h-.672V6.352c0-.938-.182-1.748-1.289-1.748-1.194 0-1.61 1.13-1.61 2.079v2.91h-.671V1.597h-.001zM211.465 8.718h-.021c-.298.65-1.056 1.002-1.727 1.002-1.545 0-1.791-1.045-1.791-1.535 0-1.822 1.941-1.907 3.348-1.907h.128V6c0-.928-.33-1.396-1.236-1.396a2.9 2.9 0 00-1.6.447v-.65c.416-.203 1.12-.373 1.6-.373 1.343 0 1.908.608 1.908 2.026v2.399c0 .437 0 .767.054 1.14h-.662v-.875h-.001zm-.064-1.865h-.191c-1.162 0-2.547.118-2.547 1.312 0 .714.511.981 1.129.981 1.577 0 1.609-1.375 1.609-1.962v-.331zM214.962 4.731h-1.097v-.575h1.097v-.394c0-1.14.043-2.292 1.44-2.292.212 0 .501.032.628.107l-.043.586a1.186 1.186 0 00-.533-.117c-.917 0-.82.991-.82 1.641v.469h1.225v.576h-1.225v4.861h-.673V4.731h.001zM221.229 4.731h-1.236V8.25c0 .49.182.895.726.895.255 0 .426-.053.617-.128l.043.554a2.45 2.45 0 01-.821.149c-1.193 0-1.236-.821-1.236-1.812V4.731h-1.065v-.575h1.065V2.845l.672-.235v1.545h1.236v.576h-.001zM47.498 17.687c-.469-.245-1.141-.32-1.663-.32-1.929 0-3.017 1.365-3.017 3.209 0 1.876 1.056 3.208 3.017 3.208.49 0 1.237-.064 1.663-.32l.042.64c-.405.246-1.236.32-1.706.32-2.345 0-3.752-1.546-3.752-3.848 0-2.26 1.45-3.848 3.752-3.848.437 0 1.322.075 1.706.277l-.042.682zM52.113 18.732c1.759 0 2.538 1.364 2.538 2.846s-.778 2.846-2.538 2.846c-1.758 0-2.537-1.364-2.537-2.846s.779-2.846 2.537-2.846zm0 5.117c1.173 0 1.801-1.013 1.801-2.271s-.628-2.27-1.801-2.27c-1.172 0-1.801 1.013-1.801 2.27 0 1.258.629 2.271 1.801 2.271zM56.75 20.139c0-.416 0-.842-.042-1.28h.65v.97h.022c.223-.49.628-1.098 1.758-1.098 1.344 0 1.855.895 1.855 2.089v3.475h-.671V20.99c0-1.023-.362-1.684-1.29-1.684-1.226 0-1.61 1.077-1.61 1.983v3.006h-.672v-4.156zM63.967 19.435h-1.098v-.576h1.098v-.394c0-1.14.042-2.292 1.439-2.292.214 0 .501.032.629.106l-.042.587a1.186 1.186 0 00-.533-.117c-.916 0-.821.991-.821 1.641v.469h1.226v.576h-1.226v4.861h-.671v-4.861h-.001zM71.536 24.125a4.454 4.454 0 01-1.578.298c-1.801 0-2.473-1.215-2.473-2.846 0-1.663.917-2.846 2.292-2.846 1.535 0 2.164 1.237 2.164 2.697v.341H68.22c0 1.152.619 2.079 1.791 2.079.49 0 1.205-.203 1.525-.405v.682zm-.331-2.931c0-.949-.384-1.887-1.385-1.887-.992 0-1.6.991-1.6 1.887h2.985zm-1.119-4.435h.842l-1.344 1.535h-.49l.992-1.535zM78.358 24.296h-.672v-.864h-.021c-.363.693-.917.991-1.695.991-1.492 0-2.238-1.236-2.238-2.846 0-1.652.64-2.846 2.238-2.846 1.066 0 1.599.778 1.695 1.045h.021v-3.475h.672v7.995zm-2.282-.447c1.194 0 1.609-1.28 1.609-2.271 0-.991-.416-2.27-1.609-2.27-1.279 0-1.61 1.215-1.61 2.27s.331 2.271 1.61 2.271zM84.455 24.125a4.454 4.454 0 01-1.578.298c-1.801 0-2.473-1.215-2.473-2.846 0-1.663.917-2.846 2.292-2.846 1.535 0 2.164 1.237 2.164 2.697v.341h-3.721c0 1.152.619 2.079 1.791 2.079.49 0 1.205-.203 1.525-.405v.682zm-.331-2.931c0-.949-.384-1.887-1.385-1.887-.992 0-1.599.991-1.599 1.887h2.984zm-1.119-4.435h.842l-1.343 1.535h-.49l.991-1.535zM86.971 20.074c0-.597 0-.821-.042-1.215h.671v1.045h.021c.245-.608.704-1.173 1.397-1.173.16 0 .352.032.469.064v.704a1.751 1.751 0 00-.49-.064c-1.066 0-1.354 1.194-1.354 2.175v2.687h-.672v-4.223zM94.475 23.422h-.022c-.298.65-1.055 1.002-1.727 1.002-1.545 0-1.79-1.045-1.79-1.535 0-1.822 1.94-1.907 3.347-1.907h.128v-.277c0-.928-.331-1.396-1.237-1.396-.565 0-1.098.128-1.599.447v-.65c.416-.203 1.119-.373 1.599-.373 1.343 0 1.908.608 1.908 2.026v2.399c0 .437 0 .767.053 1.14h-.661v-.876h.001zm-.064-1.865h-.192c-1.162 0-2.548.117-2.548 1.311 0 .714.512.981 1.13.981 1.577 0 1.61-1.375 1.61-1.962v-.33zM99.859 19.435h-1.237v3.518c0 .49.182.895.725.895.256 0 .427-.053.619-.128l.042.554a2.45 2.45 0 01-.821.149c-1.194 0-1.237-.821-1.237-1.812v-3.177h-1.066v-.576h1.066v-1.311l.671-.235v1.546h1.237v.577h.001zM102.566 17.409h-.672v-.895h.672v.895zm-.672 1.45h.672v5.437h-.672v-5.437zM107.213 18.732c1.759 0 2.537 1.364 2.537 2.846s-.778 2.846-2.537 2.846c-1.758 0-2.537-1.364-2.537-2.846s.778-2.846 2.537-2.846zm0 5.117c1.173 0 1.801-1.013 1.801-2.271s-.628-2.27-1.801-2.27c-1.172 0-1.801 1.013-1.801 2.27-.001 1.258.628 2.271 1.801 2.271zM111.85 20.139c0-.416 0-.842-.042-1.28h.65v.97h.021c.223-.49.628-1.098 1.758-1.098 1.344 0 1.855.895 1.855 2.089v3.475h-.672V20.99c0-1.023-.362-1.684-1.289-1.684-1.226 0-1.61 1.077-1.61 1.983v3.006h-.672v-4.156h.001zM121.881 23.507a3.19 3.19 0 001.418.341c.64 0 1.204-.352 1.204-.97 0-1.289-2.612-1.087-2.612-2.665 0-1.077.874-1.482 1.77-1.482.288 0 .864.064 1.343.245l-.064.587a3.17 3.17 0 00-1.204-.256c-.693 0-1.173.213-1.173.906 0 1.013 2.675.885 2.675 2.665 0 1.152-1.077 1.546-1.897 1.546-.522 0-1.045-.064-1.524-.255l.064-.662zM131.517 23.017c0 .416 0 .842.043 1.279h-.651v-.97h-.021c-.224.49-.629 1.097-1.759 1.097-1.343 0-1.855-.896-1.855-2.089v-3.475h.671v3.305c0 1.024.363 1.685 1.29 1.685 1.226 0 1.609-1.077 1.609-1.983V18.86h.672v4.157h.001zM134.704 17.409h-.671v-.895h.671v.895zm-.671 1.45h.671v5.437h-.671v-5.437zM136.815 23.507a3.19 3.19 0 001.418.341c.64 0 1.204-.352 1.204-.97 0-1.289-2.612-1.087-2.612-2.665 0-1.077.874-1.482 1.77-1.482.288 0 .864.064 1.343.245l-.064.587a3.17 3.17 0 00-1.204-.256c-.693 0-1.173.213-1.173.906 0 1.013 2.676.885 2.676 2.665 0 1.152-1.077 1.546-1.898 1.546-.522 0-1.045-.064-1.525-.255l.065-.662zM141.793 23.507c.405.203.896.341 1.418.341.64 0 1.204-.352 1.204-.97 0-1.289-2.612-1.087-2.612-2.665 0-1.077.874-1.482 1.77-1.482.288 0 .864.064 1.343.245l-.064.587a3.17 3.17 0 00-1.204-.256c-.693 0-1.173.213-1.173.906 0 1.013 2.676.885 2.676 2.665 0 1.152-1.077 1.546-1.898 1.546-.522 0-1.045-.064-1.525-.255l.065-.662zM150.832 24.125a4.454 4.454 0 01-1.578.298c-1.801 0-2.473-1.215-2.473-2.846 0-1.663.917-2.846 2.292-2.846 1.535 0 2.164 1.237 2.164 2.697v.341h-3.721c0 1.152.619 2.079 1.791 2.079.49 0 1.205-.203 1.525-.405v.682zm-.33-2.931c0-.949-.384-1.887-1.385-1.887-.992 0-1.6.991-1.6 1.887h2.985zM47.498 32.39c-.469-.245-1.141-.32-1.663-.32-1.929 0-3.017 1.365-3.017 3.209 0 1.876 1.056 3.208 3.017 3.208.49 0 1.237-.064 1.663-.32l.042.64c-.405.246-1.236.32-1.706.32-2.345 0-3.752-1.545-3.752-3.848 0-2.26 1.45-3.848 3.752-3.848.437 0 1.322.074 1.706.277l-.042.682zM52.113 33.435c1.759 0 2.538 1.364 2.538 2.846s-.778 2.846-2.538 2.846c-1.758 0-2.537-1.364-2.537-2.846s.779-2.846 2.537-2.846zm0 5.117c1.173 0 1.801-1.013 1.801-2.271s-.628-2.27-1.801-2.27c-1.172 0-1.801 1.013-1.801 2.27 0 1.258.629 2.271 1.801 2.271zM56.75 34.842c0-.416 0-.842-.042-1.28h.65v.97h.022c.223-.49.628-1.098 1.758-1.098 1.344 0 1.855.895 1.855 2.089V39h-.671v-3.305c0-1.023-.362-1.684-1.29-1.684-1.226 0-1.61 1.077-1.61 1.983V39h-.672v-4.158zM63.967 34.138h-1.098v-.576h1.098v-.394c0-1.14.042-2.292 1.439-2.292.214 0 .501.032.629.107l-.042.586a1.186 1.186 0 00-.533-.117c-.916 0-.821.991-.821 1.641v.469h1.226v.576h-1.226V39h-.671v-4.862h-.001zM71.536 38.829a4.454 4.454 0 01-1.578.298c-1.801 0-2.473-1.215-2.473-2.846 0-1.663.917-2.846 2.292-2.846 1.535 0 2.164 1.237 2.164 2.697v.341H68.22c0 1.152.619 2.079 1.791 2.079.49 0 1.205-.203 1.525-.405v.682zm-.331-2.931c0-.949-.384-1.887-1.385-1.887-.992 0-1.6.991-1.6 1.887h2.985zM78.358 39h-.672v-.864h-.021c-.363.693-.917.991-1.695.991-1.492 0-2.238-1.236-2.238-2.846 0-1.652.64-2.846 2.238-2.846 1.066 0 1.599.778 1.695 1.045h.021v-3.475h.672V39zm-2.282-.448c1.194 0 1.609-1.28 1.609-2.271 0-.991-.416-2.27-1.609-2.27-1.279 0-1.61 1.215-1.61 2.27 0 1.056.331 2.271 1.61 2.271zM84.455 38.829a4.454 4.454 0 01-1.578.298c-1.801 0-2.473-1.215-2.473-2.846 0-1.663.917-2.846 2.292-2.846 1.535 0 2.164 1.237 2.164 2.697v.341h-3.721c0 1.152.619 2.079 1.791 2.079.49 0 1.205-.203 1.525-.405v.682zm-.331-2.931c0-.949-.384-1.887-1.385-1.887-.992 0-1.599.991-1.599 1.887h2.984zM86.971 34.778c0-.597 0-.821-.042-1.215h.671v1.045h.021c.245-.607.704-1.172 1.397-1.172.16 0 .352.032.469.064v.704a1.751 1.751 0 00-.49-.064c-1.066 0-1.354 1.194-1.354 2.175V39h-.672v-4.222zM94.475 38.126h-.022c-.298.65-1.055 1.002-1.727 1.002-1.545 0-1.79-1.045-1.79-1.535 0-1.822 1.94-1.907 3.347-1.907h.128v-.277c0-.928-.331-1.396-1.237-1.396-.565 0-1.098.128-1.599.447v-.65c.416-.203 1.119-.373 1.599-.373 1.343 0 1.908.608 1.908 2.025v2.399c0 .437 0 .767.053 1.14h-.661v-.875h.001zm-.064-1.866h-.192c-1.162 0-2.548.118-2.548 1.312 0 .714.512.981 1.13.981 1.577 0 1.61-1.375 1.61-1.962v-.331zM97.012 38.435l3.273-4.297H97.14v-.576h3.923v.576l-3.272 4.285h3.272V39h-4.05v-.565zM103.749 32.113h-.672v-.895h.672v.895zm-.671 1.45h.672V39h-.672v-5.437zM108.396 33.435c1.759 0 2.537 1.364 2.537 2.846s-.778 2.846-2.537 2.846c-1.758 0-2.537-1.364-2.537-2.846s.779-2.846 2.537-2.846zm0 5.117c1.173 0 1.801-1.013 1.801-2.271s-.628-2.27-1.801-2.27c-1.172 0-1.801 1.013-1.801 2.27 0 1.258.629 2.271 1.801 2.271zM113.033 34.842c0-.416 0-.842-.042-1.28h.65v.97h.021c.223-.49.628-1.098 1.758-1.098 1.344 0 1.855.895 1.855 2.089V39h-.672v-3.305c0-1.023-.362-1.684-1.289-1.684-1.226 0-1.61 1.077-1.61 1.983V39h-.672v-4.158h.001zM123.438 38.829a4.454 4.454 0 01-1.578.298c-1.801 0-2.473-1.215-2.473-2.846 0-1.663.917-2.846 2.292-2.846 1.535 0 2.164 1.237 2.164 2.697v.341h-3.721c0 1.152.619 2.079 1.791 2.079.49 0 1.205-.203 1.525-.405v.682zm-.331-2.931c0-.949-.384-1.887-1.385-1.887-.992 0-1.6.991-1.6 1.887h2.985zM129.513 38.051c.437.277.948.437 1.641.437.917 0 1.674-.469 1.674-1.524 0-1.461-3.411-1.642-3.411-3.593 0-1.194 1.045-1.94 2.356-1.94.362 0 .948.053 1.46.245l-.117.672c-.331-.182-.853-.277-1.354-.277-.767 0-1.609.32-1.609 1.279 0 1.493 3.411 1.503 3.411 3.678 0 1.503-1.289 2.1-2.441 2.1-.725 0-1.29-.149-1.684-.32l.074-.757zM137.69 39h-.789l-1.844-5.437h.736l1.503 4.702h.021l1.578-4.702h.703zM142.039 32.113h-.671v-.895h.671v.895zm-.672 1.45h.671V39h-.671v-5.437zM144.064 38.435l3.273-4.297h-3.145v-.576h3.923v.576l-3.272 4.285h3.272V39h-4.05v-.565zM149.628 38.435l3.273-4.297h-3.145v-.576h3.923v.576l-3.272 4.285h3.272V39h-4.05v-.565zM159.339 38.829a4.454 4.454 0 01-1.578.298c-1.801 0-2.473-1.215-2.473-2.846 0-1.663.917-2.846 2.292-2.846 1.535 0 2.164 1.237 2.164 2.697v.341h-3.721c0 1.152.619 2.079 1.791 2.079.49 0 1.205-.203 1.525-.405v.682zm-.331-2.931c0-.949-.384-1.887-1.385-1.887-.992 0-1.599.991-1.599 1.887h2.984zM161.855 34.778c0-.597 0-.821-.042-1.215h.671v1.045h.021c.245-.607.704-1.172 1.397-1.172.16 0 .352.032.469.064v.704a1.751 1.751 0 00-.49-.064c-1.066 0-1.354 1.194-1.354 2.175V39h-.671v-4.222h-.001zM169.359 38.126h-.022c-.298.65-1.055 1.002-1.727 1.002-1.545 0-1.79-1.045-1.79-1.535 0-1.822 1.94-1.907 3.347-1.907h.128v-.277c0-.928-.331-1.396-1.237-1.396-.565 0-1.098.128-1.599.447v-.65c.416-.203 1.119-.373 1.599-.373 1.343 0 1.908.608 1.908 2.025v2.399c0 .437 0 .767.053 1.14h-.661v-.875h.001zm-.064-1.866h-.192c-1.162 0-2.548.118-2.548 1.312 0 .714.512.981 1.13.981 1.577 0 1.61-1.375 1.61-1.962v-.331zM47.498 47.093c-.469-.245-1.141-.32-1.663-.32-1.929 0-3.017 1.365-3.017 3.209 0 1.876 1.056 3.208 3.017 3.208.49 0 1.237-.064 1.663-.32l.042.64c-.405.246-1.236.32-1.706.32-2.345 0-3.752-1.545-3.752-3.848 0-2.26 1.45-3.848 3.752-3.848.437 0 1.322.074 1.706.277l-.042.682zM52.113 48.138c1.759 0 2.538 1.364 2.538 2.846s-.778 2.846-2.538 2.846c-1.758 0-2.537-1.364-2.537-2.846s.779-2.846 2.537-2.846zm0 5.117c1.173 0 1.801-1.013 1.801-2.271s-.628-2.27-1.801-2.27c-1.172 0-1.801 1.013-1.801 2.27 0 1.258.629 2.271 1.801 2.271zM56.75 49.545c0-.416 0-.842-.042-1.28h.65v.97h.022c.223-.49.628-1.098 1.758-1.098 1.344 0 1.855.896 1.855 2.089v3.475h-.671v-3.305c0-1.023-.362-1.684-1.29-1.684-1.226 0-1.61 1.077-1.61 1.982V53.7h-.672v-4.155zM63.967 48.841h-1.098v-.576h1.098v-.394c0-1.14.042-2.292 1.439-2.292.214 0 .501.032.629.107l-.042.586a1.186 1.186 0 00-.533-.117c-.916 0-.821.991-.821 1.641v.469h1.226v.576h-1.226v4.861h-.671v-4.861h-.001zM71.536 53.532a4.454 4.454 0 01-1.578.298c-1.801 0-2.473-1.215-2.473-2.846 0-1.663.917-2.846 2.292-2.846 1.535 0 2.164 1.237 2.164 2.697v.341H68.22c0 1.151.619 2.079 1.791 2.079.49 0 1.205-.202 1.525-.405v.682zm-.331-2.932c0-.949-.384-1.887-1.385-1.887-.992 0-1.6.991-1.6 1.887h2.985zM78.358 53.703h-.672v-.864h-.021c-.363.693-.917.991-1.695.991-1.492 0-2.238-1.236-2.238-2.846 0-1.652.64-2.846 2.238-2.846 1.066 0 1.599.778 1.695 1.045h.021v-3.475h.672v7.995zm-2.282-.448c1.194 0 1.609-1.28 1.609-2.271 0-.991-.416-2.27-1.609-2.27-1.279 0-1.61 1.215-1.61 2.27 0 1.056.331 2.271 1.61 2.271zM84.455 53.532a4.454 4.454 0 01-1.578.298c-1.801 0-2.473-1.215-2.473-2.846 0-1.663.917-2.846 2.292-2.846 1.535 0 2.164 1.237 2.164 2.697v.341h-3.721c0 1.151.619 2.079 1.791 2.079.49 0 1.205-.202 1.525-.405v.682zm-.331-2.932c0-.949-.384-1.887-1.385-1.887-.992 0-1.599.991-1.599 1.887h2.984zM86.971 49.481c0-.597 0-.821-.042-1.215h.671v1.045h.021c.245-.607.704-1.172 1.397-1.172.16 0 .352.032.469.064v.704a1.751 1.751 0 00-.49-.064c-1.066 0-1.354 1.194-1.354 2.175v2.687h-.672v-4.224zM94.475 52.828h-.022c-.298.65-1.055 1.002-1.727 1.002-1.545 0-1.79-1.045-1.79-1.535 0-1.822 1.94-1.908 3.347-1.908h.128v-.277c0-.927-.331-1.396-1.237-1.396-.565 0-1.098.128-1.599.447v-.65c.416-.203 1.119-.373 1.599-.373 1.343 0 1.908.608 1.908 2.026v2.399c0 .437 0 .767.053 1.14h-.661v-.875h.001zm-.064-1.865h-.192c-1.162 0-2.548.118-2.548 1.312 0 .714.512.981 1.13.981 1.577 0 1.61-1.375 1.61-1.962v-.331zM97.012 53.138l3.273-4.297H97.14v-.576h3.923v.576l-3.272 4.285h3.272v.576h-4.05v-.564zM103.749 46.816h-.672v-.895h.672v.895zm-.671 1.45h.672v5.437h-.672v-5.437zM110.517 52.423c0 .416 0 .842.043 1.279h-.651v-.97h-.021c-.224.49-.629 1.097-1.759 1.097-1.343 0-1.855-.895-1.855-2.089v-3.475h.672v3.305c0 1.024.363 1.685 1.29 1.685 1.226 0 1.609-1.077 1.609-1.983v-3.006h.671v4.157h.001zM113.033 49.545c0-.416 0-.842-.042-1.28h.65v.97h.021c.223-.49.628-1.098 1.758-1.098 1.344 0 1.855.896 1.855 2.089v3.475h-.672v-3.305c0-1.023-.362-1.684-1.289-1.684-1.226 0-1.61 1.077-1.61 1.982V53.7h-.672v-4.155h.001zM123.064 52.914a3.19 3.19 0 001.418.341c.64 0 1.204-.352 1.204-.97 0-1.29-2.612-1.087-2.612-2.665 0-1.077.874-1.482 1.77-1.482.288 0 .864.064 1.343.245l-.064.586a3.17 3.17 0 00-1.204-.256c-.693 0-1.173.213-1.173.906 0 1.013 2.675.885 2.675 2.665 0 1.152-1.077 1.545-1.897 1.545-.522 0-1.045-.064-1.524-.255l.064-.66zM130.344 53.703h-.789l-1.844-5.437h.736l1.503 4.702h.021l1.578-4.702h.703zM134.694 46.816h-.671v-.895h.671v.895zm-.672 1.45h.671v5.437h-.671v-5.437zM136.719 53.138l3.273-4.297h-3.145v-.576h3.923v.576l-3.272 4.285h3.272v.576h-4.05v-.564zM142.784 49.481c0-.597 0-.821-.042-1.215h.672v1.045h.021c.245-.607.704-1.172 1.397-1.172.16 0 .352.032.469.064v.704a1.751 1.751 0 00-.49-.064c-1.066 0-1.354 1.194-1.354 2.175v2.687h-.672v-4.224h-.001zM150.288 52.828h-.021c-.298.65-1.055 1.002-1.727 1.002-1.546 0-1.79-1.045-1.79-1.535 0-1.822 1.94-1.908 3.347-1.908h.128v-.277c0-.927-.331-1.396-1.237-1.396-.565 0-1.098.128-1.599.447v-.65c.416-.203 1.119-.373 1.599-.373 1.343 0 1.908.608 1.908 2.026v2.399c0 .437 0 .767.053 1.14h-.661v-.875zm-.063-1.865h-.192c-1.162 0-2.548.118-2.548 1.312 0 .714.512.981 1.13.981 1.577 0 1.61-1.375 1.61-1.962v-.331z" />
      </g>
      <path
        d="M29.948 2.505S24.36 0 15.002 0H15C5.641 0 .051 2.505.051 2.505s-.5 11.094 1.621 17.367C5.42 30.902 14.997 34 14.997 34h.006s9.576-3.098 13.325-14.128c2.122-6.273 1.62-17.367 1.62-17.367z"
        fill="red"
      />
      <path
        fill="#FFF"
        d="M25 11.999v6h-7V25h-6v-7H5v-6.001h7V5h5.999L18 11.999z"
      />
    </g>
  </svg>
);
