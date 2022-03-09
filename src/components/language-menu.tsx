import { Box, Link } from "@theme-ui/components";
import NextLink from "next/link";
import { ReactNode } from "react";
import { useLocale } from "../lib/use-locale";
import { locales } from "../locales/locales";
import { CurrentPageLink } from "./links";

export const LanguageMenu = ({
  alternates,
}: {
  alternates?: { href: string; as: string; locale: string }[];
}) => {
  const locale = useLocale();

  return (
    <Box
      as="ul"
      sx={{
        display: "flex",

        listStyle: "none",
        px: [4, 4, 0],
        py: [5, 5, 0],
        ml: [0, "auto"],
        mt: [0, 0, "-9px"],
        width: "auto",
        bg: "transparent",
        justifyContent: ["flex-start", "flex-start", "flex-end"],
      }}
    >
      {alternates
        ? alternates.map((d) => {
            return (
              <LanguageListItem
                key={d.locale}
                active={d.locale === locale}
                disabled={false}
              >
                <NextLink href={d.href} as={d.as} locale={d.locale} passHref>
                  <Link
                    rel="alternate"
                    hrefLang={d.locale}
                    sx={{ textDecoration: "none", color: "currentColor" }}
                  >
                    {d.locale}
                  </Link>
                </NextLink>
              </LanguageListItem>
            );
          })
        : locales.map((d) => (
            <LanguageListItem key={d} active={d === locale} disabled={false}>
              <CurrentPageLink locale={d} passHref>
                <Link
                  rel="alternate"
                  hrefLang={d}
                  sx={{ textDecoration: "none", color: "currentColor" }}
                >
                  {d}
                </Link>
              </CurrentPageLink>
            </LanguageListItem>
          ))}
    </Box>
  );
};

const LanguageListItem = ({
  active,
  disabled,
  children,
}: {
  active: boolean;
  disabled: boolean;
  children: ReactNode;
}) => (
  <Box
    as="li"
    sx={{
      ml: 1,

      width: "32px",
      fontSize: [4, 4, 3],
      lineHeight: [1, 1, 3],
      fontWeight: active ? "extraBold" : "light",
      p: [0, 0, 1],
      textTransform: "uppercase",
      textDecoration: "none",
      transition: "font-weight .2s",

      color: "text",
      opacity: disabled ? 0.65 : 1,
      pointerEvents: disabled ? "none" : "inherit",
      cursor: disabled ? "inherit" : "pointer",

      "&:hover": {
        fontWeight: disabled ? "light" : "extraBold",
      },
    }}
  >
    {children}
  </Box>
);
