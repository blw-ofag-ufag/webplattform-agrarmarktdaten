import { Grow, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";

const PreviewFilter = ({
  show = true,
  children,
}: {
  show: boolean;
} & PropsWithChildren) => {
  return (
    <Grow in={show}>
      <Typography variant="body2" color="grey.500" mr={1}>
        {children}
      </Typography>
    </Grow>
  );
};

export default PreviewFilter;
