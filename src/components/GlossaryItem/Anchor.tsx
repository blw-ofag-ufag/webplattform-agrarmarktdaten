import * as React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import IcLink from "@/icons/icons-jsx/control/IcLink";
import { copyToClipboard } from "@/lib/clipboard";
import { t } from "@lingui/macro";
import { makeStyles } from "@/components/style-utils";

interface Props {
  id: string;
  children: React.ReactNode;
}

const GlossaryAnchor = (props: Props) => {
  const { id, children } = props;
  const { classes } = useStyles();

  const [isTooltipOpen, setTooltipOpen] = React.useState(false);
  const handleTooltipOpen = async () => {
    setTooltipOpen(true);
    const [path] = window.location.href.split("?");
    await copyToClipboard(`${path}?id=${id}`);
  };
  const handleTooltipClose = () => setTooltipOpen(false);

  return (
    <Box position="relative" className={classes.root} id={`${id}`}>
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
      <Typography component="h2" className={classes.header}>
        {children}
      </Typography>
    </Box>
  );
};

const useStyles = makeStyles()(() => ({
  root: {
    display: "flex",
    "& > button": { opacity: 0, transition: "opacity 0.15s ease-out" },
    "&:hover > button": { opacity: 1 },
  },
  anchorIcon: {
    marginLeft: "-44px",
    minWidth: "27px",
    maxHeight: "44px",
  },
  header: {
    display: "flex",
    alignItems: "center",
  },
}));

export default GlossaryAnchor;
