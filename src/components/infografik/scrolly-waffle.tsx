import { csv } from "d3";
import { memo, ReactNode, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { colors } from "./colors";
import { getBetriebeSquaresData } from "./data/betriebe";
import { Section } from "./data/sections";
import { ScrollyProvider, useReadScrolly, useScrolly } from "./scrolly";
import { StickySection } from "./sticky-section";
import { Waffle } from "./waffle";

export const ScrollySection = ({
  id,
  children,
}: {
  id: string;
  children?: ReactNode;
}) => {
  const { ref } = useScrolly(id);

  return (
    <div ref={ref}>
      <Box sx={{ minHeight: "110vh" }}>{children}</Box>
    </div>
  );
};

export const ScrollySections = ({
  sectionIds,
}: {
  sectionIds: Set<string>;
}) => {
  return (
    <>
      {[...sectionIds].map((step) => (
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
                    ? colors.green
                    : colors.brown,
                  fontWeight: "bold",
                  fontSize: "24px",
                }}
              >
                {sections[activeSection].title}
              </Box>
              <Waffle
                activeSection={activeSection}
                label={sections[activeSection].label}
                squares={squaresData}
                getColor={(d) => d[sections[activeSection].colorDimension]}
                colorScale={sections[activeSection].colorScale}
                getBackground={(d) =>
                  d[sections[activeSection].backgroundDimension]
                }
                backgroundScale={sections[activeSection].backgroundScale}
                dimensions={sections[activeSection].dimensions}
                getCategory={(d) => d[sections[activeSection].dimension]}
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
  squaresData,
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
export const ScrollyWaffleDataFetcher = ({
  sectionIds,
  sections,
  dataUrl,
}: {
  sectionIds: Set<string>;
  sections: Section;
  dataUrl: string;
}) => {
  const [squares, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      csv(dataUrl).then((data: $FixMe[]) => {
        const betriebe = getBetriebeSquaresData(data);
        // @ts-ignore
        setData(betriebe);
        setIsLoading(false);
      });
    };
    fetchData();
  }, [dataUrl]);

  return (
    <>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ScrollyWaffle
          sectionIds={sectionIds}
          sections={sections}
          squaresData={squares}
        />
      )}
    </>
  );
};
