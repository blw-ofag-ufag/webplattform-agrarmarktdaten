import * as React from "react";
import { s, c } from "@interactivethings/swiss-federal-ci";
import {
  StructuredText as ST,
  renderNodeRule,
  StructuredTextGraphQlResponse,
  Image,
} from "react-datocms";
import { isHeading, isParagraph, isLink } from "datocms-structured-text-utils";
import { Typography, Box, TypographyProps } from "@mui/material";
import { PowerBIReport } from "@/components/powerbi-report";
import * as GQL from "@/graphql";
import { useIntersectionObserver } from "@/lib/useIntersectionObserver";
import { sectionAtom } from "@/lib/atoms";
import { useSetAtom } from "jotai";
import { FileDownloadSection } from "@/components/FileDownloadSection";
import { HighlightSection } from "@/components/HighlightSection";
import NextLink from "next/link";
import { makeStyles } from "../style-utils";

interface Props {
  data?: StructuredTextGraphQlResponse;
  paragraphTypographyProps: TypographyProps;
}

const useStyles = makeStyles()({
  link: {
    color: "inherit",
    textUnderlineOffset: "2px",
    ":hover": { color: c.monochrome[600] },
  },
});

const defaultParagraphTypographyProps = {
  variant: "body1",
};

const StructuredText = (props: Props) => {
  const { data, paragraphTypographyProps = defaultParagraphTypographyProps } = props;
  const { classes } = useStyles();

  //FIXME: we have to temporarily disable SSR here due to a hydration problem with the FileDownloadSectionRecord bit.
  // I'll take another look at this at a later point
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  let i = 0;
  return (
    isClient && (
      <ST
        data={data}
        customNodeRules={[
          renderNodeRule(isLink, ({ node, children, key }) => {
            return (
              <NextLink key={key} legacyBehavior href={node.url}>
                <Typography
                  variant="inherit"
                  component="a"
                  data-debug-good
                  className={classes.link}
                >
                  {children}
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
                <Header1 key={id} id={id}>
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
                sx={{ mb: s(6) }}
              >
                {children}
              </Typography>
            );
          }),
          renderNodeRule(isParagraph, ({ children, key }) => {
            return (
              <Typography
                data-debug-good
                key={key}
                component="p"
                sx={{ mb: s(4) }}
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
              return <FileDownloadSection key={record.id} data={fileDownloadSection} />;

            case "HighlightSectionRecord":
              const highlightSection = record as Partial<GQL.HighlightSectionRecord>;
              return <HighlightSection key={record.id} data={highlightSection} />;
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
                <Box sx={{ my: s(5) }}>
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
    )
  );
};

interface HeaderProps {
  id: string;
  children: React.ReactNode;
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
    <Typography ref={ref} id={id} data-debug-good variant="h1" component="h1" sx={{ mb: 5, mt: 3 }}>
      {children}
    </Typography>
  );
};

export default StructuredText;
