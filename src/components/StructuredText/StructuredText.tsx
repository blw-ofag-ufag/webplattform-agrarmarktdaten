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
import { NextRouter, useRouter } from "next/router";
import IcLink from "@/icons/icons-jsx/control/IcLink";
import slugs from "@/generated/slugs.json";
import { copyToClipboard } from "@/lib/clipboard";

type ParagraphTypographyProps = Omit<TypographyOwnProps, "variant"> & {
  variant?: string;
  className?: string;
  component?: TypographyProps["component"];
};

const defaultParagraphTypographyProps: ParagraphTypographyProps = {
  variant: "body1",
};

interface Props {
  data?: StructuredTextGraphQlResponse;
  paragraphTypographyProps?: ParagraphTypographyProps;
  debug?: boolean;
  sx?: BoxProps["sx"];
}

const DebugStructuredText = React.createContext({
  debug: false as boolean | undefined,
});

const hasReactChildClassName = (child: React.ReactNode, className: string) => {
  if (React.isValidElement(child) && "props" in child) {
    const childProps = child.props;
    if (
      childProps &&
      typeof childProps === "object" &&
      "className" in childProps &&
      childProps.className &&
      typeof childProps.className === "string" &&
      childProps.className.includes(className)
    ) {
      return true;
    }
  }
  return false;
};

export const useStructuredTextDebug = () => React.useContext(DebugStructuredText);

const StructuredText = (props: Props) => {
  const { data, paragraphTypographyProps = defaultParagraphTypographyProps } = props;
  const router = useRouter();
  const { classes, cx } = useStructuredTextStyles({ debug: props.debug });

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
                /**
                 * If the only child of a paragraph is a PowerBI report, then we do not render the paragraph,
                 * but only the report. This is so that we can target the internal links internalLinkParagraph
                 * that could be below a report, and adjust their margin so that they are at the same level
                 * as the fullscreen button of the report.
                 * In the future, it could be good to reflect, on whether the internal links below a report should
                 * not belong to the PowerBI report model, so that their rendering is done inside the PowerBI
                 * component. This would remove the need for such hacks.
                 */
                if (children?.length === 1) {
                  const child = children[0];
                  if (hasReactChildClassName(child, classes.powerbiReportContainer)) {
                    return <>{child}</>;
                  }
                }
                return (
                  <Typography
                    key={key}
                    /** @ts-ignore */
                    variant="body1"
                    component="p"
                    {...paragraphTypographyProps}
                    className={cx(classes.p, paragraphTypographyProps.className)}
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
                  return (
                    <div className={classes.powerbiReportContainer}>
                      <PowerBIReport
                        key={record.id}
                        datasetId={powerBiReport.dataset?.datasetId ?? ""}
                        reportId={powerBiReport?.reportId ?? ""}
                        reportWorkspaceId={powerBiReport.workspace?.workspaceId ?? ""}
                        pages={pages}
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
              const url = getUrl(record, router) ?? "";
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
                  const { label, page, anchor } = record as GQL.InternalLinkButtonRecord;
                  const url = getUrl(page as InternalLink, router);
                  const fullUrl = anchor ? `${url}#${anchor}` : url;
                  return fullUrl ? (
                    <p className={cx(classes.p, classes.internalLinkParagraph)}>
                      <NextLink legacyBehavior href={fullUrl} passHref>
                        <Button variant="inline" className={classes.linkButton}>
                          {label}
                        </Button>
                      </NextLink>
                    </p>
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

const getUrl = (record: InternalLink, router: NextRouter) => {
  const localeSlugs = slugs.find(({ locale }) => locale === router.locale)?.slugs;
  switch (record.__typename) {
    case "HomePageRecord": {
      return `/`;
    }
    case "BlogPostRecord": {
      return `/blog/${record.slug}`;
    }
    case "TermsPageRecord": {
      return `/${localeSlugs?.terms}`;
    }
    case "MethodsPageRecord": {
      return `/${localeSlugs?.methods}`;
    }
    case "MarketArticleRecord": {
      return `/${localeSlugs?.market}/${record.slug}`;
    }
    case "LegalPageRecord": {
      return `/${localeSlugs?.legal}`;
    }
    case "FocusArticleRecord": {
      return `/${localeSlugs?.focus}/${record.slug}`;
    }
    case "AnalysisPageRecord": {
      return `/${localeSlugs?.analysis}`;
    }
    case "DataPageRecord": {
      return `/${localeSlugs?.data}`;
    }
    case "InfoPageRecord": {
      return `/${localeSlugs?.info}`;
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
  const { asPath, push } = useRouter();
  const [, hash] = asPath.split("#");
  const textContent = extractTextContent(children as JSX.Element);
  const encodedContent = encodeURI(textContent);
  const ref = React.useRef(null);
  const entry = useIntersectionObserver(ref, { rootMargin: "0%", threshold: 1.0 });
  const setSection = useSetAtom(sectionAtom);
  const { classes } = useStructuredTextStyles({});

  React.useEffect(() => {
    if (hash === encodedContent) {
      setTimeout(() => {
        const elem = document.getElementById(id);
        const elementPosition = elem?.getBoundingClientRect().top;
        const offsetPosition = (elementPosition ?? 0) + window.scrollY - 110;
        window?.scrollTo({ behavior: "smooth", top: offsetPosition });
      }, 200);
    }
  }, [hash, encodedContent, id]);

  React.useEffect(() => {
    if (entry?.intersectionRatio === 1.0) {
      setSection(id);
    }
  }, [entry, setSection, id]);

  return (
    <Box position="relative" className={classes.h1Wrapper}>
      <IcLink width={27} height={27} className={classes.h1Icon} />
      <Typography
        ref={ref}
        id={id}
        variant="h1"
        component="h1"
        className={props.className}
        onClick={async () => {
          const newHashPath = asPath.includes("#")
            ? asPath.replace(/#(.*)$/, `#${encodedContent}`)
            : `#${encodedContent}`;
          await push(newHashPath);
          await copyToClipboard(window.location.href);
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

const extractTextContent = (node: JSX.Element | JSX.Element[]): string => {
  if (Array.isArray(node)) {
    return node.map(extractTextContent).join("");
  }
  if (typeof node === "string") {
    return node;
  }
  if (typeof node === "object") {
    return extractTextContent(node?.props.children);
  }
  return "";
};

export default StructuredText;
