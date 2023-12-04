import { defaultCube } from "@/domain/cubes";
import { fetchCubeDimensions } from "@/pages/api/data";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { MetadataContent } from "./MetadataPanel";

export const Metadata = () => {
  const dimensions = useQuery({
    queryKey: ["dimensions", defaultCube, "de"],
    queryFn: () => fetchCubeDimensions("de", "https://int.lindas.admin.ch", defaultCube),
  });
  return (
    <Stack gap={2}>
      <Typography variant="h2">Metadata</Typography>
      {dimensions.isLoading && <CircularProgress />}
      {dimensions.isSuccess && dimensions.data && <MetadataContent dimensions={dimensions.data} />}
    </Stack>
  );
};

export default {
  component: Metadata,
  title: "App Components / Browser",
};
