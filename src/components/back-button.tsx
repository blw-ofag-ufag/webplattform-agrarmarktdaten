import { Trans } from "@lingui/macro";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { backRouteOverrides } from "@/domain/routes";
import SvgIcControlArrowLeft from "@/icons/icons-jsx/control/IcControlArrowLeft";

export const BackButton = () => {
  const router = useRouter();
  const [backRoute, setBackRoute] = useState("/");

  useEffect(() => {
    const theoreticalBackRoute = router.pathname
      .split("/")
      .slice(0, -1)
      .join("/");
    const actualBackRoute = backRouteOverrides[theoreticalBackRoute] as
      | string
      | undefined;
    setBackRoute(actualBackRoute || theoreticalBackRoute || "/");
  }, [router.pathname]);

  return (
    <Button
      variant="text"
      onClick={() => router.push(backRoute)}
      startIcon={<SvgIcControlArrowLeft />}
      sx={{ position: "absolute", mt: 6, ml: 4, color: "black" }}
    >
      <Trans id="cta.back">Geh zurück</Trans>
    </Button>
  );
};
