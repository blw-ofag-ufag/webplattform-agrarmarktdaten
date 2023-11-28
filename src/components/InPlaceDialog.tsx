import React, { useEffect } from "react";
import { Button, Modal, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { makeStyles } from "@/components/style-utils";
import { IcControlClose } from "@/icons/icons-jsx/control";
import { Trans } from "@lingui/macro";

const IN_PLACE_DIALOG_OPENED = "in-place-dialog-opened";

export const useInPlaceDialogStyles = makeStyles()(() => ({
  hideWhenOpened: {
    [`body.${IN_PLACE_DIALOG_OPENED} &`]: {
      display: "none !important",
    },
  },
}));

const useStyles = makeStyles<void, "modalOpened">()((_theme, _params, classes) => ({
  paper: {
    [`.${classes.modalOpened} &`]: {
      margin: "4rem",
    },
    flexGrow: 1,
    padding: 0,
    margin: 0,
    position: "relative",
    overflow: "hidden",
  },
  modalOpened: { display: "flex" },
  modalClosed: { position: "static" },
  closeButton: { position: "absolute", top: "0.5rem", right: "0.5rem", zIndex: 1 },
  content: { minHeight: "100%", display: "flex", flexDirection: "column", flexGrow: 1 },
}));

export const InPlaceDialog = ({
  open,
  onClose,
  children,
  fallback,
  className,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}) => {
  const { classes, cx } = useStyles();
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    document.body.classList[open ? "add" : "remove"](IN_PLACE_DIALOG_OPENED);
    return () => {
      document.body.style.removeProperty("overflow");
      document.body.classList.remove(IN_PLACE_DIALOG_OPENED);
    };
  }, [, open]);
  return (
    <>
      <Modal
        className={cx(open ? classes.modalOpened : classes.modalClosed, className)}
        hideBackdrop={!open}
        /** Always show the content */
        open
        onClose={onClose}
        closeAfterTransition
        disableAutoFocus={!open}
        disableEscapeKeyDown={!open}
        /** Content is at the same DOM location as a normal element */
        disablePortal={true}
        disableScrollLock={!open}
        disableRestoreFocus={!open}
      >
        <Paper className={classes.paper} elevation={open ? 6 : 0}>
          {open ? (
            <Button
              onClick={() => onClose()}
              className={classes.closeButton}
              endIcon={<IcControlClose width={12} height={12} />}
              variant="inline"
            >
              <Trans id="header.close">Close</Trans>
            </Button>
          ) : null}
          <motion.div layout className={classes.content}>
            {children}
          </motion.div>
        </Paper>
      </Modal>
      {open ? fallback : null}
    </>
  );
};
