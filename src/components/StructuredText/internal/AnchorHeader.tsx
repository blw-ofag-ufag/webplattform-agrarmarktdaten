import * as React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import IcLink from "@/icons/icons-jsx/control/IcLink";
import { copyToClipboard } from "@/lib/clipboard";
import { t } from "@lingui/macro";
import { useScrollIntoView } from "@/lib/useScrollIntoView";
import { slugify } from "@/domain/string";
import { useRouter } from "next/router";
import useStructuredTextStyles from "../useStructuredTextStyles";

type AllowedLevels = 1 | 2 | 3 | 4 | 5;

interface HeaderProps {
  id: number;
  level: AllowedLevels;
  children: React.ReactNode;
  className?: string;
}

const AnchorHeader = (props: HeaderProps) => {
  const { id, level, children } = props;
  const { asPath, push } = useRouter();
  const textContent = extractTextContent(children as JSX.Element);
  const encodedContent = slugify(textContent);
  const { classes, cx } = useStructuredTextStyles({});

  const [ref] = useScrollIntoView(id);

  const [isTooltipOpen, setTooltipOpen] = React.useState(false);
  const handleTooltipOpen = async () => {
    setTooltipOpen(true);
    const newHashPath = getHashPath(asPath, encodedContent, id, level);
    await push(newHashPath);
    await copyToClipboard(window.location.href);
  };
  const handleTooltipClose = () => setTooltipOpen(false);

  const levelClass = getLevelClass(level);
  const hash = mkHeaderHash(encodedContent, id, level);
  return (
    <Box position="relative" className={classes.anchorHeaderWrapper} id={hash}>
      <Tooltip
        PopperProps={{ disablePortal: true }}
        onClose={handleTooltipClose}
        open={isTooltipOpen}
        leaveDelay={1000}
        title={t({ id: "action.copy", message: "Copied to Clipboard" })}
      >
        <IconButton className={classes.anchorIcon} onClick={handleTooltipOpen}>
          <IcLink width={27} height={27} />
        </IconButton>
      </Tooltip>
      <Typography
        ref={ref}
        variant={`h${level}`}
        component={`h${level}`}
        className={cx(classes.header, classes[levelClass], props.className)}
        // only h1 should have an id so that they're scrollable from the TOC
        {...(level === 1 ? { id: `heading${id}` } : {})}
      >
        {children}
      </Typography>
    </Box>
  );
};

const getLevelClass = (level: 1 | 2 | 3 | 4 | 5) => `h${level}` as `h${typeof level}`;

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

const getHashPath = (path: string, id: string, section: number, level: AllowedLevels) => {
  const headerHash = mkHeaderHash(id, section, level);
  return path.includes("#") ? path.replace(/#(.*)$/, `#${headerHash}`) : `#${headerHash}`;
};

const mkHeaderHash = (id: string, section: number, level: AllowedLevels) =>
  `${id}-${section}-${level}`;

export default AnchorHeader;
