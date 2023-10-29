import { Box, Typography, TypographyProps } from "@mui/material";
import { s } from "@interactivethings/swiss-federal-ci";
import { makeStyles } from "./style-utils";
import { GridElement } from "@/components/Grid";
import { useTheme } from "@mui/material/styles";
import { StructuredTextGraphQlResponse } from "react-datocms";
import { StructuredText } from "@/components/StructuredText";
import { GridContainer, gridColumn } from "@/components/Grid/Grid";

const useStyles = makeStyles<{
  shiftedLeft: boolean;
  hero: string | undefined;
  bgColor: string | undefined;
}>()((theme, params) => ({
  root: {
    flexDirection: "column",
    justifyContent: "end",
    [theme.breakpoints.up("xxl")]: {
      height: params.hero ? "400px" : "250px",
      paddingBottom: s(18),
    },
    [theme.breakpoints.down("xxl")]: { height: "280px", paddingBottom: s(13) },

    width: "100%",
    backgroundColor: params.bgColor,
    backgroundImage: `url(${params.hero})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },

  gridElement: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
  },

  lead: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingTop: "64px",
    paddingBottom: "96px",
  },

  market: {
    borderTopRightRadius: "110px",
    borderBottomLeftRadius: "110px",
    marginTop: theme.spacing(9),
  },
}));

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
  titleTypographyProps?: TypographyProps;
  leadStructuredTextProps?: React.ComponentProps<typeof StructuredText>;
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
    titleTypographyProps,
    leadStructuredTextProps,
  } = props;
  const { classes, cx } = useStyles({ hero, bgColor, shiftedLeft });
  const theme = useTheme();

  const shifter = (
    <Box
      sx={{
        [theme.breakpoints.down("xxxl")]: gridColumn(2),
        [theme.breakpoints.down("xl")]: {
          display: "none",
        },
      }}
    />
  );

  return (
    <>
      <Box className={cx(classes.root, variant === "market" ? classes.market : undefined)}>
        <GridContainer sx={{ height: "100%" }}>
          {shiftedLeft ? shifter : null}
          <GridElement
            className={classes.gridElement}
            sx={{
              [theme.breakpoints.between("xl", "xxxl")]: gridColumn(
                12 - (shiftedLeft ? 2 : 0) - (shiftedRight ? 2 : 0)
              ),
              [theme.breakpoints.between("sm", "lg")]: gridColumn(6),
              [theme.breakpoints.down("sm")]: gridColumn(4),
            }}
          >
            <Box sx={{ width: "55px", height: "3px", backgroundColor: color }} />
            <Typography
              data-debug-good
              variant="display2"
              component="h1"
              sx={{ color }}
              {...titleTypographyProps}
            >
              {title}
            </Typography>
          </GridElement>
          {shiftedRight ? shifter : null}
        </GridContainer>
      </Box>
      {lead && (
        <Box className={classes.lead}>
          <GridContainer>
            {shiftedLeft ? shifter : null}

            <GridElement
              sx={{
                [theme.breakpoints.between("xl", "xxxl")]: gridColumn(8),
                [theme.breakpoints.between("sm", "lg")]: gridColumn(6),
                [theme.breakpoints.down("sm")]: gridColumn(4),
              }}
            >
              <StructuredText data={lead} {...leadStructuredTextProps} />
            </GridElement>
            {shiftedRight ? shifter : null}
          </GridContainer>
        </Box>
      )}
    </>
  );
};
