import { Box, Typography, TypographyProps } from "@mui/material";
import { s } from "@interactivethings/swiss-federal-ci";
import { makeStyles } from "./style-utils";
import { GridContainer, GridElement } from "@/components/Grid";
import { useTheme } from "@mui/material/styles";
import { StructuredTextGraphQlResponse } from "react-datocms";
import { StructuredText } from "@/components/StructuredText";

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
    ...(params.shiftedLeft && {
      [theme.breakpoints.only("xxxl")]: { px: "calc(81px * 2 + 64px * 2)" },
      [theme.breakpoints.only("xxl")]: { px: "calc(70px * 2 + 64px * 2)" },
      [theme.breakpoints.only("xl")]: {
        px: "calc(((100% - 48px * 11) / 12) + 48px)",
      },
    }),
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

  return (
    <>
      <Box className={cx(classes.root, variant === "market" ? classes.market : undefined)}>
        <GridContainer sx={{ height: "100%" }}>
          <GridElement className={classes.gridElement}>
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
        </GridContainer>
      </Box>
      {lead && (
        <Box className={classes.lead}>
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
              <StructuredText data={lead} {...leadStructuredTextProps} />
            </GridElement>
          </GridContainer>
        </Box>
      )}
    </>
  );
};
