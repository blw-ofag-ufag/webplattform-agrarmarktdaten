import { Box } from "theme-ui";

export const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ maxWidth: "64rem", mx: "auto" }}>{children}</Box>
);
