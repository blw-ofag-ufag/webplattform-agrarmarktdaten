import { Box, SxProps } from "@mui/material";
import React from "react";

export const ContentContainer = ({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: SxProps;
}) => {
  return <Box sx={{ ...sx, maxWidth: "77rem", mx: "auto" }}>{children}</Box>;
};
