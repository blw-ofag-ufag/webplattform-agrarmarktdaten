import { IcControlArrowLeft, IcWarningCircle } from "@/icons/icons-jsx/control";
import { Trans } from "@lingui/macro";
import { Box, Button, Typography } from "@mui/material";
import NextLink from "next/link";
import { GridContainer } from "../Grid";
import { makeStyles } from "../style-utils";

const useStyles = makeStyles()(({ spacing, palette }) => ({
  wrapper: {
    paddingTop: spacing(10),
    height: "100vh",
  },
  message: {
    display: "flex",
    flexDirection: "column",
    gap: spacing(5),
    color: palette.cobalt[800],
  },
}));

export default function MobileIntercept() {
  const { classes } = useStyles();
  return (
    <Box className={classes.wrapper} bgcolor={"cobalt.50"}>
      <GridContainer>
        <Box className={classes.message}>
          <IcWarningCircle width={80} height={80} />
          <Typography variant="h3" fontWeight="regular">
            <Trans id="data.mobile.message">
              The Agricultural and Food Markets data portal
              <strong> is not yet fully optimized for smaller screens</strong>. Please use a desktop
              computer or change the size of your browser window to ensure an optimal display.
            </Trans>
          </Typography>
          <Button
            component={NextLink}
            href="/"
            variant="contained"
            color="primary"
            startIcon={<IcControlArrowLeft />}
            sx={{
              width: "fit-content",
            }}
          >
            <Trans id="data.mobile.button">Back to Homepage</Trans>
          </Button>
        </Box>
      </GridContainer>
    </Box>
  );
}
