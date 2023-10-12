import { Box, Typography } from "@mui/material";
import { useAtom } from "jotai";

import {
  addedValueValuesAtom,
  countriesAtom,
  indicatorAtom,
  marketsAtom,
  productionSystemsAtom,
} from "@/domain/data";

const DebugCard = ({ title, value }: { title: string; value: $IntentionalAny }) => {
  return (
    <div>
      <Typography variant="h5">{title}</Typography>
      <pre style={{ fontSize: "small" }}>{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
};

const DataBrowserDebug = () => {
  const [indicator] = useAtom(indicatorAtom);
  const [markets] = useAtom(marketsAtom);
  const [addedValueValues] = useAtom(addedValueValuesAtom);
  const [productionSystems] = useAtom(productionSystemsAtom);
  const [countriesOptions] = useAtom(countriesAtom);
  const [products] = useAtom(countriesAtom);
  return (
    <Box
      display="grid"
      mx={4}
      sx={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
    >
      <DebugCard title="Indicator" value={indicator} />
      <DebugCard title="Markets" value={markets} />
      <DebugCard title="Added value" value={addedValueValues} />
      <DebugCard title="Production systems" value={productionSystems} />
      <DebugCard title="Countries options" value={countriesOptions} />
      <DebugCard title="Products" value={products} />
    </Box>
  );
};

export default DataBrowserDebug;
