import { Box } from "@mui/material";

import Flex from "@/components/flex";
import { colors } from "@/components/infografik/colors";

export const SquareLabel = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <Flex
      sx={{
        color: "white",
        backgroundColor: colors.brown,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ fontWeight: "bold", fontSize: "28px", textAlign: "center" }}>{title}</Box>
      <Box sx={{ fontWeight: "bold", fontSize: "18px", textAlign: "center" }}>{subtitle}</Box>
    </Flex>
  );
};
