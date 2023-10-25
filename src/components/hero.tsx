import { Box, Typography } from "@mui/material";
import { s } from "@interactivethings/swiss-federal-ci";
import { makeStyles } from "./style-utils";
import { GridContainer, GridElement } from "@/components/Grid";
import { useTheme } from "@mui/material/styles";
import { StructuredTextGraphQlResponse } from "react-datocms";
import { StructuredText } from "@/components/StructuredText";

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
  lead?: StructuredTextGraphQlResponse;
  hero?: string;
  color?: string;
  bgColor?: string;
  /**
   * Whether the content of the hero should have a left margin of 2 columns on the 3xl and 2xl breakpoints.
   */
  shiftedLeft?: boolean;
  shiftedRight?: boolean;
};

export const Hero = (props: Props) => {
  const {
    variant = "regular",
    title,
    lead,
    hero,
    color = "#000000",
    bgColor = "transparent",
    shiftedLeft = false,
    shiftedRight = false,
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
          [theme.breakpoints.up("xxl")]: { height: hero ? "400px" : "250px", pb: s(18) },
          [theme.breakpoints.down("xxl")]: { height: "280px", pb: s(13) },

          width: "100%",
          backgroundColor: bgColor,
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <GridContainer sx={{ height: "100%" }}>
          <GridElement
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              ...(shiftedLeft && {
                [theme.breakpoints.only("xxxl")]: { px: "calc(81px * 2 + 64px * 2)" },
                [theme.breakpoints.only("xxl")]: { px: "calc(70px * 2 + 64px * 2)" },
                [theme.breakpoints.only("xl")]: {
                  px: "calc(((100% - 48px * 11) / 12) + 48px)",
                },
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
              xxxl={shiftedLeft ? 8 : 10}
              xxl={shiftedLeft ? 8 : 10}
              xl={shiftedRight ? 10 : 12}
              sx={{
                mx: 0,
                ...(shiftedLeft && {
                  [theme.breakpoints.only("xxxl")]: { pl: "calc(81px * 2 + 64px * 2)" },
                  [theme.breakpoints.only("xxl")]: { pl: "calc(70px * 2 + 64px * 2)" },
                  [theme.breakpoints.only("xl")]: { px: "calc(((100% - 48px * 11) / 12) + 48px)" },
                }),
              }}
            >
              <StructuredText data={lead} />
            </GridElement>
          </GridContainer>
        </Box>
      )}
    </>
  );
};
