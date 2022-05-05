import { Box } from "@mui/material";
import { ReactNode } from "react";

export const StickySection = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        position: "sticky",
        top: 100,
        padding: "20px 0",
      }}
    >
      {children}
    </Box>
  );
};
