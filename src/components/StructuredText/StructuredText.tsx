import * as React from "react";
import { s } from "@interactivethings/swiss-federal-ci";
import { StructuredText as ST, renderNodeRule, StructuredTextGraphQlResponse } from "react-datocms";
import { isHeading, isParagraph } from "datocms-structured-text-utils";
import { Typography } from "@mui/material";
import { PowerBIReport } from "@/components/powerbi-report";
import * as GQL from "@/graphql";
import { useIntersectionObserver } from "@/lib/useIntersectionObserver";
import { sectionAtom } from "@/lib/atoms";
import { useSetAtom } from "jotai";

interface Props {
  data?: StructuredTextGraphQlResponse;
}

const StructuredText = (props: Props) => {
  const { data } = props;

  let i = 0;
  return (
    <ST
      data={data}
      customNodeRules={[
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
            <Typography key={key} id={id} variant={`h${node.level}`} component={`h${node.level}`} sx={{ mb: s(6) }}>
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
          default:
            return null;
        }
      }}
    />
  );
};

interface HeaderProps {
  id: string;
  children: React.ReactNode;
}

const Header1 = (props: HeaderProps) => {
  const { id, children } = props;
  const ref = React.useRef(null);
  const entry = useIntersectionObserver(ref, { rootMargin: "10%", threshold: 1.0 });
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
