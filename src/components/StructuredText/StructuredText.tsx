import { s } from "@interactivethings/swiss-federal-ci";
import { StructuredText as ST, renderNodeRule, StructuredTextGraphQlResponse } from "react-datocms";
import { isHeading, isParagraph } from "datocms-structured-text-utils";
import { Typography } from "@mui/material";
import { PowerBIReport } from "@/components/powerbi-report";
import * as GQL from "@/graphql";

interface Props {
  data?: StructuredTextGraphQlResponse;
}

const StructuredText = (props: Props) => {
  const { data } = props;

  return (
    <ST
      data={data}
      customNodeRules={[
        renderNodeRule(isHeading, ({ node, children, key }) => {
          return (
            <Typography key={key} variant={`h${node.level}`} component={`h${node.level}`} sx={{ mb: s(6) }}>
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

export default StructuredText;
