import { cubesAtom, defaultCube } from "@/domain/cubes";
import { Locale, i18n, locales } from "@/locales/locales";
import { fetchCubeDimensions } from "@/pages/api/data";
import { CircularProgress, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useState } from "react";
import MetadataPanel from "./MetadataPanel";
import { I18nProvider } from "@lingui/react";

export const Metadata = () => {
  const [cube, setCube] = useState<string>(defaultCube);
  const [locale, setLocale] = useState<Locale>("de");
  const cubes = useAtomValue(cubesAtom);

  const dimensions = useQuery({
    queryKey: ["dimensions", cube, locale],
    queryFn: () => fetchCubeDimensions(locale, cube),
  });
  return (
    <I18nProvider i18n={i18n}>
      <Stack gap={2}>
        <Typography variant="h2">Cube Dimensions</Typography>
        <Select label="Cube" value={cube} onChange={(e) => setCube(e.target.value)}>
          {cubes.map((c) => (
            <MenuItem key={c.cube} value={c.cube}>
              {c.cube}
            </MenuItem>
          ))}
        </Select>
        <Select
          label="Language"
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
        >
          {locales.map((l) => (
            <MenuItem key={l} value={l}>
              {l.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
        {dimensions.isLoading && <CircularProgress />}
        {dimensions.isSuccess && dimensions.data && <MetadataPanel dimensions={dimensions.data} />}
      </Stack>
    </I18nProvider>
  );
};

export default {
  component: Metadata,
  title: "Components / Browser",
};
