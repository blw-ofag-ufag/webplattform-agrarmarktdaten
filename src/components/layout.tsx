import { Box, Link } from "@mui/material";
import NextLink from "next/link";

import Flex from "@/components/flex";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Market } from "@/domain/types";

export const HeaderOld = () => {
  return (
    <Flex
      sx={{
        height: "96px",
        px: 3,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <NextLink href="/">
        <Flex
          sx={{
            backgroundColor: "primary",
            color: "background",
            borderRadius: 5,
            height: "4rem",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 5,
            textDecoration: "none",
            px: 5,
            cursor: "pointer",
            ":hover": { textDecoration: "none" },
          }}
        >
          Logo
        </Flex>
      </NextLink>
      <Flex>
        <NextLink href="/create/[chartId]" as="/create/new" passHref>
          <Link>Get Data</Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};

export const AppLayout = ({
  children,
  allMarkets,
  alternates,
}: {
  children: React.ReactNode;
  allMarkets?: Market[];
  alternates?: { href: string; as: string; locale: string }[];
}) => (
  <>
    <Header alternates={alternates} allMarkets={allMarkets} />
    <Box sx={{ mt: [0, 0, "92px"] }}>{children}</Box>
    <Footer />
  </>
);
