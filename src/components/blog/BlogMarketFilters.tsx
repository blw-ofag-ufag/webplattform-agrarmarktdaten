import { Chip, Stack } from "@mui/material";

import * as GQL from "@/graphql";

export const BlogMarketFilters = ({
  allMarkets,
}: {
  allMarkets: GQL.SimpleMarketArticleFragment[];
}) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ justifyContent: "center", transform: "translateY(-50%)" }}
    >
      {allMarkets.map((d) => (
        <Chip key={d.title} label={d.title} clickable />
      ))}
    </Stack>
  );
};
