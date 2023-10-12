import { Box, Fade } from "@mui/material";
import * as React from "react";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { c } from "@interactivethings/swiss-federal-ci";
import { useScrollTrigger } from "@/lib/useScrollTrigger";

const ScrollToTop = () => {
  const trigger = useScrollTrigger({ threshold: 200 });
  return (
    <Fade in={trigger}>
      <Box
        sx={{
          float: "right",
          pointerEvents: "auto",
          width: "fit-content",
          cursor: "pointer",
          backgroundColor: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "14px",
          border: `1px solid ${c.cobalt[400]}`,
          borderRadius: "4px",
          position: "sticky",
          bottom: 100,
          right: 20,
        }}
        onClick={() => {
          window?.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <ArrowForwardIos sx={{ transform: "rotate(-90deg)" }} />
      </Box>
    </Fade>
  );
};

export default ScrollToTop;
