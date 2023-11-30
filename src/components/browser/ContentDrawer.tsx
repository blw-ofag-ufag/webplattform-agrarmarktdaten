import { Drawer, DrawerProps } from "@mui/material";
import { PropsWithChildren } from "react";

export type ContentDrawerProps = {
  container: HTMLDivElement | null;
} & DrawerProps &
  PropsWithChildren;

export const ContentDrawer = ({ children, container, ...props }: ContentDrawerProps) => {
  return (
    <Drawer
      PaperProps={{
        style: {
          width: "388px",
          position: "absolute",
          border: "none",
          top: 0,
          zIndex: 9,
        },
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
