import { Trans } from "@lingui/macro";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import SvgIcControlArrowLeft from "@/icons/icons-jsx/control/IcControlArrowLeft";

export const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="text"
      onClick={() => router.back()}
      startIcon={<SvgIcControlArrowLeft />}
      sx={{ position: "absolute", mt: 4, ml: 2, color: "black" }}
    >
      <Trans id="cta.back">Geh zurück</Trans>
    </Button>
  );
};
