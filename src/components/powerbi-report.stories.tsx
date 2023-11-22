import { PowerBINavigation as PowerBINavigationComponent } from "@/components/powerbi-report";
import { FormControlLabel, Switch } from "@mui/material";
import { useState } from "react";

const pages = [
  { id: "first-page", name: "1st page" },
  { id: "second-page", name: "2nd page" },
  { id: "third-page", name: "3rd page" },
  { id: "fourth-page", name: "4th page with very long title" },
];

export const PowerBINavigation = () => {
  const [page, setPage] = useState(pages[0]);
  const [switchToMenuOnMobile, setSwitchToMenuOnMobile] = useState(true);
  return (
    <>
      <FormControlLabel
        label="Switch to menu on mobile"
        control={
          <Switch
            checked={switchToMenuOnMobile}
            onChange={() => setSwitchToMenuOnMobile((s) => !s)}
          />
        }
      />
      <PowerBINavigationComponent
        switchToSelectOnMobile={switchToMenuOnMobile}
        activePage={page}
        pages={pages}
        onChange={setPage}
      />
    </>
  );
};

export default {
  component: PowerBINavigationComponent,
  title: "App Components / Power BI",
};
