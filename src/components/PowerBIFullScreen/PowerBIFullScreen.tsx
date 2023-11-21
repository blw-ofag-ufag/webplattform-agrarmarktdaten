import * as React from "react";
import { Modal, Button, Fade, Box } from "@mui/material";
import IcControlClose from "@/icons/icons-jsx/control/IcControlClose";
import { makeStyles } from "@/components/style-utils";
import { Trans } from "@lingui/macro";
import { PowerBIReport, PowerBIReportProps } from "@/components/powerbi-report";
import IcExpand from "@/icons/icons-jsx/control/IcExpand";

const TRANSITION_DURATION = 200;

const useStyles = makeStyles()((theme) => ({
  button: {
    position: "absolute",
    bottom: -40,
    right: 0,
    fontWeight: "bold",
    display: "flex",
    width: "fit-content",
    color: theme.palette.cobalt[500],
  },

  modal: {
    zIndex: 20,
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
  },

  container: {
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100%",
  },
  closeWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },

  closeButton: {
    fontWeight: "bold",
    marginRight: "25px",
    marginTop: "32px",
    display: "flex",
    width: "fit-content",
    color: theme.palette.cobalt[500],
  },

  powerbiWrapper: {
    paddingLeft: "5%",
    paddingRight: "5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "5%",
    maxHeight: "calc(90vh - 72px)",
    height: "100%",
  },
  powerbiInnerWrapper: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    maxWidth: "100%",
    aspectRatio: "16/9",
  },
}));

interface Props {
  label: React.ReactNode;
  powerbi: PowerBIReportProps;
}

const PowerBIFullScreen = (props: Props) => {
  const { label, powerbi } = props;
  const { classes } = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <Button variant="inline" className={classes.button} onClick={handleOpen}>
        <IcExpand />
        {label}
      </Button>
      <Modal open={isOpen} onClose={handleClose} closeAfterTransition className={classes.modal}>
        <Fade in={isOpen} timeout={TRANSITION_DURATION}>
          <Box className={classes.container}>
            <div className={classes.closeWrapper}>
              <Button variant="inline" className={classes.closeButton} onClick={handleClose}>
                <Trans id="header.close">Close</Trans>
                <IcControlClose width={12} height={12} />
              </Button>
            </div>
            <div className={classes.powerbiWrapper}>
              <div className={classes.powerbiInnerWrapper}>
                <PowerBIReport {...powerbi} />
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default PowerBIFullScreen;
