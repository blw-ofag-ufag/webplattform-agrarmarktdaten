import { Box, Typography } from "@mui/material";
import { useAtomValue } from "jotai";

import { filterAtom } from "@/domain/data";

const DebugCard = ({ title, value }: { title: string; value: $IntentionalAny }) => {
  return (
    <div>
      <Typography variant="h5">{title}</Typography>
      <pre style={{ fontSize: "small" }}>{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
};

const DataBrowserDebug = () => {
  const filters = useAtomValue(filterAtom);
  return (
    <Box
      display="grid"
      mx={4}
      sx={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
    >
      <DebugCard title="Indicator" value={filters.indicator} />
      <DebugCard title="Markets" value={filters.markets} />
      <DebugCard title="Added value" value={filters.addedValueValues} />
      <DebugCard title="Production systems" value={filters.productionSystems} />
      <DebugCard title="Sales Regions options" value={filters.salesRegions} />
      <DebugCard title="Products" value={filters.products} />
    </Box>
  );
};

export default DataBrowserDebug;
