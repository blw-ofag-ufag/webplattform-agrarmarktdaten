import { Container, SxProps } from "@mui/material";
import React from "react";

export const ContentContainer = ({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: SxProps;
}) => {
  return (
    <Container
      maxWidth="md"
      sx={{
        ...sx,
        display: "flex",
        flexDirection: "column",
        gap: 7,
        mx: "auto",
        px: 5,
      }}
    >
      {children}
    </Container>
  );
};
