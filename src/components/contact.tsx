import { Trans } from "@lingui/macro";
import { Box, Link, Typography } from "@mui/material";
import React, { ReactNode } from "react";

import { ContentContainer } from "@/components/content-container";
import Flex from "@/components/flex";
import { Icon, IconName } from "@/icons";

export const Contact = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        m: 0,
        py: 6,
        backgroundColor: "grey.200",
        color: "grey.800",
      }}
    >
      <ContentContainer
        sx={{
          display: "flex",
          flexDirection: ["column", "column", "row"],
          flexFlow: [null, null, "row wrap"],
          justifyContent: ["flex-start", "flex-start", "space-between"],
          px: [4, 4, 0],
        }}
      >
        <Flex
          sx={{
            flexDirection: "column",
            width: ["100%", "100%", "65%"],
            mb: [6, 6, 0],
          }}
        >
          <ContactSection>
            <Trans id="contact.contact">Kontakt</Trans>
          </ContactSection>
          <AddressLine>Bundesamt für Landwirtschaft BLW</AddressLine>
          <AddressLine>Fachbereich Marktanalysen</AddressLine>
          <AddressLine>3003 Bern</AddressLine>
          <AddressLine>
            <Link href="https://www.blw.admin.ch/blw/de/home.html">
              www.blw.admin.ch
            </Link>
          </AddressLine>
        </Flex>
        <Flex sx={{ flexDirection: "column", width: ["100%", "100%", "30%"] }}>
          <ContactSection>
            <Trans id="contact.follow.us">Folgen Sie Uns</Trans>
          </ContactSection>
          <Box>
            <SocialIcon name="facebook" />
            <SocialIcon name="twitter" />
            <SocialIcon name="youtube" />
          </Box>
        </Flex>
      </ContentContainer>
    </Box>
  );
};

const ContactSection = ({ children }: { children: ReactNode }) => (
  <Typography
    sx={{ fontSize: 6, lineHeight: "heading", fontWeight: "bold", mb: 4 }}
  >
    {children}
  </Typography>
);
const AddressLine = ({ children }: { children: ReactNode }) => (
  <Typography sx={{ fontSize: 4, lineHeight: "body", fontWeight: "regular" }}>
    {children}
  </Typography>
);
const SocialIcon = ({ name }: { name: IconName }) => (
  <Box sx={{ display: "inline-block", fontSize: 18, mr: 6, opacity: 0.6 }}>
    <Icon name={name} />
  </Box>
);
