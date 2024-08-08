import { CubeDimensions } from "@/domain/cubes";
import { Dimension, Measure } from "@/domain/dimensions";
import { IcChevronDoubleRight } from "@/icons/icons-jsx/control";
import SvgIcControlArrowLeft from "@/icons/icons-jsx/control/IcControlArrowLeft";
import SvgIcControlArrowRight from "@/icons/icons-jsx/control/IcControlArrowRight";
import { Property as DimensionData, Measure as MeasureData } from "@/pages/api/data";
import { Trans } from "@lingui/macro";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { ContentDrawer, ContentDrawerProps } from "./ContentDrawer";
import { isEmpty } from "remeda";

export function MetadataPanel({
  dimensions,
  open = false,
  onClose = () => {},
  slots,
}: {
  dimensions: CubeDimensions;
  open?: boolean;
  onClose?: () => void;
  slots: {
    drawer: Omit<ContentDrawerProps, "open">;
  };
}) {
  return (
    <ContentDrawer anchor="right" open={open} onClose={onClose} {...slots.drawer}>
      <Stack direction="row" justifyContent="space-between" px={4} py={6}>
        <Typography variant="h2">
          <Trans id="data.metadata.title">Metadata</Trans>
        </Typography>
        <IconButton onClick={onClose}>
          <IcChevronDoubleRight />
        </IconButton>
      </Stack>
      <Box px={4} py={5}>
        <MetadataContent dimensions={dimensions} />
      </Box>
    </ContentDrawer>
  );
}

export function MetadataContent({ dimensions }: { dimensions: CubeDimensions }) {
  const [selectedDimension, setSelectedDimension] = React.useState<
    Dimension | Measure | undefined
  >();

  const flatDimensions = { ...dimensions.properties, ...dimensions.measures };

  if (isEmpty(flatDimensions)) {
    return (
      <Typography variant="body2">
        <Trans id="data.metadata.nodata">No metadata available</Trans>
      </Typography>
    );
  }

  return (
    <Stack>
      <AnimatePresence mode="wait">
        {selectedDimension ? (
          <>
            <Button
              variant="text"
              size="small"
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
          <Stack gap={6}>
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
          <Stack mt={6}>
            <Typography
              sx={{ mt: 2, color: "textSecondary" }}
              variant="body2"
              fontWeight="bold"
              gutterBottom
            >
              <Trans id="controls.metadata-panel.available-values">Available values</Trans>
            </Typography>
            {dimension.type === "measure" && (
              <>
                {dimension.range?.min && (
                  <Typography variant="body3">Min: {dimension.range.min}</Typography>
                )}
                {dimension.range?.max && (
                  <Typography variant="body3">Max: {dimension.range.max}</Typography>
                )}
              </>
            )}
            {dimension.type === "property" && (
              <>
                {dimension.values.map((value) => (
                  <Typography key={value.value} variant="body3">
                    {value.label ?? value.value}
                  </Typography>
                ))}
              </>
            )}
          </Stack>
        ) : (
          <Button
            variant="text"
            size="small"
            onClick={onExpand}
            sx={{
              p: 0,
              mt: 1,
            }}
            endIcon={<SvgIcControlArrowRight />}
          >
            <Trans id="cta.show-more"> Show more</Trans>
          </Button>
        )}
      </AnimatePresence>
    </Stack>
  );
};
