import { FileDownloadSection } from "@/components/FileDownloadSection";
import { HighlightSection } from "@/components/HighlightSection";
import useStructuredTextStyles from "@/components/StructuredText/useStructuredTextStyles";
import { PowerBIReport } from "@/components/powerbi-report";
import * as GQL from "@/graphql";
import { sectionAtom } from "@/lib/atoms";
import { useIntersectionObserver } from "@/lib/useIntersectionObserver";
import { InlineRecord, InternalLink } from "@/utils/dato";
import { c } from "@interactivethings/swiss-federal-ci";
import { OpenInNew } from "@mui/icons-material";
import {
  Box,
  Button,
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
import NextImage from "next/image";
import { PowerBIFullScreen } from "@/components/PowerBIFullScreen";
import { t } from "@lingui/macro";
import { atom } from "jotai";

const defaultParagraphTypographyProps = {
  variant: "body1",
};

interface Props {
  data?: StructuredTextGraphQlResponse;
  paragraphTypographyProps?: TypographyOwnProps & { component?: TypographyProps["component"] };
  debug?: boolean;
  sx?: BoxProps["sx"];
}

const DebugStructuredText = React.createContext({
  debug: false as boolean | undefined,
});

export const useStructuredTextDebug = () => React.useContext(DebugStructuredText);

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
      <DebugStructuredText.Provider value={{ debug: props.debug }}>
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
            renderInlineRecord={({ record: _record }) => {
              const record = _record as InlineRecord;
              switch (record.__typename) {
                case "PowerBiReportRecord":
                  const powerBiReport = record as Partial<GQL.PowerBiReportRecord>;
                  const pages =
                    powerBiReport.pages?.map((d) => ({ name: d.name!, id: d.pageId! })) ?? [];
                  const currentPageAtom = atom<{ name: string; id: string }>(pages[0]);
                  return (
                    <div style={{ position: "relative" }}>
                      <PowerBIFullScreen
                        label={t({ id: "controls.fullscreen", message: "Full Screen" })}
                        powerbi={{
                          datasetId: powerBiReport.dataset?.datasetId ?? "",
                          reportId: powerBiReport?.reportId ?? "",
                          reportWorkspaceId: powerBiReport.workspace?.workspaceId ?? "",
                          pages,
                          currentPage: currentPageAtom,
                        }}
                      />
                      <PowerBIReport
                        key={record.id}
                        datasetId={powerBiReport.dataset?.datasetId ?? ""}
                        reportId={powerBiReport?.reportId ?? ""}
                        reportWorkspaceId={powerBiReport.workspace?.workspaceId ?? ""}
                        pages={pages}
                        currentPage={currentPageAtom}
                      />
                    </div>
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
                  const _check: never = record;
                  return null;
              }
            }}
            renderLinkToRecord={({ record: _record, children, transformedMeta }) => {
              const record = _record as InternalLink;
              const url = getUrl(record) ?? "";
              return (
                <NextLink {...transformedMeta} legacyBehavior href={url}>
                  <Typography
                    variant="inherit"
                    component="a"
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
                case "InternalLinkButtonRecord": {
                  const { label, page } = record as GQL.InternalLinkButtonRecord;
                  const url = getUrl(page as InternalLink);
                  return url ? (
                    <NextLink legacyBehavior href={url} passHref>
                      <Button variant="inline" className={classes.linkButton}>
                        {label}
                      </Button>
                    </NextLink>
                  ) : null;
                }

                case "ExternalLinkButtonRecord": {
                  const { label, url } = record as GQL.ExternalLinkButtonRecord;
                  //We add target blank automatically to keep consistency with the rest of the site
                  return url ? (
                    <Button variant="inline" className={classes.linkButton}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.externalLink}
                      >
                        {label}
                      </a>
                    </Button>
                  ) : null;
                }

                case "AssetLinkButtonRecord": {
                  const { label, asset } = record as GQL.AssetLinkButtonRecord;
                  return asset?.url ? (
                    <NextLink legacyBehavior href={asset?.url} passHref>
                      <Button variant="inline" className={classes.linkButton}>
                        {label}
                      </Button>
                    </NextLink>
                  ) : null;
                }

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
                  const description = (record.description as string) ?? image?.title;
                  //For normal images
                  if (image?.responsiveImage) {
                    return (
                      <Box className={classes.imageWrapper}>
                        {/*eslint-disable-next-line jsx-a11y/alt-text*/}
                        <Image
                          data={image?.responsiveImage}
                          layout="intrinsic"
                          pictureStyle={{ margin: 0 }}
                        />
                        {description && (
                          <Typography variant="body1" className={classes.imageTitle}>
                            {description}
                          </Typography>
                        )}
                      </Box>
                    );
                  }
                  //SVGs apparently don't have the responsiveImage prop set so we use the nextimage component here
                  if (image?.url) {
                    return (
                      <Box className={classes.svgWrapper}>
                        <NextImage
                          src={image?.url}
                          alt={image?.alt ?? ""}
                          width={0}
                          height={0}
                          className={classes.svg}
                        />
                        {description && (
                          <Typography variant="body1" className={classes.imageTitle}>
                            {description}
                          </Typography>
                        )}
                      </Box>
                    );
                  }
                  return null;
                default:
                  return null;
              }
            }}
          />
        </Box>
      </DebugStructuredText.Provider>
    )
  );
};

const getUrl = (record: InternalLink) => {
  switch (record.__typename) {
    case "BlogPostRecord": {
      return `/blog/${record.slug}`;
    }
    case "TermsPageRecord": {
      return `/terms`;
    }
    case "MethodsPageRecord": {
      return `/methods`;
    }
    case "MarketArticleRecord": {
      return `/market/${record.slug}`;
    }
    case "LegalPageRecord": {
      return `/legal`;
    }
    case "FocusArticleRecord": {
      return `/focus/${record.slug}`;
    }
    case "AnalysisPageRecord": {
      return `/analysis`;
    }
    case "DataPageRecord": {
      return `/data`;
    }
    case "AboutPageRecord": {
      return `/about`;
    }
    case "HomePageRecord": {
      return `/about`;
    }
    case "InfoPageRecord": {
      return `/info`;
    }
    case "PowerBiPageRecord": {
      return `/power-bi/${record.id}`;
    }
    default:
      const _check: never = record;
      return null;
  }
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
    <Typography ref={ref} id={id} variant="h1" component="h1" className={props.className}>
      {children}
    </Typography>
  );
};

export default StructuredText;
