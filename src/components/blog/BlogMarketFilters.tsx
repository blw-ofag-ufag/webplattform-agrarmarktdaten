import { Chip, Stack } from "@mui/material";

import { Market } from "@/domain/types";

type Props = {
  allMarkets: Market[];
};

export const BlogMarketFilters = ({
  allMarkets,
}: {
  allMarkets: Props["allMarkets"];
}) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ justifyContent: "center", transform: "translateY(-50%)" }}
    >
      {allMarkets.map((d) => (
        <Chip key={d.name} label={d.name} clickable />
      ))}
    </Stack>
  );
};
