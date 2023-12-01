import { Trans } from "@lingui/macro";
import { Button, ButtonProps } from "@mui/material";
import { useRouter } from "next/router";
import SvgIcControlArrowLeft from "@/icons/icons-jsx/control/IcControlArrowLeft";

export const BackButton = ({
  color = "black",
  ...props
}: { color?: string } & Omit<ButtonProps, "onClick" | "startIcon" | "color">) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      onClick={() => router.back()}
      startIcon={<SvgIcControlArrowLeft />}
      {...props}
      sx={{ ...props.sx, position: "absolute", mt: 4, ml: 2, color }}
    >
      <Trans id="cta.back">Geh zurück</Trans>
    </Button>
  );
};
