import { Box, Link } from "@theme-ui/components";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { CurrentPageLink } from "./links";

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
        mt: "-4px",
        width: "auto",
        bg: "transparent",
        justifyContent: ["flex-start", "flex-start", "flex-end"]
      }}
    >
      {alternates
        ? alternates.map(({ href, label, as }) => {
            return (
              <Box key={as} as="li" sx={{ ml: 1, p: 0, width: "32px" }}>
                <NextLink href={href} as={as} passHref>
                  <Link
                    rel="alternate"
                    hrefLang={label}
                    sx={{
                      fontSize: [4, 4, 3],
                      lineHeight: "heading",
                      fontWeight:
                        label === currentLocale ? "extraBold" : "light",
                      p: [0, 0, 1],
                      textTransform: "uppercase",
                      textDecoration: "none",
                      color: "text",

                      transition: "font-weight .2s",

                      "&:hover": {
                        fontWeight: "extraBold"
                      }
                    }}
                  >
                    {label}
                  </Link>
                </NextLink>
              </Box>
            );
          })
        : localesOrder.map(locale => (
            <Box as="li" key={locale} sx={{ ml: 1, p: 0, width: "32px" }}>
              <CurrentPageLink locale={locale} passHref>
                <Link
                  rel="alternate"
                  hrefLang={locale}
                  sx={{
                    fontSize: [4, 4, 3],
                    lineHeight: [1, 1, 3],
                    fontWeight:
                      locale === currentLocale ? "extraBold" : "light",
                    p: [0, 0, 1],
                    textTransform: "uppercase",
                    textDecoration: "none",
                    color: "text",

                    transition: "font-weight .2s",

                    "&:hover": {
                      fontWeight: "extraBold"
                    }
                  }}
                >
                  {locale}
                </Link>
              </CurrentPageLink>
            </Box>
          ))}
    </Box>
  );
};
