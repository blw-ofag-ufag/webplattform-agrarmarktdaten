import { Breakpoint, Typography, useMediaQuery } from "@mui/material";
import theme from "@/theme/federal";
import { specs } from "@/components/Grid/Grid";

export const useMatchesMediaQuery = (): Record<Breakpoint, boolean> => {
  return {
    xxs: useMediaQuery(theme.breakpoints.up("xxs")),
    xs: useMediaQuery(theme.breakpoints.up("xs")),
    sm: useMediaQuery(theme.breakpoints.up("sm")),
    md: useMediaQuery(theme.breakpoints.up("md")),
    lg: useMediaQuery(theme.breakpoints.up("lg")),
    xl: useMediaQuery(theme.breakpoints.up("xl")),
    xxl: useMediaQuery(theme.breakpoints.up("xxl")),
    xxxl: useMediaQuery(theme.breakpoints.up("xxxl")),
  };
};

export const MediaQueryDebug = () => {
  const matches = useMatchesMediaQuery();
  return (
    <>
      {Object.entries(matches).map(([bp, matches]) => {
        return (
          <Typography key={bp} display="block" variant="body3">
            {bp} {matches ? "✅" : "❌"} columns: {specs[bp as Breakpoint].nbColumns}
          </Typography>
        );
      })}
    </>
  );
};
