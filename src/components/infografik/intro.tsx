import { keyframes } from "@emotion/core";
import { Box, Button } from "@mui/material";

import Flex from "@/components/flex";
import { colors } from "@/components/infografik/colors";
import { smoothScroll } from "@/lib/smooth-scroll";

export interface PotatoInfographic {
  title: string;
  year: string;
  dataProduktionBetriebsstruktur: $FixMe;
}

export const Intro = ({ title }: Pick<PotatoInfographic, "title">) => {
  return (
    <Flex
      sx={{
        height: "100vh",
        maxHeight: "800px",
        color: colors.almostBlack,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ marginTop: "3.8rem" }}>
        <Box
          component="h1"
          sx={{
            textAlign: "center",
            fontSize: "40px",
            fontWeight: 900,
            lineHeight: 1.2,
            color: colors.almostBlack,
          }}
        >
          {title}
        </Box>
        <Box
          sx={{
            fontSize: "40px",
            fontWeight: 400,
            opacity: 0.5,
            textAlign: "center",
          }}
        >
          2018
        </Box>
      </Box>
      <Flex
        sx={{
          flexDirection: ["column", "row"],
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button onClick={() => smoothScroll(`#produktion`)}>PRODUKTION</Button>
        <Button onClick={() => smoothScroll(`#angebot`)}>ANGEBOT</Button>
        <Button onClick={() => smoothScroll(`#konsum`)}>KONSUM</Button>
        <Button onClick={() => smoothScroll(`#preise`)}>PREISE</Button>
      </Flex>
      <Flex
        sx={{
          marginBottom: "0.5rem",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            fontSize: "0.875rem",
            fontWeight: 700,
            opacity: 0.75,
          }}
        >
          Scrollen
        </Box>
        <Box sx={{ animation: `2s linear infinite ${pulse}` }}>
          <ChevronDown />
        </Box>
      </Flex>
    </Flex>
  );
};

const ChevronDown = () => (
  <svg width="16px" height="10px" viewBox="0 0 16 10">
    <path
      transform="translate(-179 -643) translate(16 61) translate(142 559)"
      stroke="#161616"
      strokeWidth={2}
      fill="none"
      fillRule="evenodd"
      strokeLinecap="square"
      d="M35 25L29 31 23 25"
    />
  </svg>
);
const pulse = keyframes`
  0% { opacity: .9 }
  50% { opacity: 0.1 }
  100% { opacity: .9 }
`;
