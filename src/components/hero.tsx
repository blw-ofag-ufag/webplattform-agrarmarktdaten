import { Box, BoxProps, Typography, TypographyProps } from "@mui/material";
import { makeStyles } from "./style-utils";
import { StructuredTextGraphQlResponse } from "react-datocms";
import { StructuredText } from "@/components/StructuredText";
import { GridContainer } from "@/components/Grid/Grid";
import { useHeroStyles } from "@/components/useLayoutStyles";

const useStyles = makeStyles<{
  variant?: "regular" | "market";
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
    width: "100%",
    backgroundImage: `url(${params.hero})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    paddingTop: params.variant === "regular" ? "120px" : 0,
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
    marginTop: theme.spacing(9),
    backgroundColor: params.bgColor,
    borderRadius: "8px",
    paddingBlock: "56px",
    paddingInline: "32px",
  },
  line: {
    width: "112px",
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
    sx,
  } = props;
  const { classes, cx } = useStyles({ hero, bgColor, color, variant });
  const { classes: herolayoutClasses } = useHeroStyles({
    shiftedLeft,
  });
  const shifter = <div className={herolayoutClasses.shifter} />;

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.root} sx={sx}>
        <GridContainer sx={{ height: "100%" }}>
          {shiftedLeft ? shifter : null}
          <div
            className={cx(
              classes.gridElement,
              herolayoutClasses.heroContent,
              variant === "market" ? classes.market : undefined
            )}
          >
            <Box className={classes.line} />
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
