import { FileDownloadSection } from "@/components/FileDownloadSection";
import { HighlightSection } from "@/components/HighlightSection";
import useStructuredTextStyles from "@/components/StructuredText/useStructuredTextStyles";
import { PowerBIReport } from "@/components/powerbi-report";
import * as GQL from "@/graphql";
import { sectionAtom } from "@/lib/atoms";
import { useIntersectionObserver } from "@/lib/useIntersectionObserver";
import { c, s } from "@interactivethings/swiss-federal-ci";
import { OpenInNew } from "@mui/icons-material";
import {
  Box,
  BoxProps,
  List,
  Typography,
  TypographyOwnProps,
  TypographyProps,
} from "@mui/material";
import { isHeading, isLink, isList, isParagraph } from "datocms-structured-text-utils";
import { useSetAtom } from "jotai";
import NextLink from "next/link";
import * as React from "react";
import {
  Image,
  StructuredText as ST,
  StructuredTextGraphQlResponse,
  renderNodeRule,
} from "react-datocms";

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
  const { classes } = useStructuredTextStyles({ debug: props.debug });

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
                    pages={
                      powerBiReport.pages?.map((d) => ({ name: d.name!, id: d.pageId! })) ?? []
                    }
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
