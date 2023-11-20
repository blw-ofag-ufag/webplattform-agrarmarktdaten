import dynamic from "next/dynamic";
import { Report } from "powerbi-client";
import * as models from "powerbi-models";
import React from "react";

import { Tab, Tabs, tabClasses } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
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

const useStyles = makeStyles()((theme) => ({
  root: {
    "& iframe": {
      border: "none",
    },
  },
  embed: {
    aspectRatio: "16/9",
    width: "100%",
  },
  navigationContainer: {
    width: "100%",
    overflowX: "auto",
  },
  navigationContent: {
    display: "flex",
    gap: theme.spacing(2),
    width: "fit-content",
    padding: theme.spacing(4),
  },
  navigationButton: {
    whiteSpace: "nowrap",
  },
}));

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

export const PowerBINavigation = ({
  pages,
  onChange,
  activePage,
}: {
  pages: PowerBIPage[];
  activePage: PowerBIPage;
  onChange: (page: PowerBIPage) => void;
}) => {
  const { classes } = useStyles();

  return (
    <Tabs
      value={activePage?.id}
      sx={{
        width: "100%",
        [`& .${tabClasses.root}`]: {
          // Not done at theme level not to mess up with global navigation at the top
          minHeight: 64,
        },
      }}
    >
      {pages.map((page) => (
        <Tab
          key={page.id}
          value={page.id}
          className={classes.navigationButton}
          onClick={() => onChange(page)}
          label={page.name}
        />
      ))}
    </Tabs>
  );
};

export const PowerBIReport = (props: PowerBIReportProps) => {
  const { datasetId, reportId, reportWorkspaceId, pages } = props;
  const [report, setReport] = React.useState<Report | undefined>(undefined);
  const [activePage, setActivePage] = React.useState<PowerBIPage | undefined>(pages[0]);
  const embedConfig = usePowerBIEmbedConfig({
    datasetId,
    reportId,
    reportWorkspaceId,
    activePage,
  });
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      {report && activePage ? (
        <PowerBINavigation pages={pages} activePage={activePage} onChange={setActivePage} />
      ) : null}
      <PowerBIEmbed
        embedConfig={embedConfig}
        cssClassName={classes.embed}
        getEmbeddedComponent={(embedObject) => {
          setReport(embedObject as Report);
        }}
      />
    </div>
  );
};

type PowerBIConfigProps = {
  datasetId: string;
  reportId: string;
  reportWorkspaceId: string;
  activePage?: PowerBIPage;
};

const usePowerBIEmbedConfig = (props: PowerBIConfigProps) => {
  const { datasetId, reportId, reportWorkspaceId, activePage } = props;
  const { data: accessToken } = useQuery({
    queryKey: ["powerbi", "accessToken", reportId, datasetId],
    queryFn: async () => {
      const embedToken = await fetch("/api/powerbi/report", {
        method: "POST",
        body: JSON.stringify({
          datasets: [{ id: datasetId }],
          reports: [{ id: reportId }],
        }),
      }).then((d) => d.json());

      return embedToken.token;
    },
  });

  return React.useMemo(() => {
    if (!accessToken) {
      return CONFIG;
    }

    const navigationProps = activePage
      ? {
          // pageName is actually pageId, and displayPageName is actually pageName
          pageName: activePage.id,
          settings: {
            navContentPaneEnabled: false,
          },
        }
      : {};

    return {
      type: "report",
      id: reportId,
      embedUrl: getEmbedUrl(reportId, reportWorkspaceId),
      tokenType: models.TokenType.Embed,
      accessToken,
      ...navigationProps,
    };
  }, [accessToken, activePage, reportId, reportWorkspaceId]);
};
