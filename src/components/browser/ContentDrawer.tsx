import { Drawer, DrawerProps } from "@mui/material";
import { PropsWithChildren } from "react";
import { makeStyles } from "../style-utils";

export type ContentDrawerProps = {
  container: HTMLDivElement | null;
} & DrawerProps &
  PropsWithChildren;

const useStyles = makeStyles()(() => ({
  paper: {
    width: "388px",
    position: "absolute",
    border: "none",
    top: 0,
    // should be below the header menus
    zIndex: 9,
  },
}));

export const ContentDrawer = ({ children, container, ...props }: ContentDrawerProps) => {
  const { classes } = useStyles();
  return (
    <Drawer
      PaperProps={{
        className: classes.paper,
        elevation: 8,
      }}
      hideBackdrop
      ModalProps={{
        container,
        style: { position: "absolute", top: 0 },
      }}
      // https://github.com/mui/material-ui/issues/11749#issuecomment-561755796
      variant="persistent"
      {...props}
    >
      {children}
    </Drawer>
  );
};
