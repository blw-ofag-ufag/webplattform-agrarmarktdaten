import dynamic from "next/dynamic";
import { Report } from "powerbi-client";
import * as models from "powerbi-models";
import React, { useState } from "react";

import {
  Box,
  Button,
  MenuItem,
  Select,
  SxProps,
  Tab,
  Tabs,
  Theme,
  tabClasses,
  tabScrollButtonClasses,
  useControlled,
  useEventCallback,
  useMediaQuery,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { makeStyles } from "./style-utils";
import { InPlaceDialog } from "./InPlaceDialog";
import IcExpand from "@/icons/icons-jsx/control/IcExpand";
import { t } from "@lingui/macro";
import { useStyles as useInPlaceDialogStyles } from "@/components/InPlaceDialog";

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
    width: "100%",
    "& iframe": {
      border: "none",
    },
  },
  embed: {
    aspectRatio: "16/9",
    width: "100%",

    // A bit hacky, prevents embed to overflow while in fullscreen
    maxHeight: "85vh",
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
  navigationTabs: {
    width: "100%",
    [`& .${tabClasses.root}`]: {
      // Not done at theme level not to mess up with global navigation at the top
      minHeight: 56,
      fontSize: "1rem",
    },
    [`& .${tabScrollButtonClasses.root}`]: {
      alignItems: "center",
    },
  },
}));

const getEmbedUrl = (reportId: string, reportWorkspaceId: string) => {
  return `https://embedded.powerbi.com/reportEmbed?reportId=${reportId}&groupId=${reportWorkspaceId}`;
};

type PowerBIPage = {
  name: string;
  id: string;
};

export const PowerBINavigation = ({
  pages,
  onChange,
  activePage,
  switchToSelectOnMobile = true,
  ...props
}: {
  pages: PowerBIPage[];
  activePage: PowerBIPage;
  onChange: (page: PowerBIPage) => void;
  switchToSelectOnMobile?: boolean;
} & {
  className?: string;
  sx?: SxProps;
}) => {
  const { classes, cx } = useStyles();

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  if (isMobile && switchToSelectOnMobile) {
    return (
      <Select
        value={activePage.id}
        {...props}
        onChange={(ev) => {
          const page = pages.find((p) => p.id === ev.target.value);
          if (page) {
            onChange(page);
          }
        }}
      >
        {pages.map((page) => (
          <MenuItem key={page.id} value={page.id}>
            {page.name}
          </MenuItem>
        ))}
      </Select>
    );
  }
  return (
    <Tabs
      variant="scrollable"
      allowScrollButtonsMobile
      scrollButtons="auto"
      value={activePage?.id}
      {...props}
      className={cx(classes.navigationTabs, props.className)}
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

export const PowerBIReport = (props: {
  datasetId: string;
  reportId: string;
  reportWorkspaceId: string;
  pages: PowerBIPage[];
  open?: boolean;
  onChangeFullscreen?: (fullscreen: boolean) => void;
  host?: string;
}) => {
  const { datasetId, reportId, reportWorkspaceId, pages, host, onChangeFullscreen } = props;
  const [report, setReport] = React.useState<Report | undefined>(undefined);
  const [activePage, setActivePage] = useState(() => pages[0]);
  const embedConfig = usePowerBIEmbedConfig({
    datasetId,
    reportId,
    reportWorkspaceId,
    activePage,
    host,
  });
  const { classes } = useStyles();
  const [fullscreen, setFullscreenState] = useControlled({
    default: false,
    controlled: props.open,
    name: "PowerBIReport",
  });

  const setFullscreen = useEventCallback((value: boolean) => {
    setFullscreenState(value);
    onChangeFullscreen?.(value);
  });

  const { classes: inPlaceDialogClasses } = useInPlaceDialogStyles();

  return (
    <Box position="relative">
      <Button
        className={inPlaceDialogClasses.hideWhenOpened}
        sx={{
          position: "absolute",
          bottom: "-3rem",
          right: 0,
          color: "cobalt.500",
          fontWeight: "bold",
        }}
        startIcon={<IcExpand />}
        variant="inline"
        onClick={() => setFullscreen(true)}
      >
        {t({ id: "controls.fullscreen", message: "Full Screen" })}
      </Button>
      <InPlaceDialog open={fullscreen} onClose={() => setFullscreen(false)}>
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
      </InPlaceDialog>
    </Box>
  );
};

export type PowerBIReportProps = React.ComponentProps<typeof PowerBIReport>;

type PowerBIConfigProps = {
  datasetId: string;
  reportId: string;
  reportWorkspaceId: string;
  activePage?: PowerBIPage;
  host?: string;
};

const usePowerBIEmbedConfig = (props: PowerBIConfigProps & { enabled?: boolean }) => {
  const { datasetId, reportId, reportWorkspaceId, activePage, host } = props;
  const { data: accessToken } = useQuery({
    queryKey: ["powerbi", "accessToken", reportId, datasetId],
    enabled: props.enabled ?? true,
    queryFn: async () => {
      const embedToken = await fetch(`${host ?? ""}/api/powerbi/report`, {
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
