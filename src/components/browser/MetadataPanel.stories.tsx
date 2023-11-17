import { defaultCube } from "@/domain/cubes";
import { i18n } from "@/locales/locales";
import { fetchCubeDimensions } from "@/pages/api/data";
import { I18nProvider } from "@lingui/react";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { MetadataContent } from "./MetadataPanel";

export const Metadata = () => {
  const dimensions = useQuery({
    queryKey: ["dimensions", defaultCube, "de"],
    queryFn: () => fetchCubeDimensions("de", defaultCube),
  });
  return (
    <I18nProvider i18n={i18n}>
      <Stack gap={2}>
        <Typography variant="h2">Metadata</Typography>
        {dimensions.isLoading && <CircularProgress />}
        {dimensions.isSuccess && dimensions.data && (
          <MetadataContent dimensions={dimensions.data} />
        )}
      </Stack>
    </I18nProvider>
  );
};

export default {
  component: Metadata,
  title: "Components / Browser",
};
