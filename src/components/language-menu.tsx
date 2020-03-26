import { Box, Link } from "@theme-ui/components";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { CurrentPageLink } from "./links";
import { ReactNode } from "react";

const localesOrder = ["de", "en"];

export const LanguageMenu = ({
  alternates
}: {
  alternates?: { href: string; as: string; label: string }[];
}) => {
  const { query } = useRouter();
  const currentLocale = (query.locale as $FixMe) || "de";
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
        justifyContent: ["flex-start", "flex-start", "flex-end"]
      }}
    >
      {alternates
        ? alternates.map(({ href, label, as }) => {
            return (
              <LanguageListItem
                key={label}
                active={label === currentLocale}
                disabled={false}
              >
                <NextLink href={href} as={as} passHref>
                  <Link
                    rel="alternate"
                    hrefLang={label}
                    sx={{ textDecoration: "none", color: "currentColor" }}
                  >
                    {label}
                  </Link>
                </NextLink>
              </LanguageListItem>
            );
          })
        : localesOrder.map(locale => (
            <LanguageListItem
              key={locale}
              active={locale === currentLocale}
              disabled={false}
            >
              <CurrentPageLink locale={locale} passHref>
                <Link
                  rel="alternate"
                  hrefLang={locale}
                  sx={{ textDecoration: "none", color: "currentColor" }}
                >
                  {locale}
                </Link>
              </CurrentPageLink>
            </LanguageListItem>
          ))}
      <LanguageListItem key={"fr"} active={false} disabled={true}>
        fr
      </LanguageListItem>
      <LanguageListItem key={"it"} active={false} disabled={true}>
        it
      </LanguageListItem>
    </Box>
  );
};

const LanguageListItem = ({
  active,
  disabled,
  children
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

      color: disabled ? "monochrome600" : "text",
      pointerEvents: disabled ? "none" : "inherit",
      cursor: disabled ? "inherit" : "pointer",

      "&:hover": {
        fontWeight: disabled ? "light" : "extraBold"
      }
    }}
  >
    {children}
  </Box>
);
