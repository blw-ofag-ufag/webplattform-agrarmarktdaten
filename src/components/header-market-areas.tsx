import { default as NextLink } from "next/link";
import React from "react";
import { Box, Card, Flex, Link, Text } from "theme-ui";
import { MarketArea } from "../domain/types";
import { Icon, IconName } from "../icons";
import { useLocale } from "../lib/use-locale";

export const MarketAreaHeader = ({
  marketMenuexpanded,
  toggleMarketMenu,
  allMarketAreas,
}: {
  marketMenuexpanded: boolean;
  toggleMarketMenu: (x: boolean) => void;
  allMarketAreas: MarketArea[];
}) => {
  const locale = useLocale();

  return (
    <Flex
      as="ul"
      sx={{
        flexDirection: ["column", "column", "row"],
        listStyle: "none",
        my: [0, 0, 6],
        px: [4, 4, "40px"],
        py: [5, 5, 0],
        justifyContent: ["flex-start", "flex-start", "space-between"],
        alignItems: ["center", "center", "flex-start"],
        flex: "1 1 0px",
        flexFlow: ["none", "none", "row wrap"],
        zIndex: 30,
      }}
    >
      {allMarketAreas.map((area) => {
        return (
          <Box as="li" key={area.slug} sx={{ width: ["100%", "100%", "auto"] }}>
            <NextLink
              href="/area/[slug]"
              as={`/area/${area.slug}`}
              locale={locale}
              passHref
            >
              <Link
                sx={{ textDecoration: "none" }}
                onClick={() => toggleMarketMenu(false)}
              >
                <MarketCard title={area.title} icon={area.icon}></MarketCard>
              </Link>
            </NextLink>
          </Box>
        );
      })}
    </Flex>
  );
};

export const MarketCard = ({
  title,
  icon,
}: {
  title: string;
  icon: IconName;
}) => {
  return (
    <Card
      variant="primary"
      sx={{
        width: ["100%", "100%", 150],
        flexDirection: ["row", "row", "column"],
        justifyContent: "flex-start",
      }}
    >
      <MarketIcon icon={icon} />
      <Text
        as="h2"
        sx={{
          fontSize: 5,
          fontWeight: "bold",
          lineHeight: "heading",
          textAlign: "center",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        {title}
      </Text>
    </Card>
  );
};

export const MarketIcon = ({ icon }: { icon: IconName }) => {
  return (
    <Flex
      sx={{
        bg: `${icon}Light`,
        color: icon,
        borderRadius: "100%",
        width: ["3rem", "3rem", "5.5rem"],
        height: ["3rem", "3rem", "5.5rem"],
        justifyContent: "center",
        alignItems: "center",
        mb: [4, 4, 2],
        mr: [4, 4, 0],
        fontSize: ["1.5rem", "1.5rem", "3rem"],
        "&:hover": { bg: `${icon}LightHover` },
      }}
    >
      <Icon name={icon} size={50} />
    </Flex>
  );
};
