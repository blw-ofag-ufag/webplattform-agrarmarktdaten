import { b } from "@interactivethings/swiss-federal-ci";
import { Container, SxProps } from "@mui/material";
import React from "react";

export const ContentContainer = ({ children, sx }: { children: React.ReactNode; sx?: SxProps }) => {
  return (
    <Container
      maxWidth="xxxl"
      sx={{
        display: "flex",
        flexDirection: "column",
        mx: "auto",
        [b.only("xxxl")]: { maxWidth: "1676px" },
        [b.only("xxl")]: { maxWidth: "1544px" },
        [b.only("xl")]: { maxWidth: "1152px" },
        [b.only("lg")]: { maxWidth: "928px" },
        [b.only("md")]: { maxWidth: "696px" },
        [b.only("sm")]: { maxWidth: "568px" },
        [b.only("xs")]: { maxWidth: "424px" },
        [b.down("xs")]: { maxWidth: "340px" },
        [b.up("sm")]: { px: 0 },
        ...sx,
      }}
    >
      {children}
    </Container>
  );
};
