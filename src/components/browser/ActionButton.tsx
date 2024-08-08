import { Button, ButtonProps } from "@mui/material";
import { forwardRef, PropsWithChildren } from "react";
import { withStyles } from "../style-utils";

type Props = PropsWithChildren & ButtonProps & { target?: React.HTMLAttributeAnchorTarget };

const ActionButton = withStyles(
  forwardRef<HTMLButtonElement, Props>(({ children, ...props }, ref) => (
    <Button {...props} ref={ref} size="small">
      {children}
    </Button>
  )),
  () => ({
    root: {
      minHeight: "40px",
    },
  })
);

export default ActionButton;
