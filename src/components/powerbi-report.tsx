import * as pbi from "powerbi-client";
import React, { useRef, useEffect, useMemo } from "react";

export const GROUP_ID = "c1cfad5e-d2bc-4ec0-a2d3-159a0042b43c";
export const REPORT_ID = "cf816279-d5f4-46be-a838-2770dc61793b";

const Report = () => {
  const ref = useRef<HTMLDivElement>(null);

  const powerbi = useMemo(() => {
    return new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );
  }, []);

  useEffect(() => {
    const fetchReport = async () => {
      const embedToken = await fetch(`/api/powerbi/report`).then((res) =>
        res.json()
      );
      const embedConfiguration = {
        type: "report",
        id: REPORT_ID,
        embedUrl: `https://embedded.powerbi.com/reportEmbed?reportId=${REPORT_ID}&groupId=${GROUP_ID}`,
        tokenType: pbi.models.TokenType.Embed,
        accessToken: embedToken["token"],
      };
      if (ref.current) {
        powerbi.embed(ref.current, embedConfiguration);
      }
    };
    fetchReport();
  }, [powerbi]);

  return (
    <div
      style={{ height: "50vw", maxHeight: "58rem" }}
      ref={ref}
      powerbi-settings-nav-content-pane-enabled="false"
    ></div>
  );
};

export default Report;
