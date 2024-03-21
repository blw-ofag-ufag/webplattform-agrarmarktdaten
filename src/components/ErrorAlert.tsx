import { Alert, AlertTitle, Box } from "@mui/material";
import React from "react";
import { Trans } from "@lingui/macro";

export const ErrorAlert: React.FC<{
  details: React.ReactNode;
}> = ({ details }) => {
  return (
    <Alert severity="error">
      <AlertTitle>
        <Trans id="data.loading.error-title">An error ocurred while loading the data</Trans>
      </AlertTitle>

      <Trans id="data.loading.error-description">Please try again later.</Trans>

      {details ? (
        <Box component="details" mt={2}>
          {details}
        </Box>
      ) : null}
    </Alert>
  );
};
