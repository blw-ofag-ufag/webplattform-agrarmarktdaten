import { Button, ButtonProps } from "@mui/material";
import { PropsWithChildren } from "react";
import { withStyles } from "../style-utils";

const ActionButton = withStyles(
  ({
    children,
    ...props
  }: PropsWithChildren & ButtonProps & { target?: React.HTMLAttributeAnchorTarget }) => (
    <Button {...props} size="small">
      {children}
    </Button>
  ),
  () => ({
    root: {
      fontWeight: "bold",
      minHeight: "40px",
    },
  })
);

export default ActionButton;
