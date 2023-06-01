import { Link } from "@mui/material";
import NextLink from "next/link";

import Flex from "@/components/flex";
import { colors } from "@/components/infografik/colors";
import { LanguageMenu } from "@/components/language-menu";
import { Icon } from "@/icons";

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
        backgroundColor: colors.yellow,
        justifyContent: "space-between",
        alignItems: "center",
        flex: "1 1 0px",
        borderBottom: "1px solid rgba(0,0,0,0.15)",
      }}
    >
      <NextLink href="/" passHref legacyBehavior>
        <Link sx={{ textDecoration: "none" }}>
          <Icon name="arrowLeft" />
        </Link>
      </NextLink>
      <LanguageMenu />
    </Flex>
  );
};
