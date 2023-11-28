import React, { useEffect } from "react";
import { Button, Modal, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { makeStyles } from "@/components/style-utils";
import { IcControlClose } from "@/icons/icons-jsx/control";
import { Trans } from "@lingui/macro";

const IN_PLACE_DIALOG_OPENED = "in-place-dialog-opened";

export const useStyles = makeStyles()(() => ({
  hideWhenOpened: {
    [`body.${IN_PLACE_DIALOG_OPENED} &`]: {
      display: "none !important",
    },
  },
}));

export const InPlaceDialog = ({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
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
    <Modal
      sx={open ? { display: "flex" } : { position: "static", zIndex: 10000 }}
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
      <Paper
        sx={{ flexGrow: 1, p: open ? 4 : 0, margin: open ? 4 : 0, position: "relative" }}
        elevation={open ? 6 : 0}
      >
        {open ? (
          <Button
            onClick={() => onClose()}
            sx={{ position: "absolute", top: "0.5rem", right: "0.5rem", zIndex: 1 }}
            endIcon={<IcControlClose width={12} height={12} />}
            variant="inline"
          >
            <Trans id="header.close">Close</Trans>
          </Button>
        ) : null}
        <motion.div layout>{children}</motion.div>
      </Paper>
    </Modal>
  );
};
