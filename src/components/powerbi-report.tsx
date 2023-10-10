import dynamic from "next/dynamic";
import * as models from "powerbi-models";
import React, { useEffect } from "react";

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

type PowerBIReportProps = {
  datasetId: string;
  reportId: string;
  reportWorkspaceId: string;
};

export const PowerBIReport = (props: PowerBIReportProps) => {
  const { datasetId, reportId, reportWorkspaceId } = props;
  const [config, setConfig] = React.useState(CONFIG);
  const { classes } = useStyles();

  useEffect(() => {
    const fetchReport = async () => {
      const embedToken = await fetch("/api/powerbi/report", {
        method: "POST",
        body: JSON.stringify({
          datasets: [{ id: datasetId }],
          reports: [{ id: reportId }],
        }),
      }).then((d) => d.json());
      setConfig({
        type: "report",
        id: reportId,
        embedUrl: getEmbedUrl(reportId, reportWorkspaceId),
        tokenType: models.TokenType.Embed,
        accessToken: embedToken.token,
      });
    };

    fetchReport();
  }, [datasetId, reportId, reportWorkspaceId]);

  return <PowerBIEmbed embedConfig={config} cssClassName={classes.root} />;
};
