import { Stack, Tab, Tabs as TabsComponent, Typography } from "@mui/material";
import { useState } from "react";

export const Tabs = () => {
  const [value, setValue] = useState("publications");
  return (
    <Stack spacing={5}>
      <div>
        <Typography variant="h5" gutterBottom>
          Default
        </Typography>
        <TabsComponent value={value} onChange={(ev, value) => setValue(value)}>
          <Tab value="publications" label="Publications" />
          <Tab value="events" label="Events" />
          <Tab value="faq" label="FAQ" />
        </TabsComponent>
      </div>
    </Stack>
  );
};
export default {
  component: TabsComponent,
  title: " Design system / Components / Tabs",
};
