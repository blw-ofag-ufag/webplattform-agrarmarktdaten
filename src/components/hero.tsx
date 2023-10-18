import { Box, Typography } from "@mui/material";
import { s, c } from "@interactivethings/swiss-federal-ci";
import { makeStyles } from "./style-utils";
import { GridContainer, GridElement } from "@/components/Grid";
import { useTheme } from "@mui/material/styles";

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
  bgColor?: string;
  /**
   * Whether the content of the hero should have a left margin of 2 columns on the 3xl and 2xl breakpoints.
   */
  shifted?: boolean;
};

export const Hero = (props: Props) => {
  const {
    variant = "regular",
    title,
    lead,
    hero,
    color = "#000000",
    bgColor = "transparent",
    shifted = false,
  } = props;
  const { classes } = useStyles();
  const theme = useTheme();

  return (
    <>
      <Box
        className={variant === "market" ? classes.market : undefined}
        sx={{
          flexDirection: "column",
          justifyContent: "end",
          height: hero ? "400px" : "250px",
          pb: s(18),
          width: "100%",
          backgroundColor: bgColor,
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <GridContainer sx={{ flexDirection: "column", alignItems: "center" }}>
          <GridElement
            sx={{
              pt: hero ? "228px" : "125px",
              ...(shifted && {
                [theme.breakpoints.only("xxxl")]: { ml: "calc(81px * 2 + 64px * 2)" },
                [theme.breakpoints.only("xxl")]: { ml: "calc(70px * 2 + 64px * 2)" },
              }),
            }}
          >
            <Box sx={{ width: "55px", height: "3px", backgroundColor: color }} />
            <Typography variant="h1" sx={{ color, fontSize: "64px" }}>
              {title}
            </Typography>
          </GridElement>
        </GridContainer>
      </Box>
      {lead && (
        <Box
          sx={{ width: "100%", display: "flex", justifyContent: "center", pt: "64px", pb: "96px" }}
        >
          <GridContainer sx={{ mx: 0 }}>
            <GridElement
              xxxl={8}
              xxl={8}
              xl={8}
              sx={{
                mx: 0,
                ...(shifted && {
                  [theme.breakpoints.only("xxxl")]: { ml: "calc(81px * 2 + 64px * 2)" },
                  [theme.breakpoints.only("xxl")]: { ml: "calc(70px * 2 + 64px * 2)" },
                }),
              }}
            >
              <Typography variant="subtitle1" sx={{ color: c.monochrome[800] }}>
                {lead}
              </Typography>
            </GridElement>
          </GridContainer>
        </Box>
      )}
    </>
  );
};
