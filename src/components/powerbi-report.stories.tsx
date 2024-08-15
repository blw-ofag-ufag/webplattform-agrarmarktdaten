import {
  PowerBIReport as PowerBIReportComponent,
  PowerBINavigation as PowerBINavigationComponent,
} from "@/components/powerbi-report";
import { InPlaceDialog as InPlaceDialogComponent, useInPlaceDialogStyles } from "./InPlaceDialog";
import { FormControlLabel, Switch, Typography } from "@mui/material";
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

export const InPlaceDialog = () => {
  const [fullscreen, setFullscreen] = useState(false);
  const { classes } = useInPlaceDialogStyles();
  return (
    <>
      <Typography variant="body1" className={classes.hideWhenOpened}>
        Should be hidden when modal is opened
      </Typography>
      <FormControlLabel
        control={<Switch checked={fullscreen} onChange={(ev, checked) => setFullscreen(checked)} />}
        label={"Fullscreen"}
      />
      <InPlaceDialogComponent open={fullscreen} onClose={() => setFullscreen(false)}>
        <div style={{ width: "100%", height: "200px", background: "red" }} />
      </InPlaceDialogComponent>
    </>
  );
};

const powerBiReport = {
  __typename: "PowerBiReportRecord",
  id: "Pa4bvNpVRbyjHZrJfbJ_Aw",
  workspace: {
    id: "LuzYxddrR96yk_vc0CvRIA",
    name: "ALM_MilchMilchprodukte_PR",
    workspaceId: "90788abe-e37c-4d71-8049-983cbbb47eb8",
  },
  reportId: "d71a69d8-e075-463d-a0cb-7f282a7ac362",
  name: "ALM_MilchMilchprodukte_Produzentenpreise_DE (PR)",
  dataset: {
    name: "ALM_Dataset_R01_DE (PR)",
    id: "szq5OI5PQYWCMuGlbtk1WA",
    datasetId: "19f29580-126d-4e59-8196-db76392d63b2",
    workspace: {
      workspaceId: "64a762d4-87b7-4d23-9204-8e8bd0da1f7e",
      name: "ALM_Dataset_PR",
      id: "DPkOxWc4QCWoV3MhyVQn1Q",
    },
  },
  pages: [
    {
      name: "PP Milch - Jahr",
      id: "XhtDiVfHQLe4u30Rmsk1sA",
      pageId: "ReportSection3372a43bed35deb923a2",
    },
    { name: "PP Milch - Monat", id: "R-AXHDcsSkKZg_Q98f-Zcg", pageId: "ReportSection" },
  ],
};

export const PowerBIReport = () => {
  const pages = powerBiReport.pages?.map((d) => ({ name: d.name!, id: d.pageId! })) ?? [];
  return (
    <div style={{ maxWidth: 800 }}>
      <PowerBIReportComponent
        host={"http://localhost:3000"}
        datasetId={powerBiReport.dataset?.datasetId ?? ""}
        reportId={powerBiReport?.reportId ?? ""}
        reportWorkspaceId={powerBiReport.workspace?.workspaceId ?? ""}
        pages={pages}
      />
      <Typography variant="body1">Content below report</Typography>
    </div>
  );
};

export default {
  component: PowerBINavigationComponent,
  title: "App Components / Power BI",
};
