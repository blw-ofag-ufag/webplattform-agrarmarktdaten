import { Box, Typography } from "@mui/material";
import { useMemo } from "react";

import { ContentContainer } from "./content-container";
import Flex from "./flex";

type Props = {
  variant?: "regular" | "market";
  title: string;
  lead: string;
};

export const Hero = (props: Props) => {
  const { variant = "regular", title, lead } = props;
  const dynamicSxProps = useMemo(() => {
    return variant === "market"
      ? {
          borderTopRightRadius: "110px",
          borderBottomLeftRadius: "110px",
          mt: 9,
        }
      : {};
  }, [variant]);

  return (
    <Flex
      sx={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "420px",
        mb: 7,
        backgroundColor: "muted.main",
        ...dynamicSxProps,
      }}
    >
      <ContentContainer sx={{ textAlign: "center" }}>
        <Box>
          <Typography variant="h1">{title}</Typography>
          <Typography
            variant="subtitle1"
            sx={{ mt: 3, color: "secondary.main" }}
          >
            {lead}
          </Typography>
        </Box>
      </ContentContainer>
    </Flex>
  );
};
