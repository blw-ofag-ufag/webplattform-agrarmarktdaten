import { Grow, Typography, TypographyProps } from "@mui/material";
import React, { PropsWithChildren } from "react";

const PreviewFilter = ({
  show = true,
  tainted = false,
  children,
  ...props
}: {
  show: boolean;
  tainted?: boolean;
} & TypographyProps &
  PropsWithChildren) => {
  return (
    <Grow in={show}>
      <Typography variant="body3" color={tainted ? "grey.800" : "grey.500"} mr={1} {...props}>
        {children}
      </Typography>
    </Grow>
  );
};

export default PreviewFilter;
