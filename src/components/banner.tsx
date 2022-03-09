import React, { ReactNode, useMemo } from "react";
import { Box } from "theme-ui";
import { getMarketAreaColor } from "../domain/colors";

export const Banner = ({
  title,
  intro,
  slug,
}: {
  title: string | ReactNode;
  intro?: string | ReactNode;
  slug?: string;
}) => {
  const baseBgColor = useMemo(() => getMarketAreaColor(slug), [slug]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        mt: [0, 0, "92px"],
      }}
    >
      <BannerBackground bgColor={`${baseBgColor}Light`} />
      <Box
        sx={{
          mt: "-150px",
          maxWidth: "77rem",
          mx: "auto",
        }}
      >
        <BannerTitle color={baseBgColor}>{title}</BannerTitle>
        {intro && <BannerIntro color={baseBgColor}>{intro}</BannerIntro>}
      </Box>
    </Box>
  );
};

const BannerBackground = ({
  bgColor = "primaryLight",
}: {
  bgColor?: string;
}) => (
  <Box
    sx={{
      bg: bgColor,
      position: "relative",
      height: "256px",
      zIndex: -1,
    }}
  ></Box>
);

const BannerTitle = ({
  color = "primary",
  children,
}: {
  color?: string;
  children: ReactNode;
}) => (
  <Box
    as="h1"
    sx={{
      bg: color,
      color: "monochrome100",
      fontWeight: "regular",
      fontSize: [8, 9],
      lineHeight: "heading",
      px: [4, 6],
      pt: [4, 5],
      pb: [6, 4],
      maxWidth: ["unset", "unset", "65%"],
    }}
  >
    {children}
  </Box>
);
const BannerIntro = ({
  color,
  children,
}: {
  color: string;
  children: ReactNode;
}) => (
  <Box
    sx={{
      bg: ["monochrome100", color],
      color: ["text", "monochrome100"],
      fontWeight: "regular",
      fontSize: 5,
      lineHeight: "body",
      px: [4, 6],
      pt: 4,
      pb: [4, 7],
      maxWidth: ["unset", "unset", "65%"],
    }}
  >
    {children}
  </Box>
);
