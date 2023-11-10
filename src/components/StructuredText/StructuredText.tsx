import * as React from "react";
import { s, c } from "@interactivethings/swiss-federal-ci";
import {
  StructuredText as ST,
  renderNodeRule,
  StructuredTextGraphQlResponse,
  Image,
} from "react-datocms";
import { isHeading, isParagraph, isLink, isList } from "datocms-structured-text-utils";
import {
  Typography,
  Box,
  TypographyOwnProps,
  List,
  BoxProps,
  TypographyProps,
} from "@mui/material";
import { PowerBIReport } from "@/components/powerbi-report";
import * as GQL from "@/graphql";
import { useIntersectionObserver } from "@/lib/useIntersectionObserver";
import { sectionAtom } from "@/lib/atoms";
import { useSetAtom } from "jotai";
import { FileDownloadSection } from "@/components/FileDownloadSection";
import { HighlightSection } from "@/components/HighlightSection";
import NextLink from "next/link";
import { makeStyles } from "../style-utils";
import { CSSInterpolation } from "tss-react";
import { OpenInNew } from "@mui/icons-material";

const debugStyles = {
  position: "absolute" as "absolute",
  background: "hotpink",
  top: 0,
  right: 0,
} as Record<string, CSSInterpolation>;

/**
 * Following specification
 * @see https://www.notion.so/interactivethings/Refinements-Text-and-styles-177ccb469c30467087006f4d37c29c04?pvs=4
 */
const useStyles = makeStyles<
  { debug?: boolean },
  "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "ul"
>()((theme, { debug }, classes) => {
  const debugStyle = (name: string, rules: Record<string, CSSInterpolation>) => {
    return {
      ...(debug
        ? {
            position: "relative" as "relative",
            "&:after": {
              content: `'${name}'`,
              ...debugStyles,
            },
          }
        : {}),
      ...rules,
    };
  };

  const margins = {
    xs: {
      marginTop: 12,
      background: debug ? "yellow" : undefined,
    },
    md: {
      marginTop: 16,
      background: debug ? "orange" : undefined,
    },
    lg: {
      marginTop: 24,
      background: debug ? "green" : undefined,
    },
    xl: {
      marginTop: 32,
      background: debug ? "blue" : undefined,
    },
    xxl: {
      marginTop: 64,
      background: debug ? "red" : undefined,
    },
  };

  return {
    content: {
      color: theme.palette.monochrome[800],
      paddingBottom: 124,

      "& img": {
        marginTop: 32,
        marginBottom: 32,
      },
    },
    link: {
      color: "inherit",
      textUnderlineOffset: "2px",
      ":hover": { color: c.monochrome[600] },
    },

    p: debugStyle("p", {
      "& + & ": margins.lg,

      "& ul": {
        background: debug ? "grey" : undefined,
      },

      "ul &": {
        marginBottom: 0,
      },

      [`.${classes.h1} + &, .${classes.h2} + &`]: margins.lg,
    }),
    h1: debugStyle("h1", {
      fontWeight: 700,
      [`.${classes.p} + &, .${classes.ul} + &`]: margins.xxl,
    }),
    h2: debugStyle("h2", {
      fontWeight: 700,
      [`.${classes.p} + &, .${classes.ul} + &`]: margins.xl,
      [`.${classes.h1} + &`]: margins.xs,
    }),
    h3: debugStyle("h3", {
      fontWeight: 700,
      [`.${classes.h2} + &`]: margins.xs,
      [`.${classes.p} + &`]: margins.md,
      [`& + .${classes.p}`]: margins.md,
    }),
    h4: debugStyle("h4", {}),
    h5: debugStyle("h5", {}),
    h6: debugStyle("h6", {}),

    ul: {
      listStyleType: "disc",
      margin: "1rem",
      listStylePosition: "outside",

      "& > li": {
        paddingLeft: "0.5rem",
      },

      "& > li + li": {
        marginTop: "0.25rem",
      },
    },

    specialSection: {
      marginTop: 64,
      marginBottom: 64,
    },
  };
});

const defaultParagraphTypographyProps = {
  variant: "body1",
};

interface Props {
  data?: StructuredTextGraphQlResponse;
  paragraphTypographyProps?: TypographyOwnProps & { component?: TypographyProps["component"] };
  debug?: boolean;
  sx?: BoxProps["sx"];
}

