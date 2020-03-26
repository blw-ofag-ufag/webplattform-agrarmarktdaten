import React, { ReactNode } from "react";
import { Flex, Text, Box, Link } from "@theme-ui/components";
import { Trans } from "@lingui/macro";
import { Icon, IconName } from "../icons";

export const Contact = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        m: 0,
        py: 6,
        bg: "monochrome200",
        color: "monochrome800"
      }}
    >
      <Flex
        sx={{
          flexDirection: ["column", "column", "row"],
          justifyContent: ["flex-start", "flex-start", "space-between"],
          flexFlow: [null, null, "row wrap"],
          maxWidth: "77rem",
          mx: "auto",
          px: [4, 4, 0]
        }}
      >
        <Box sx={{ width: ["100%", "100%", "65%"], mb: [6, 6, 0] }}>
          <ContactSection>
            <Trans id="contact.contact">Kontakt</Trans>
          </ContactSection>
          <AddressLine>Bundesamt für Landwirtschaft BLW</AddressLine>
          <AddressLine>Fachbereich Marktanalyse</AddressLine>
          <AddressLine>3003 Bern</AddressLine>
          <AddressLine>
            <Link href="https://www.blw.admin.ch/blw/de/home.html">
              www.blw.admin.ch
            </Link>
          </AddressLine>
        </Box>
        <Box sx={{ width: ["100%", "100%", "30%"] }}>
          <ContactSection>
            <Trans id="contact.follow.us">Folgen Sie Uns</Trans>
          </ContactSection>
          <Box>
            <SocialIcon name="facebook" />
            <SocialIcon name="twitter" />
            <SocialIcon name="youtube" />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

const ContactSection = ({ children }: { children: ReactNode }) => (
  <Text sx={{ fontSize: 6, lineHeight: "heading", fontWeight: "bold", mb: 4 }}>
    {children}
  </Text>
);
const AddressLine = ({ children }: { children: ReactNode }) => (
  <Text sx={{ fontSize: 4, lineHeight: "body", fontWeight: "regular" }}>
    {children}
  </Text>
);
const SocialIcon = ({ name }: { name: IconName }) => (
  <Box sx={{ display: "inline-block", fontSize: 5, mr: 6, opacity: 0.6 }}>
    <Icon name={name} />
  </Box>
);
