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
          width: "54px",
          height: "54px",
          cursor: "pointer",
          backgroundColor: "#ffffff",
          padding: "14px",
          border: `1px solid ${c.cobalt[400]}`,
          borderRadius: "4px",
          position: "fixed",
          bottom: 100,
          right: 20,
          zIndex: 10,
        }}
        onClick={() => window?.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowForwardIos sx={{ transform: "rotate(-90deg)" }} width={24} height={24} />
      </Box>
    </Fade>
  );
};

export default ScrollToTop;
