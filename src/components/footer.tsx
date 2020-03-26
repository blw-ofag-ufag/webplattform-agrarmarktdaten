import React, { ReactNode } from "react";
import { Flex, Text, Box } from "@theme-ui/components";
import { Trans } from "@lingui/macro";
import { Contact } from "./contact";

export const Footer = () => {
  return (
    <Box as="footer" sx={{ mt: 8 }}>
      <Contact />
      <Flex
        sx={{
          justifyContent: ["flex-start", "flex-start", "flex-end"],
          flexFlow: "row wrap",
          width: "100vw",
          px: 4,
          py: 4,
          bg: "monochrome300",
          color: "monochrome800"
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
  <Text sx={{ fontSize: 4, fontWeight: "medium", mx: 4, my: 2 }}>
    {children}
  </Text>
);
