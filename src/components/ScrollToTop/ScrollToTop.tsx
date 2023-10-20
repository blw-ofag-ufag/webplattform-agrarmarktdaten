import { Box, Fade } from "@mui/material";
import * as React from "react";
import ChevronUp from "@/icons/icons-jsx/control/IcControlChevronUp";
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
          padding: "2px",
          border: `1px solid ${c.cobalt[400]}`,
          borderRadius: "4px",
          position: "fixed",
          bottom: 100,
          right: 20,
          zIndex: 10,
          ":hover": {
            backgroundColor: c.cobalt[100],
          },
        }}
        onClick={() => window?.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ChevronUp width={48} height={48} />
      </Box>
    </Fade>
  );
};

export default ScrollToTop;
