import dynamic from "next/dynamic";
import { Report } from "powerbi-client";
import * as models from "powerbi-models";
import React from "react";

import { Box, Button } from "@mui/material";
import { makeStyles } from "./style-utils";

const PowerBIEmbed = dynamic(() => import("powerbi-client-react").then((d) => d.PowerBIEmbed), {
  ssr: false,
});

const CONFIG: models.IReportEmbedConfiguration = {
  type: "report",
  id: undefined,
  embedUrl: undefined,
  accessToken: undefined,
  tokenType: models.TokenType.Embed,
};

const useStyles = makeStyles()({
  root: {
    aspectRatio: "16/9",
    width: "100%",
  },
});

const getEmbedUrl = (reportId: string, reportWorkspaceId: string) => {
  return `https://embedded.powerbi.com/reportEmbed?reportId=${reportId}&groupId=${reportWorkspaceId}`;
};

type PowerBIPage = {
  name: string;
  id: string;
};

type PowerBIReportProps = {
  datasetId: string;
  reportId: string;
  reportWorkspaceId: string;
  pages: PowerBIPage[];
};

export const PowerBIReport = (props: PowerBIReportProps) => {
  const { datasetId, reportId, reportWorkspaceId, pages } = props;
  const [accessToken, setAccessToken] = React.useState<string | undefined>(undefined);
  const [config, setConfig] = React.useState(CONFIG);
  const [report, setReport] = React.useState<Report | undefined>(undefined);
  const [activePage, setActivePage] = React.useState<PowerBIPage | undefined>(pages[0]);
  const { classes } = useStyles();

  React.useEffect(() => {
    const fetchReport = async () => {
      const embedToken = await fetch("/api/powerbi/report", {
        method: "POST",
        body: JSON.stringify({
          datasets: [{ id: datasetId }],
          reports: [{ id: reportId }],
        }),
      }).then((d) => d.json());
      setAccessToken(embedToken.token);
    };

    fetchReport();
  }, [datasetId, reportId]);

  React.useEffect(() => {
    if (accessToken) {
      setConfig({
        type: "report",
        id: reportId,
        embedUrl: getEmbedUrl(reportId, reportWorkspaceId),
        tokenType: models.TokenType.Embed,
        accessToken,
        ...(activePage
          ? {
              // pageName is actually pageId, and displayPageName is actually pageName
              pageName: activePage.id,
              settings: {
                navContentPaneEnabled: false,
              },
            }
          : {}),
      });
    }
  }, [accessToken, activePage, reportId, reportWorkspaceId]);

  return (
    <>
      <PowerBIEmbed
        embedConfig={config}
        cssClassName={classes.root}
        getEmbeddedComponent={(embedObject) => {
          setReport(embedObject as Report);
        }}
      />
      {report && activePage && (
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <Box sx={{ display: "flex", gap: 2, width: "fit-content", p: 4 }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                variant={page.id === activePage.id ? "contained" : "outlined"}
                onClick={() => {
                  setActivePage(page);
                }}
                sx={{ whiteSpace: "nowrap" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};