const StructuredText = (props: Props) => {
  const { data, paragraphTypographyProps = defaultParagraphTypographyProps } = props;
  const { classes } = useStyles({ debug: props.debug });

  //FIXME: we have to temporarily disable SSR here due to a hydration problem with the FileDownloadSectionRecord bit.
  // I'll take another look at this at a later point
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  let i = 0;

  return (
    isClient && (
      <Box className={classes.content} sx={props.sx}>
        <ST
          data={data}
          customNodeRules={[
            renderNodeRule(isLink, ({ node, children, key }) => {
              const target = node.meta?.find((e) => e.id === "target")?.value;
              const rel = node.meta?.find((e) => e.id === "rel")?.value;
              return (
                <NextLink key={key} legacyBehavior href={node.url}>
                  <Typography
                    variant="inherit"
                    component="a"
                    data-debug-good
                    className={classes.link}
                    rel={rel}
                    target={target}
                  >
                    {children}
                    {target === "_blank" ? (
                      <Box display="inline-block" component="span" fontSize="0.85em" ml="0.25rem">
                        <OpenInNew fontSize="inherit" />
                      </Box>
                    ) : null}
                  </Typography>
                </NextLink>
              );
            }),
            renderNodeRule(isHeading, ({ node, children, key }) => {
              //We don't allow h6 headers to be able to save those for the table of contents menu
              if (node.level === 6) {
                return null;
              }
              //We save the ids of h1s in order to then easily scroll to them
              let id = undefined;
              if (node.level === 1) {
                i += 1;
                id = `heading${i}`;
                return (
                  <Header1 key={id} id={id} className={classes.h1}>
                    {children}
                  </Header1>
                );
              }
              return (
                <Typography
                  key={key}
                  id={id}
                  data-debug-good
                  variant={`h${node.level}`}
                  component={`h${node.level}`}
                  className={classes[`h${node.level}` as `h${typeof node.level}`]}
                >
                  {children}
                </Typography>
              );
            }),

            renderNodeRule(isList, ({ children }) => {
              return <List className={classes.ul}>{children}</List>;
            }),
            renderNodeRule(isParagraph, ({ children, key }) => {
              return (
                <Typography
                  key={key}
                  /** @ts-ignore */
                  variant="body1"
                  component="p"
                  className={classes.p}
                  {...paragraphTypographyProps}
                >
                  {children}
                </Typography>
              );
            }),
          ]}
          renderInlineRecord={({ record }) => {
            switch (record.__typename) {
              case "PowerBiReportRecord":
                const powerBiReport = record as Partial<GQL.PowerBiReportRecord>;
                return (
                  <PowerBIReport
                    key={record.id}
                    datasetId={powerBiReport.dataset?.datasetId ?? ""}
                    reportId={powerBiReport?.reportId ?? ""}
                    reportWorkspaceId={powerBiReport.workspace?.workspaceId ?? ""}
                  />
                );
              case "FileDownloadSectionRecord":
                const fileDownloadSection = record as Partial<GQL.FileDownloadSectionRecord>;
                return (
                  <FileDownloadSection
                    key={record.id}
                    data={fileDownloadSection}
                    className={classes.specialSection}
                  />
                );

              case "HighlightSectionRecord":
                const highlightSection = record as Partial<GQL.HighlightSectionRecord>;
                return (
                  <HighlightSection
                    key={record.id}
                    data={highlightSection}
                    className={classes.specialSection}
                  />
                );
              default:
                return null;
            }
          }}
          renderLinkToRecord={({ record, children, transformedMeta }) => {
            let url = "";
            switch (record.__typename) {
              case "BlogPostRecord": {
                url += `/blog/${record.slug}`;
                break;
              }
              case "TermsPageRecord": {
                url += `/terms`;
                break;
              }
              case "MethodsPageRecord": {
                url += `/methods`;
                break;
              }
              case "MarketArticleRecord": {
                url += `/market/${record.slug}`;
                break;
              }
              case "LegalPageRecord": {
                url += `/legal`;
                break;
              }
              case "FocusArticleRecord": {
                url += `/focus/${record.slug}`;
                break;
              }
              case "AnalysisPageRecord": {
                url += `/analysis`;
                break;
              }
              case "DataPageRecord": {
                url += `/data`;
                break;
              }
            }
            return (
              <NextLink {...transformedMeta} legacyBehavior href={url}>
                <Typography
                  variant="inherit"
                  component="a"
                  data-debug-good
                  className={classes.link}
                  key={record.id}
                  href={url}
                >
                  {children}
                </Typography>
              </NextLink>
            );
          }}
          renderBlock={({ record }) => {
            switch (record.__typename) {
              case "DataButtonRecord": {
                const { url, label } = record as GQL.DataButtonRecord;
                return (
                  <NextLink legacyBehavior href={url ?? ""}>
                    <Typography
                      sx={{
                        px: 3,
                        py: 2,
                        color: c.cobalt[500],
                        width: "fit-content",
                        cursor: "pointer",
                        borderRadius: "4px",
                        ":hover": { bgcolor: c.cobalt[100] },
                      }}
                    >
                      {label}
                    </Typography>
                  </NextLink>
                );
              }
              case "ImageTeaserBlockRecord":
                const image =
                  record.imageTeaserAsset as unknown as GQL.ImageTeaserBlockRecord["imageTeaserAsset"];
                return image?.responsiveImage ? (
                  <Box sx={{ my: "32px" }}>
                    {/*eslint-disable-next-line jsx-a11y/alt-text*/}
                    <Image data={image?.responsiveImage} layout="responsive" />
                    <Typography variant="body1" sx={{ mt: s(3), color: c.monochrome[500] }}>
                      {image.responsiveImage.title}
                    </Typography>
                  </Box>
                ) : null;
              default:
                return null;
            }
          }}
        />
      </Box>
    )
  );
};

interface HeaderProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const Header1 = (props: HeaderProps) => {
  const { id, children } = props;
  const ref = React.useRef(null);
  const entry = useIntersectionObserver(ref, { rootMargin: "0%", threshold: 1.0 });
  const setSection = useSetAtom(sectionAtom);

  React.useEffect(() => {
    if (entry?.intersectionRatio === 1.0) {
      setSection(id);
    }
  }, [entry, setSection, id]);

  return (
    <Typography
      ref={ref}
      id={id}
      data-debug-good
      variant="h1"
      component="h1"
      className={props.className}
    >
      {children}
    </Typography>
  );
};

export default StructuredText;
