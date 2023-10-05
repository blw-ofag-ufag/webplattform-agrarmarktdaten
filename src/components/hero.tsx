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
  color?: string;
};

export const Hero = (props: Props) => {
  const { variant = "regular", title, lead, hero, color = "#000000" } = props;
  const { classes } = useStyles();

  return (
    <>
      <Flex
        className={variant === "market" ? classes.market : undefined}
        sx={{
          flexDirection: "column",
          justifyContent: "end",
          height: hero ? "400px" : "250px",
          pb: s(18),
          mb: 7,
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <ContentContainer sx={{ maxWidth: "1096px" }}>
          <Box>
            <Box sx={{ width: "55px", height: "3px", backgroundColor: color }} />
            <Typography variant="h1" sx={{ color, fontSize: "64px" }}>
              {title}
            </Typography>
          </Box>
        </ContentContainer>
      </Flex>
      <ContentContainer sx={{ pb: "96px" }}>
        {lead && (
          <Typography variant="subtitle1" sx={{ mt: 16, mb: 24, color: c.monochrome[800] }}>
            {lead}
          </Typography>
        )}
      </ContentContainer>
    </>
  );
};
