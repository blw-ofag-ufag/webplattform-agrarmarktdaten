import { Box } from "@mui/material";
import React, { ReactNode, useMemo } from "react";

import { ContentContainer } from "@/components/content-container";
import { getMarketColor } from "@/domain/colors";

export const Banner = ({
  title,
  intro,
  slug,
}: {
  title: string | ReactNode;
  intro?: string | ReactNode;
  slug?: string;
}) => {
  const [, baseBgColor] = useMemo(() => getMarketColor(slug), [slug]);

  return (
    <Box sx={{ position: "relative", width: "100vw", mb: [0, 0, 6] }}>
      <BannerBackground bgColor={`${baseBgColor}.light`} />
      <ContentContainer sx={{ mt: "-150px" }}>
        <BannerTitle color={baseBgColor}>{title}</BannerTitle>
        {intro && <BannerIntro color={baseBgColor}>{intro}</BannerIntro>}
      </ContentContainer>
    </Box>
  );
};

const BannerBackground = ({ bgColor = "primary.light" }: { bgColor?: string }) => (
  <Box
    sx={{
      backgroundColor: bgColor,
      position: "relative",
      height: "256px",
      zIndex: -1,
    }}
  ></Box>
);

const BannerTitle = ({ color = "primary", children }: { color?: string; children: ReactNode }) => (
  <Box
    sx={{
      color: "grey.100",
      fontWeight: "light",
      fontSize: "3.5rem",
      lineHeight: 1,
      backgroundColor: `${color}.main`,
      px: [4, 6],
      pt: [4, 5],
      pb: [6, 4],
      maxWidth: ["unset", "unset", "65%"],
    }}
  >
    {children}
  </Box>
);
const BannerIntro = ({ color, children }: { color: string; children: ReactNode }) => (
  <Box
    typography="body1"
    sx={{
      backgroundColor: ["grey.100", `${color}.main`],
      color: ["text", "grey.100"],
      px: [4, 6],
      pt: 4,
      pb: [4, 7],
      maxWidth: ["unset", "unset", "65%"],
    }}
  >
    {children}
  </Box>
);
