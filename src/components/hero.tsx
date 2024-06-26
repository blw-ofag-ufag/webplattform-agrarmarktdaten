import { Box, BoxProps, Typography, TypographyProps } from "@mui/material";
import { makeStyles } from "./style-utils";
import { StructuredTextGraphQlResponse } from "react-datocms";
import { StructuredText } from "@/components/StructuredText";
import { GridContainer } from "@/components/Grid/Grid";
import { useHeroStyles } from "@/components/useLayoutStyles";

const useStyles = makeStyles<{
  hero: string | undefined;
  bgColor: string | undefined;
  color: string | undefined;
}>()((theme, params) => ({
  wrapper: {
    paddingBottom: "80px",
  },
  root: {
    flexDirection: "column",
    justifyContent: "end",
    paddingTop: "120px",
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
    gap: theme.spacing(5),
  },

  lead: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(5),
  },

  market: {
    borderTopRightRadius: "110px",
    borderBottomLeftRadius: "110px",
    marginTop: theme.spacing(9),
  },
  line: {
    width: "55px",
    height: "1px",
    backgroundColor: params.color,
    border: `3px solid ${params.color}`,
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
  titleTypographyProps?: TypographyProps;
  leadStructuredTextProps?: React.ComponentProps<typeof StructuredText>;
  showTitleLine?: boolean;
  sx?: BoxProps["sx"];
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
    titleTypographyProps,
    leadStructuredTextProps,
    showTitleLine = true,
    sx,
  } = props;
  const { classes, cx } = useStyles({ hero, bgColor, color });
  const { classes: herolayoutClasses } = useHeroStyles({
    shiftedLeft,
  });
  const shifter = <div className={herolayoutClasses.shifter} />;

  return (
    <Box className={classes.wrapper}>
      <Box className={cx(classes.root, variant === "market" ? classes.market : undefined)} sx={sx}>
        <GridContainer sx={{ height: "100%" }}>
          {shiftedLeft ? shifter : null}
          <div className={cx(classes.gridElement, herolayoutClasses.heroContent)}>
            {showTitleLine && <Box className={classes.line} />}
            <Typography
              variant="display2"
              component="h1"
              {...titleTypographyProps}
              sx={{ color, ...titleTypographyProps?.sx }}
            >
              {title}
            </Typography>
          </div>
        </GridContainer>
      </Box>
      {lead && (
        <Box className={classes.lead}>
          <GridContainer>
            {shiftedLeft ? shifter : null}

            <div className={herolayoutClasses.heroContent}>
              <StructuredText
                paragraphTypographyProps={{ variant: "h3", component: "p", fontWeight: "regular" }}
                data={lead}
                {...leadStructuredTextProps}
                sx={{ "&&": { pb: 0 } }}
              />
            </div>
          </GridContainer>
        </Box>
      )}
    </Box>
  );
};
