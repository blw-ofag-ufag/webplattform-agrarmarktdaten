import { Trans } from "@lingui/macro";
import { Box, Button, Link, Typography } from "@mui/material";
import Flex from "../../components/flex";
import { default as NextLink } from "next/link";
import React from "react";

export const InfografikTeaser = () => {
  return (
    <NextLink href="/infografik" passHref>
      <Flex
        component="a"
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 4,
          py: 6,
          backgroundImage: `url("/img/infografik-teaser.png")`,
          backgroundSize: "cover",
          cursor: "pointer",
          color: "text",
          textDecoration: "none",
        }}
      >
        <Typography
          sx={{
            fontSize: 4,
            fontWeight: "bold",
            lineHeight: "body",
            textTransform: "uppercase",
            opacity: 0.6,
          }}
        >
          <Trans id="infografic">Infografik</Trans>
        </Typography>
        <Typography
          sx={{
            fontSize: 6,
            fontWeight: "extraBold",
            lineHeight: "body",
            textAlign: "center",
            textTransform: "capitalize",
            mb: 4,
          }}
        >
          <Trans id="infografik.title">Schweizer Kartoffelmarkt</Trans>
        </Typography>
        <Button
          variant="primary"
          sx={{
            backgroundColor: "potato",
            fontSize: 4,
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "potatoHover",
            },
            "&:active": {
              backgroundColor: "potatoActive",
            },
          }}
        >
          <Trans id="button.infografic.teaser">Infografik Ansehen</Trans>
        </Button>
      </Flex>
    </NextLink>
  );
};

export const InfografikTeaserLarge = () => {
  return (
    <Flex
      sx={{
        flexDirection: ["column", "column", "row"],
        justifyContent: ["flex-start", "flex-start", "space-between"],
        alignItems: "flex-start",
        p: [5, 5, 6],
        backgroundImage: `url("/img/infografik-teaser-large-bg.png")`,
        backgroundSize: "cover",
        color: "text",
      }}
    >
      <Box sx={{ order: [2, 2, 1], width: ["100%", "100%", "50%"] }}>
        <Typography
          sx={{
            fontSize: 4,
            fontWeight: "bold",
            lineHeight: "body",
            textTransform: "uppercase",
            opacity: 0.6,
          }}
        >
          <Trans id="infografic.date">2018</Trans>
        </Typography>
        <Typography
          sx={{
            fontSize: 6,
            fontWeight: "extraBold",
            lineHeight: "heading",
            textAlign: "left",
            textTransform: "capitalize",
            mb: 4,
          }}
        >
          <Trans id="infografik.title">Schweizer Kartoffelmarkt</Trans>
        </Typography>
        <Typography
          sx={{
            fontSize: 5,
            fontWeight: "regular",
            lineHeight: "body",
            textAlign: "left",
            mb: 6,
          }}
        >
          <Trans id="infografik.teaser">
            In der Schweiz wachsen auf mehr als 10'000 Hektaren Kartoffeln. Das
            sind etwa 14'000 Fussballfelder voller toller Knollen. Die
            geernteten 400'000 Tonnen landen schliesslich über das ganze Jahr
            hindurch auf unserem Teller.
          </Trans>
        </Typography>
        <NextLink href="/infografik" passHref>
          <Link
            variant="primary"
            sx={{
              backgroundColor: "potato",
              fontSize: 4,
              fontWeight: "bold",
              textDecoration: "none",
              width: ["100%", "100%", "auto"],
              px: [3, 4, 7],
              py: 3,
              color: "grey.100",
              "&:hover": {
                backgroundColor: "potatoHover",
                filter: "brightness(100%)",
              },
              "&:active": {
                backgroundColor: "potatoActive",
                filter: "brightness(100%)",
              },
            }}
          >
            <Trans id="button.infografic.teaser">Infografik Ansehen</Trans>
          </Link>
        </NextLink>
      </Box>
      <Box sx={{ order: [1, 1, 2], width: ["100%", "100%", "50%"] }}>
        <img
          src="/img/infografik-teaser-large-illustration.png"
          alt="infografic teaser"
          style={{ width: "100%" }}
        />
      </Box>
    </Flex>
  );
};
