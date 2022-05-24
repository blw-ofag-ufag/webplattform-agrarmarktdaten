import { Box, SxProps } from "@mui/material";
import React from "react";

export const ContentContainer = ({
  narrow = false,
  children,
  sx,
}: {
  children: React.ReactNode;
  narrow?: boolean;
  sx?: SxProps;
}) => {
  return (
    <Box sx={{ ...sx, maxWidth: narrow ? "60rem" : "77rem", mx: "auto" }}>
      {children}
    </Box>
  );
};
