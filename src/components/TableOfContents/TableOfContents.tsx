import * as React from "react";
import { StructuredText, StructuredTextGraphQlResponse } from "react-datocms";
import { render, renderNodeRule } from "datocms-structured-text-to-html-string";
import { isHeading, Heading } from "datocms-structured-text-utils";
import { Box } from "@mui/material";
import { SxProps } from "@mui/material";
import { sectionAtom } from "@/lib/atoms";
import { useAtomValue } from "jotai";
import { makeStyles } from "@/components/style-utils";

interface Props {
  data?: StructuredTextGraphQlResponse;
  activeColor?: string;
  sx?: SxProps;
}

//Extract all the h6 elements and put them in a valid Document
const extractH6s = (data?: StructuredTextGraphQlResponse) => {
  const h6s: Heading[] = [];
  render(data, {
    renderBlock: () => null,
    renderInlineRecord: () => null,
    metaTransformer: () => null,
    renderLinkToRecord: () => null,
    customNodeRules: [
      renderNodeRule(isHeading, ({ node }) => {
        if (node.level === 6) {
          h6s.push(node);
        }
        return null;
      }),
    ],
  });
  return { value: { schema: "dast", document: { type: "root", children: h6s } } } as const;
};

const useStyles = makeStyles<{
  activeColor: string;
}>()(({ spacing: s, palette: c }, { activeColor }) => ({
  tocEntry: {
    boxSizing: "border-box",
    padding: s(4),
    width: "100%",
    borderBottom: `1px solid ${c.cobalt[100]}`,
    cursor: "pointer",
    "&:hover": { backgroundColor: c.cobalt[50] },
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  tocEntryActive: {
    borderLeft: `solid ${activeColor} 2px`,
    marginLeft: "-2px",
  },
}));

const TableOfContents = React.forwardRef<typeof Box, Props>((props, ref) => {
  const { data, activeColor = "#ACB4BD", sx } = props;
  const toc = React.useMemo(() => extractH6s(data), [data]);

  const activeSection = useAtomValue(sectionAtom);
  const { classes, cx } = useStyles({ activeColor });

  if (toc) {
    let i = 0;
    return (
      <Box ref={ref} sx={sx}>
        <StructuredText
          data={toc}
          customNodeRules={[
            renderNodeRule(isHeading, ({ children, key }) => {
              //The nth h6 corresponds to the nth h1
              i += 1;
              return ((i) => (
                <Box
                  key={key}
                  className={cx(
                    classes.tocEntry,
                    activeSection === `heading${i}` ? classes.tocEntryActive : null
                  )}
                  onClick={() => {
                    const elem = document.getElementById(`heading${i}`);
                    const elementPosition = elem?.getBoundingClientRect().top;
                    const offsetPosition = (elementPosition ?? 0) + window.scrollY - 110;
                    window?.scrollTo({ behavior: "smooth", top: offsetPosition });
                  }}
                >
                  {children}
                </Box>
              ))(i);
            }),
          ]}
          renderInlineRecord={() => null}
          renderBlock={() => <></>}
        />
      </Box>
    );
  }
});

export default TableOfContents;
