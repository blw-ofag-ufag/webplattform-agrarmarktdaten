import { Typography, Box, Button } from "@mui/material";
import * as GQL from "@/graphql";
import { s, c } from "@interactivethings/swiss-federal-ci";
import { StructuredText, renderNodeRule, StructuredTextGraphQlResponse } from "react-datocms";
import { isHeading, isParagraph, isLink } from "datocms-structured-text-utils";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface Props {
  data: Partial<GQL.HighlightSectionRecord>;
}

const HighlightSection = (props: Props) => {
  const { data } = props;
  const { locale } = useRouter();
  return (
    <Box
      key={data.id}
      sx={{
        position: "relative",
        border: `${c.cobalt[100]} 4px solid`,
        borderRadius: "12px",
        backgroundColor: `${c.cobalt[50]}50`,
        paddingX: s(20),
        paddingBottom: s(12),
        paddingTop: s(15),
        marginTop: s(10),
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -15,
          left: 80,
          backgroundColor: c.cobalt[100],
          width: "fit-content",
          borderRadius: 100,
          paddingY: s(1),
          paddingX: s(3),
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 700, color: c.cobalt[800] }}>
          {data.title}
        </Typography>
      </Box>
      {data.content && (
        <StructuredText
          data={
            data.content as unknown as StructuredTextGraphQlResponse /* FIXME: Review this type, it should match*/
          }
          customNodeRules={[
            renderNodeRule(isHeading, ({ children, key }) => (
              <Typography key={key} variant="h4" component="h4" sx={{ mb: s(6) }}>
                {children}
              </Typography>
            )),
            renderNodeRule(isParagraph, ({ children, key }) => (
              <Typography key={key} variant="body1" component="p" sx={{ mb: s(4) }}>
                {children}
              </Typography>
            )),
            renderNodeRule(isLink, ({ node, children, key }) => (
              <Typography
                variant="body1"
                component="a"
                sx={{
                  color: "inherit",
                  textUnderlineOffset: "2px",
                  ":hover": { color: "#4B5563" },
                }}
                key={key}
                href={node.url}
              >
                {children}
              </Typography>
            )),
          ]}
          renderInlineRecord={({ record }) => {
            switch (record.__typename) {
              case "HighlightSectionFileRecord":
                const sectionFile = record as Partial<GQL.HighlightSectionFileRecord>;
                return (
                  <Button
                    href={sectionFile.file?.url}
                    sx={{
                      bgcolor: c.cobalt[500],
                      mr: s(3),
                      px: s(3),
                      py: s(2),
                      lineHeight: "18px",
                      minHeight: "auto",
                    }}
                  >
                    Download
                  </Button>
                );
              case "HighlightSectionLinkRecord":
                const sectionLink = record as Partial<GQL.HighlightSectionLinkRecord>;
                switch (sectionLink.link?.__typename) {
                  case "BlogPostRecord":
                    return (
                      <NextLink href={`/${locale}/blog/${sectionLink.link.slug}`}>
                        <Button
                          sx={{
                            bgcolor: c.cobalt[500],
                            mr: s(3),
                            px: s(3),
                            py: s(2),
                            lineHeight: "18px",
                            minHeight: "auto",
                          }}
                        >
                          {sectionLink.title}
                        </Button>
                      </NextLink>
                    );
                  case "FocusArticleRecord":
                    return (
                      <NextLink href={`/${locale}/focus/${sectionLink.link.slug}`}>
                        <Button
                          sx={{
                            bgcolor: c.cobalt[500],
                            mr: s(3),
                            px: s(3),
                            py: s(2),
                            lineHeight: "18px",
                            minHeight: "auto",
                          }}
                        >
                          {sectionLink.title}
                        </Button>
                      </NextLink>
                    );
                  case "MarketArticleRecord":
                    return (
                      <NextLink href={`/${locale}/market/${sectionLink.link.slug}`}>
                        <Button
                          sx={{
                            bgcolor: c.cobalt[500],
                            mr: s(3),
                            px: s(3),
                            py: s(2),
                            lineHeight: "18px",
                            minHeight: "auto",
                          }}
                        >
                          {sectionLink.title}
                        </Button>
                      </NextLink>
                    );
                  case "MethodsPageRecord":
                    return (
                      <NextLink href={`/${locale}/methods`}>
                        <Button
                          sx={{
                            bgcolor: c.cobalt[500],
                            mr: s(3),
                            px: s(3),
                            py: s(2),
                            lineHeight: "18px",
                            minHeight: "auto",
                          }}
                        >
                          {sectionLink.title}
                        </Button>
                      </NextLink>
                    );
                  default:
                    return null;
                }
                break;
              default:
                return null;
            }
          }}
        />
      )}
    </Box>
  );
};

export default HighlightSection;
