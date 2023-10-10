import * as React from "react";
import { s, c } from "@interactivethings/swiss-federal-ci";
import {
  StructuredText as ST,
  renderNodeRule,
  StructuredTextGraphQlResponse,
  Image,
} from "react-datocms";
import { isHeading, isParagraph, isLink } from "datocms-structured-text-utils";
import { Typography, Box } from "@mui/material";
import { PowerBIReport } from "@/components/powerbi-report";
import * as GQL from "@/graphql";
import { useIntersectionObserver } from "@/lib/useIntersectionObserver";
import { sectionAtom } from "@/lib/atoms";
import { useSetAtom } from "jotai";
import { Download } from "@/icons/icons-jsx/control";
import { Temporal } from "proposal-temporal";
import Link from "next/link";

interface Props {
  data?: StructuredTextGraphQlResponse;
}

const StructuredText = (props: Props) => {
  const { data } = props;

  //FIXME: we have to temporarily disable SSR here due to a hydration problem with the DataDownloadSectionRecord bit.
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
              return <Header1 id={id}>{children}</Header1>;
            }
            return (
              <Typography
                key={key}
                id={id}
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
              <Typography key={key} variant="body1" component="p" sx={{ mb: s(4) }}>
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
                  datasetId={powerBiReport.dataset?.datasetId ?? ""}
                  reportId={powerBiReport?.reportId ?? ""}
                  reportWorkspaceId={powerBiReport.workspace?.workspaceId ?? ""}
                />
              );
            case "DataDownloadSectionRecord":
              const dataDownloadSection = record as Partial<GQL.DataDownloadSectionRecord>;

              return (
                <Box
                  key={dataDownloadSection.id}
                  sx={{
                    position: "relative",
                    border: `${c.cobalt[100]} 4px solid`,
                    borderRadius: "12px",
                    backgroundColor: c.cobalt[50],
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
                      left: 50,
                      backgroundColor: c.cobalt[100],
                      width: "fit-content",
                      borderRadius: 100,
                      paddingY: s(1),
                      paddingX: s(3),
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 700, color: c.cobalt[800] }}>
                      {dataDownloadSection.title}
                    </Typography>
                  </Box>
                  {dataDownloadSection.dataDownloadItems?.map((item) => {
                    const { id, date, title, file, description } = item;
                    let formattedDate = "";
                    if (date) {
                      const date2 = Temporal.PlainDate.from(date);
                      const day = String(date2.day).padStart(2, "0");
                      const month = String(date2.month).padStart(2, "0");
                      const year = String(date2.year);
                      formattedDate = `${day}.${month}.${year}`;
                    }
                    return (
                      file?.url && (
                        <Link href={file.url} key={id} legacyBehavior>
                          <Box
                            sx={{
                              cursor: "pointer",
                              borderBottom: `${c.cobalt[200]} 1px solid`,
                              py: s(4),
                              ":hover": { backgroundColor: c.cobalt[50] },
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Download width={24} height={24} />
                              <Typography variant="h3" sx={{ ml: s(4), color: c.cobalt[800] }}>
                                {title}
                              </Typography>
                            </Box>
                            <Box sx={{ ml: s(10.5), mt: s(3), color: c.cobalt[500] }}>
                              <Typography variant="body1" sx={{ mb: s(2) }}>
                                {description}
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                {`${file?.format.toUpperCase()}`}{" "}
                                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; {formattedDate}
                              </Typography>
                            </Box>
                          </Box>
                        </Link>
                      )
                    );
                  })}
                </Box>
              );
            default:
              return null;
          }
        }}
        renderBlock={({ record }) => {
          switch (record.__typename) {
            case "ImageTeaserBlockRecord":
              const image =
                record.imageTeaserAsset as unknown as GQL.ImageTeaserBlockRecord["imageTeaserAsset"];
              return image?.responsiveImage ? (
                <Box sx={{ my: s(4) }}>
                  {/*eslint-disable-next-line jsx-a11y/alt-text*/}
                  <Image data={image?.responsiveImage} />
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
    <Typography ref={ref} id={id} variant="h1" component="h1" sx={{ mb: s(6) }}>
      {children}
    </Typography>
  );
};

export default StructuredText;
