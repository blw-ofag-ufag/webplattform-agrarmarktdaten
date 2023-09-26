import { Box, Typography } from "@mui/material";
import { s, c } from "@interactivethings/swiss-federal-ci";
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
  hero?: string;
};

export const Hero = (props: Props) => {
  const { variant = "regular", title, lead, hero } = props;
  const { classes } = useStyles();

  return (
    <>
      <Flex
        className={variant === "market" ? classes.market : undefined}
        sx={{
          flexDirection: "column",
          justifyContent: "end",
          height: "400px",
          pb: s(18),
          mb: 7,
          backgroundImage: `url(${hero})`,
        }}
      >
        <ContentContainer sx={{ ml: s(8) }}>
          <Box>
            <Box sx={{ width: "55px", height: "3px", backgroundColor: "white" }} />
            <Typography variant="h1" sx={{ color: "white", fontSize: "64px" }}>
              {title}
            </Typography>
          </Box>
        </ContentContainer>
      </Flex>
      <ContentContainer sx={{ ml: s(8), pb: s(24) }}>
        {lead && (
          <Typography variant="subtitle1" sx={{ mt: 16, mb: 24, color: c.monochrome[800] }}>
            {lead}
          </Typography>
        )}
      </ContentContainer>
    </>
  );
};
