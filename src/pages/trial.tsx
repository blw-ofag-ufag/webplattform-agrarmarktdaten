import { Box, Flex } from "theme-ui";
import { ScrollyWaffle } from "../components/scrolly-waffle";
import { StickyHeader } from "../components/sticky-header.tsx";
import { getBetriebeSquaresData } from "../data/betriebe";
import { getFlachenSquaresData } from "../data/flachen";
import {
  sectionIds_betriebe,
  sectionIds_flachen,
  sections_betriebe,
  sections_flachen
} from "../data/sections";
import { Intro } from "../components/intro";
import { ChapterHeader } from "../components/chapter-header";
import * as M from "../material";

import { ScrollIndicator } from "../components/scroll-indicator";

export default () => {
  return (
    <Box
      sx={{
        maxWidth: "64rem",
        mx: "auto",
        px: [3, 4],
        backgroundColor: "#F1D58F"
      }}
    >
      <Box sx={{ margin: "auto" }}>
        <ScrollIndicator />
        <Intro />
        <Box>
          <ChapterHeader id="produktion">Produktion</ChapterHeader>
          <StickyHeader>
            <Box as="small" sx={{ opacity: 0.7 }}>
              PRODUKTION
            </Box>
            <Box as="h2">Flächenstruktur</Box>
          </StickyHeader>
          <Box
            sx={{
              maxWidth: 500,
              margin: "auto"
            }}
          >
            <ScrollyWaffle
              sectionIds={sectionIds_flachen}
              sections={sections_flachen}
              squaresData={getFlachenSquaresData()}
            />
          </Box>
        </Box>
        <Box>
          <StickyHeader>
            <Box as="small" sx={{ opacity: 0.7 }}>
              PRODUKTION
            </Box>
            <Box as="h2">Betriebstruktur</Box>
          </StickyHeader>
          <Box
            sx={{
              maxWidth: 500,
              margin: "auto"
            }}
          >
            <ScrollyWaffle
              sectionIds={sectionIds_betriebe}
              sections={sections_betriebe}
              squaresData={getBetriebeSquaresData()}
            />
          </Box>
        </Box>
        <ChapterHeader id="angebot">Angebot</ChapterHeader>
        <Flex
          sx={{
            height: "100vh",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          Angebot Insel
        </Flex>
        <ChapterHeader id="konsum">Konsum</ChapterHeader>
        <Flex
          sx={{
            height: "100vh",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          Konsum Insel
        </Flex>
        <ChapterHeader id="preise">Preise</ChapterHeader>
        <Flex
          sx={{
            height: "100vh",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          Preise Insel
        </Flex>
      </Box>
    </Box>
  );
};
