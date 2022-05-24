import { Box, Link } from "@mui/material";
import NextLink from "next/link";

import Flex from "@/components/flex";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MarketArea } from "@/domain/types";

export const HeaderOld = ({
  alternates,
}: {
  alternates?: { href: string; as: string; label: string }[];
}) => {
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

        {/* {alternates && (
          <Flex ml={3} sx={{ borderLeft: "1px solid #999" }}>
            {alternates.map(({ href, label, as }) => {
              return (
                <Box ml={3} key={as}>
                  <NextLink href={href} as={as} passHref>
                    <Link>{label}</Link>
                  </NextLink>
                </Box>
              );
            })}
          </Flex>
        )} */}
      </Flex>
    </Flex>
  );
};

export const AppLayout = ({
  children,
  allMarketAreas,
  alternates,
}: {
  children: React.ReactNode;
  allMarketAreas?: MarketArea[];
  alternates?: { href: string; as: string; locale: string }[];
}) => (
  <>
    <Header alternates={alternates} allMarketAreas={allMarketAreas} />
    <Box sx={{ mt: [0, 0, "92px"] }}>{children}</Box>
    <Footer />
  </>
);
