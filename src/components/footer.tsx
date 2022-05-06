import { Trans } from "@lingui/macro";
import { Box, Typography } from "@mui/material";
import React, { ReactNode } from "react";

import { Contact } from "@/components/contact";
import Flex from "@/components/flex";


export const Footer = () => {
  return (
    <Box component="footer" sx={{ mt: 8 }}>
      <Contact />
      <Flex
        sx={{
          justifyContent: ["flex-start", "flex-start", "flex-end"],
          flexFlow: "row wrap",
          width: "100vw",
          px: 4,
          py: 4,
          backgroundColor: "grey.300",
          color: "grey.800",
        }}
      >
        <FooterItem>
          <Trans id="footer.impressum">Impressum</Trans>
        </FooterItem>
        <FooterItem>
          <Trans id="footer.legal">Rechtliche Grundlagen</Trans>
        </FooterItem>
        <FooterItem>
          <Trans id="footer.dataprotection">Datenschutzverordnung</Trans>
        </FooterItem>
      </Flex>
    </Box>
  );
};

const FooterItem = ({ children }: { children: ReactNode }) => (
  <Typography sx={{ fontSize: 4, fontWeight: "medium", mx: 4, my: 2 }}>
    {children}
  </Typography>
);
