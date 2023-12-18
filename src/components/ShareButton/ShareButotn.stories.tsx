import { Box } from "@mui/material";
import { ShareButton } from "./";

export const Default = () => {
  return (
    <Box p="2rem" mb="2rem">
      <ShareButton />
    </Box>
  );
};
export default {
  component: ShareButton,
  title: "App Components / Share Button",
};
