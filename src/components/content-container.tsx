import { Box, SxProps } from "@mui/material";
import React from "react";

export const ContentContainer = ({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: SxProps;
}) => {
  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        flexDirection: "column",
        gap: 7,
        maxWidth: "1024px",
        mx: "auto",
        px: 5,
      }}
    >
      {children}
    </Box>
  );
};
