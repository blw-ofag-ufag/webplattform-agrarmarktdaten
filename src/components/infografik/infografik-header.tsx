import { default as NextLink } from "next/link";
import React from "react";
import { Flex, Link } from "theme-ui";
import { Icon } from "../../icons";
import { LanguageMenu } from "../language-menu";
import { colors } from "./colors";

export const InfografikHeader = () => {
  return (
    <Flex
      sx={{
        zIndex: 9,
        width: [`calc(100% + 1.5rem)`, `calc(100% + 2rem)`],
        marginLeft: [-3, -4],
        flexDirection: "row",
        px: [4, 4, "40px"],
        py: [0, 0, 4],
        bg: colors.yellow,
        justifyContent: "space-between",
        alignItems: "center",
        flex: "1 1 0px",
        borderBottom: "1px solid rgba(0,0,0,0.15)",
      }}
    >
      <NextLink href="/" passHref>
        <Link sx={{ textDecoration: "none" }}>
          <Icon name="arrowLeft" />
        </Link>
      </NextLink>
      <LanguageMenu />
    </Flex>
  );
};
