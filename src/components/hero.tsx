import { Box, Typography } from "@mui/material";

import { ContentContainer } from "./content-container";
import Flex from "./flex";
import { makeStyles } from "./style-utils";

const useStyles = makeStyles()({
  market: {
    borderTopRightRadius: "110px",
    borderBottomLeftRadius: "110px",
    mt: 9,
  },
});

type Props = {
  variant?: "regular" | "market";
  title: string;
  lead?: string;
};

export const Hero = (props: Props) => {
  const { variant = "regular", title, lead } = props;
  const { classes } = useStyles();

  return (
    <Flex
      className={variant === "market" ? classes.market : undefined}
      sx={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "420px",
        mb: 7,
        backgroundColor: "muted.main",
      }}
    >
      <ContentContainer sx={{ textAlign: "center" }}>
        <Box>
          <Typography variant="h1">{title}</Typography>
          {lead && <Typography
            variant="subtitle1"
            sx={{ mt: 3, color: "secondary.main" }}
          >
            {lead}
          </Typography>}
        </Box>
      </ContentContainer>
    </Flex>
  );
};
