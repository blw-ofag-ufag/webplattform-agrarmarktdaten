import { ScaleOrdinal } from "d3-scale";
import { Box, Flex } from "theme-ui";
import { Betriebe } from "./data/betriebe";
import { Flachen } from "./data/flachen";
import { FlachenPerKochtyp } from "./data/kochtyp";
import { useResizeObserver } from "../../lib/use-resize-observer";
import { Section } from "./data/sections";

import { ReactNode } from "react";
import { backgroundStyle, bioOpacityScale } from "./data/type";
import { colors } from "./colors";
type DataType = Flachen | Betriebe | FlachenPerKochtyp | $FixMe;
interface Props {
  activeSection: Section;
  label: ReactNode;
  squares: DataType[];
  getColor: (x: DataType) => string;
  colorScale: ScaleOrdinal<string, string>;
  getBackground: (x: DataType) => string;
  backgroundScale: ScaleOrdinal<string, string>;
  dimensions?: $FixMe[]; // Betriebsgrössenkategorie[] | KochTyp[];
  getCategory?: (x: DataType) => string;
  colors?: ScaleOrdinal<string, string>;
  getOpacityCategory?: (x: DataType) => string;
  opacityScale?: ScaleOrdinal<string, number>;
  bioColored: boolean;
  bioPrefix: string;
}
export const Waffle = ({
  activeSection,
  label,
  squares,
  dimensions,
  getBackground,
  backgroundScale,
  getColor,
  colorScale,
  getCategory,

  getOpacityCategory,
  opacityScale,
  bioColored,
  bioPrefix
}: Props) => {
  const [resizeRef, width] = useResizeObserver<HTMLDivElement>();

  return (
    <div ref={resizeRef}>
      <Flex sx={{ flexWrap: "wrap", width, height: width, margin: "40px 0" }}>
        <Flex
          sx={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            top: 0,
            left: 0,
            width,
            height: width,
            zIndex: 2,
            margin: "40px 0",
            color: "white"
          }}
        >
          {label}
        </Flex>
        {squares.map((d, i) => {
          const color = bioColored ? colorScale(getColor(d)) : colors.brown;
          const bg = backgroundScale
            ? (backgroundStyle(color) as any)[backgroundScale(getBackground(d))]
            : backgroundStyle(color)["one"];

          return (
            <Box
              key={i}
              sx={{
                width: activeSection === "one" ? "10%" : "9%",
                height: activeSection === "one" ? "10%" : "9%",
                margin: activeSection === "one" ? 0 : "0.5%",
                ...bg,
                transition: "all .2s linear",
                opacity: bioColored ? bioOpacityScale(getColor(d)) : 1
              }}
            ></Box>
          );
        })}
      </Flex>
      <Flex
        sx={{
          position: "relative",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexWrap: "wrap",
          minHeight: "20px"
        }}
      >
        {dimensions &&
          dimensions.map(c => {
            const color = bioColored ? colors.green : colors.brown;
            const bg = (backgroundStyle(color) as any)[backgroundScale(c)];
            return (
              <LegendItem
                key={c}
                item={bioColored ? `${bioPrefix}${c}` : c}
                bg={bg}
              ></LegendItem>
            );
          })}
      </Flex>
    </div>
  );
};

export const LegendItem = ({ item, bg }: { item: string; bg: $FixMe }) => (
  <Flex
    sx={{
      position: "relative",
      mt: 1,
      mr: 4,
      justifyContent: "flex-start",
      alignItems: "center",
      pl: 2,
      fontFamily: "body",
      lineHeight: [1, 2, 2],
      fontWeight: "regular",
      fontSize: [1, 2, 2],
      color: "monochrome700",
      minWidth: 120,

      "&::before": {
        content: "''",
        position: "relative",
        display: "block",
        left: -2,
        width: "1rem",
        height: `1rem`,
        ...bg
      }
    }}
  >
    {item}
  </Flex>
);
