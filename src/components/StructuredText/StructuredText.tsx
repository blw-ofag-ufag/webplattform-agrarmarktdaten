import { s } from "@interactivethings/swiss-federal-ci";
import { StructuredText as ST, renderNodeRule, StructuredTextGraphQlResponse } from "react-datocms";
import { isHeading, isParagraph } from "datocms-structured-text-utils";
import { Typography } from "@mui/material";

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
    />
  );
};

export default StructuredText;
