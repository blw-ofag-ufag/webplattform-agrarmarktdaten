import { CubeDimensions } from "@/domain/cubes";
import { Dimension, Measure } from "@/domain/dimensions";
import SvgIcControlArrowLeft from "@/icons/icons-jsx/control/IcControlArrowLeft";
import SvgIcControlArrowRight from "@/icons/icons-jsx/control/IcControlArrowRight";
import { Property as DimensionData, Measure as MeasureData } from "@/pages/api/data";
import { Trans } from "@lingui/macro";
import { Box, Button, Stack, Typography } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import React from "react";

export default function MetadataPanel({ dimensions }: { dimensions: CubeDimensions }) {
  const [selectedDimension, setSelectedDimension] = React.useState<
    Dimension | Measure | undefined
  >();

  console.log({ selectedDimension });

  const flatDimensions = { ...dimensions.properties, ...dimensions.measures };

  return (
    <Stack>
      <AnimatePresence mode="wait">
        {selectedDimension ? (
          <>
            <Button
              variant="text"
              onClick={() => setSelectedDimension(undefined)}
              startIcon={<SvgIcControlArrowLeft />}
            >
              <Trans id="cta.back">Geh zurück</Trans>
            </Button>
            <Box sx={{ mt: 4 }}>
              <DataDimensionItem dimension={flatDimensions[selectedDimension]} expanded={true} />
            </Box>
          </>
        ) : (
          <Stack>
            {Object.entries(flatDimensions).map(([key, value]) => {
              return (
                <DataDimensionItem
                  dimension={value}
                  key={key}
                  onExpand={() => setSelectedDimension(key as Dimension | Measure)}
                />
              );
            })}
          </Stack>
        )}
      </AnimatePresence>
    </Stack>
  );
}

const DataDimensionItem = ({
  dimension,
  expanded = false,
  onExpand = () => {},
}: {
  dimension: MeasureData | DimensionData;
  expanded?: boolean;
  onExpand?: () => void;
}) => {
  const description = React.useMemo(() => {
    if (!expanded && dimension.description && dimension.description.length > 180) {
      return dimension.description.slice(0, 180) + "…";
    }

    return dimension.description;
  }, [dimension.description, expanded]);

  return (
    <Stack>
      <Typography variant="body2" fontWeight="bold" gutterBottom>
        {dimension.label ?? dimension.dimension}
      </Typography>
      {description && <Typography variant="body2">{description}</Typography>}
      <AnimatePresence>
        {expanded ? (
          <Stack>
            <Typography
              sx={{ mt: 2, color: "grey.800" }}
              variant="body2"
              fontWeight="bold"
              gutterBottom
            >
              <Trans id="controls.metadata-panel.available-values">Available values</Trans>
              {dimension.type === "measure" && (
                <>
                  {dimension.range?.min && (
                    <Typography variant="body2">Min: {dimension.range.min}</Typography>
                  )}
                  {dimension.range?.max && (
                    <Typography variant="body2">Max: {dimension.range.max}</Typography>
                  )}
                </>
              )}
              {dimension.type === "property" && (
                <>
                  {dimension.values.map((value) => (
                    <Typography key={value.value} variant="body2">
                      {value.label ?? value.value}
                    </Typography>
                  ))}
                </>
              )}
            </Typography>
          </Stack>
        ) : (
          <Button
            variant="text"
            size="small"
            onClick={onExpand}
            endIcon={<SvgIcControlArrowRight />}
          >
            <Trans id="cta.show-moew"> Show more</Trans>
          </Button>
        )}
      </AnimatePresence>
    </Stack>
  );
};
