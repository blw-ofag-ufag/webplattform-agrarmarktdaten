import { Box } from "@mui/material";
import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { colors } from "./colors";

export const ScrollIndicator = () => {
  const { scrollYProgress } = useViewportScroll();
  const yRange = useTransform(scrollYProgress, [0, 0.95], ["0%", "100%"]);
  const width = useSpring(yRange, { stiffness: 400, damping: 90 });

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 8,
          backgroundColor: colors.brown,
          opacity: 0.2,
          width: "100%",
          zIndex: 10,
        }}
      ></Box>
      <motion.div
        style={{
          width,
          position: "fixed",
          top: 0,
          left: 0,
          height: 8,
          backgroundColor: colors.brown,
          zIndex: 11,
        }}
      />
    </>
  );
};
