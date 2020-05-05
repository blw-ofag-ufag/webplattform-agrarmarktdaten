import { Trans } from "@lingui/macro";
import NextLink from "next/link";
import { ReactNode } from "react";
import { Box, Flex, Link, Text } from "theme-ui";
import { Icon } from "../icons";
import { useLocale } from "@interactivethings/visualize-app";

export const ReportCard = ({
  type,
  title,
  url,
}: {
  type: "report" | "data";
  title: string | ReactNode;
  url: string;
}) => {
  const locale = useLocale();

  const isReport = type === "report";
  return (
    <Box
      sx={{ width: ["100%", "100%", "49.5%"], mb: 4, display: "inline-block" }}
    >
      <Box
        sx={{
          bg: isReport ? "primary" : "primaryLighter",
          px: 4,
          pt: 4,
          pb: 6,
        }}
      >
        <Flex
          sx={{
            justifyContent: "space-between",
            color: isReport ? "monochrome100" : "text",
            svg: {
              fontSize: "5rem",
              fill: "monochrome100",
            },
          }}
        >
          <Box>
            <Text
              sx={{
                textTransform: "uppercase",
                fontSize: 4,
                fontWeight: "bold",
                lineHeight: "heading",
                textAlign: "left",
                color: isReport ? "monochrome100" : "text",
                opacity: 0.4,
                mb: 1,
              }}
            >
              {isReport ? (
                <Trans id="article.card.report.month">Grafik des Monats</Trans>
              ) : (
                <Trans id="article.card.data">Datenbankabfrage</Trans>
              )}
            </Text>
            <Text
              sx={{
                fontSize: 6,
                fontWeight: "extraBold",
                lineHeight: "heading",
                textAlign: "left",
                color: isReport ? "monochrome100" : "text",
                minHeight: 75,
              }}
            >
              {title}
            </Text>
          </Box>
          {isReport && <Icon name="powerbi" />}
        </Flex>
      </Box>
      <Link
        href={url}
        sx={{
          textDecoration: "none",
        }}
      >
        <Box
          sx={{
            bg: isReport ? "primary" : "primaryLighter",
            borderTopWidth: "1px",
            borderTopColor: "monochrome100",
            borderTopStyle: "solid",
            py: 4,
            color: isReport ? "monochrome100" : "primary",
            fontWeight: "bold",
            textAlign: "center",
            "&:hover": isReport
              ? { bg: "primaryHover" }
              : { filter: "brightness(0.95)" },
          }}
        >
          {isReport ? (
            <NextLink href="/[locale]/report" as={`/${locale}/report`} passHref>
              <Link
                as="a"
                sx={{
                  textDecoration: "none",
                  color: "monochrome100",
                  "&:hover": { color: "monochrome100" },
                }}
              >
                <Trans id="article.link.open.report">Report öffnen</Trans>
              </Link>
            </NextLink>
          ) : (
            <NextLink
              href="/[locale]/create/[chartId]"
              as={`/${locale}/create/new`}
              passHref
            >
              <Link
                as="a"
                sx={{
                  textDecoration: "none",
                  color: "primary",
                  ":hover": {
                    color: "primary",
                    filter: "brightness(0.97)",
                  },
                }}
              >
                <Trans id="article.link.data.explore">Daten abfragen</Trans>
              </Link>
            </NextLink>
          )}
        </Box>
      </Link>
    </Box>
  );
};
