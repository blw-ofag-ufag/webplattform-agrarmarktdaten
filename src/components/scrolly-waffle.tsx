import { ReactNode, memo } from "react";
import { Box } from "theme-ui";
import { ScrollyProvider, useReadScrolly, useScrolly } from "./scrolly";
import { StickySection } from "./sticky-section";
import { Waffle } from "./waffle";
import { Section } from "../data/sections";
import * as M from "../material";

export const ScrollySection = ({
  id,
  children
}: {
  id: string;
  children?: ReactNode;
}) => {
  const { ref } = useScrolly(id);

  return (
    <div ref={ref}>
      <Box
        sx={{
          minHeight: id === "one" ? "1vh" : "100vh"
          // bg: "Orchid",
          // border: "3px solid black",
          // opacity: 0.3
        }}
      >
        {children}
      </Box>
    </div>
  );
};

export const ScrollySections = ({
  sectionIds
}: {
  sectionIds: Set<string>;
}) => {
  return (
    <>
      {[...sectionIds].map(step => (
        <ScrollySection key={step} id={step}></ScrollySection>
      ))}
    </>
  );
};

export const StickyWaffle = memo(
  ({ sections, squaresData }: { sections: Section; squaresData: $FixMe[] }) => {
    const { activeSection } = useReadScrolly();

    return (
      <StickySection>
        <Box>
          {activeSection && (
            <>
              <Box
                sx={{
                  textAlign: "center",
                  color: sections[activeSection].bioColored
                    ? M.colors.green
                    : M.colors.brown,
                  fontWeight: "bold",
                  fontSize: "24px"
                }}
              >
                {sections[activeSection].title}
              </Box>
              <Waffle
                activeSection={activeSection}
                label={sections[activeSection].label}
                squares={squaresData}
                getColor={d => d[sections[activeSection].colorDimension]}
                colorScale={sections[activeSection].colorScale}
                getBackground={d =>
                  d[sections[activeSection].backgroundDimension]
                }
                backgroundScale={sections[activeSection].backgroundScale}
                dimensions={sections[activeSection].dimensions}
                getCategory={d => d[sections[activeSection].dimension]}
                colors={sections[activeSection].colorScale}
                bioColored={sections[activeSection].bioColored}
                bioPrefix={sections[activeSection].bioPrefix}
              />
            </>
          )}
        </Box>
      </StickySection>
    );
  }
);
export const ScrollyWaffle = ({
  sectionIds,
  sections,
  squaresData
}: {
  sectionIds: Set<string>;
  sections: Section;
  squaresData: $FixMe[];
}) => {
  return (
    <ScrollyProvider sections={sectionIds}>
      <StickyWaffle squaresData={squaresData} sections={sections} />
      <ScrollySections sectionIds={sectionIds} />
    </ScrollyProvider>
  );
};
