import { Trans } from "@lingui/macro";
import { Box, Link, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import NextLink from "next/link";
import { ReactNode } from "react";

import Flex from "@/components/flex";

// Dynamic import to escape SSR:
// The "window" object needs to be available to embed powerBI report
const DynamicReportTeaser = dynamic(
  () => import("../components/powerbi-teaser"),
  {
    ssr: false,
  }
);

export const ReportCard = ({
  type,
}: {
  type: "report" | "data";
  title: string | ReactNode;
  url: string;
}) => {
  const isReport = type === "report";
  return (
    <Box
      sx={{
        width: ["100%", "100%", "100%"],
        mb: 4,
        // display: "inline-block"
      }}
    >
      {isReport ? (
        <Box
          sx={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "muted",
          }}
        >
          <Box
            sx={{
              height: [200, 350, 550],
              p: 4,
              iframe: {
                border: 0,
              },
            }}
          >
            <DynamicReportTeaser />
          </Box>
          <NextLink href="/report" passHref legacyBehavior>
            <Link
              component="a"
              sx={{
                textDecoration: "none",
                color: "primary",
                ":hover": {
                  color: "primary",
                  filter: "brightness(0.97)",
                },
              }}
            >
              <Box
                sx={{
                  backgroundColor: "primaryLighter",
                  borderTopWidth: "1px",
                  borderTopColor: "grey.100",
                  borderTopStyle: "solid",
                  py: 4,
                  color: "primary",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                <Trans id="article.link.open.report">Report öffnen</Trans>
              </Box>
            </Link>
          </NextLink>
        </Box>
      ) : (
        <Box
          sx={{
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
          }}
        >
          <Flex
            sx={{
              // backgroundColor: isReport ? "primary" : "primaryLighter",
              // height: 175,
              justifyContent: "center",
              // px: 4,
              // pt: 4,
              // pb: 6,
              p: 2,
            }}
          >
            <iframe
              title="iframe"
              src="https://visualize.admin.ch/de/embed/snX1MN6MKTsy"
              style={{ border: "0px #ffffff none" }}
              name="visualize.admin.ch"
              scrolling="no"
              frameBorder="1"
              marginHeight={0}
              marginWidth={0}
              height="620px"
              width="600px"
              allowFullScreen
            ></iframe>
            {/* <Flex
            sx={{
              justifyContent: "space-between",
              color: isReport ? "grey.100" : "text",
              svg: {
                fontSize: "5rem",
                fill: "grey.100",
              },
            }}
          >
            <Box>
              <Typography
                sx={{
                  textTransform: "uppercase",
                  fontSize: 4,
                  fontWeight: "bold",
                  lineHeight: "heading",
                  textAlign: "left",
                  color: isReport ? "grey.100" : "text",
                  opacity: 0.4,
                  mb: 1,
                }}
              >
                <Trans id="article.card.data">Datenbankabfrage</Trans>
              </Typography>
              <Typography
                sx={{
                  fontSize: 6,
                  fontWeight: "extraBold",
                  lineHeight: "heading",
                  textAlign: "left",
                  color: isReport ? "grey.100" : "text",
                  minHeight: 75,
                }}
              >
                {title}
              </Typography>
            </Box>
          </Flex> */}
          </Flex>
          <NextLink
            href="/create/[chartId]"
            as="/create/new"
            passHref
            legacyBehavior
          >
            <Link
              component="a"
              sx={{
                textDecoration: "none",
                color: "primary",
                ":hover": {
                  color: "primary",
                  filter: "brightness(0.97)",
                },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  backgroundColor: "primary.light",
                  borderTopWidth: "1px",
                  borderTopColor: "grey.100",
                  borderTopStyle: "solid",
                  py: 4,
                  color: "primary.main",
                  textAlign: "center",
                }}
              >
                <Trans id="article.link.data.explore">Daten abfragen</Trans>
              </Typography>
            </Link>
          </NextLink>
        </Box>
      )}
    </Box>
  );
};
