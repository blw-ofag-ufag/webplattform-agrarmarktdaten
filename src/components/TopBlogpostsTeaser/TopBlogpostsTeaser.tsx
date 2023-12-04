import NextLink from "next/link";
import { Trans } from "@lingui/macro";
import * as React from "react";
import { BlogpostCard } from "@/components/BlogpostCard";
import * as GQL from "@/graphql";
import Carousel from "react-material-ui-carousel";
import { Button, Box, Typography } from "@mui/material";
import { s, c } from "@interactivethings/swiss-federal-ci";
import LensIcon from "@mui/icons-material/Lens";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowRight from "@/icons/icons-jsx/control/IcControlArrowRight";
import { GridWrap, GridWrapElement, GridContainer } from "@/components/Grid";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@/components/style-utils";
import { useIsDesktop, useIsMobile, useIsTablet } from "@/components/Grid/Grid";
import slugs from "@/generated/slugs.json";
import { useRouter } from "next/router";

const useStyles = makeStyles()((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  wrapElement: {
    [theme.breakpoints.only("lg")]: { width: "50%" },
    [theme.breakpoints.only("md")]: { width: "50%" },
  },
  wrapElementInner: {
    [theme.breakpoints.only("lg")]: { marginRight: "20px" },
    [theme.breakpoints.only("md")]: { marginRight: "18px" },
  },
}));

export const TopBlogpostsTeaser = (
  props: { blogposts: GQL.SimpleBlogPostFragment[] } & React.HTMLProps<HTMLDivElement>
) => {
  const { blogposts, ...rest } = props;
  const isDesktop = useIsDesktop();
  const isTablet = useIsTablet();
  const isMobile = useIsMobile();

  const { locale } = useRouter();
  const localeSlugs = slugs.find((slug) => slug.locale === locale)?.slugs;

  const { classes } = useStyles();

  const theme = useTheme();

  const content = (() => {
    if (isDesktop) {
      return (
        <GridWrap>
          {blogposts.map((d) => (
            <GridWrapElement key={d.id}>
              <BlogpostCard {...d} />
            </GridWrapElement>
          ))}
        </GridWrap>
      );
    }
    if (isTablet) {
      const cards = [];
      for (let i = 0; i < blogposts.length; i += 2) {
        if (blogposts[i + 1]) {
          cards.push(
            <Box key={i} display="flex">
              <GridWrapElement key={blogposts[i].id} className={classes.wrapElement}>
                <Box className={classes.wrapElementInner}>
                  <BlogpostCard {...blogposts[i]} />
                </Box>
              </GridWrapElement>
              <GridWrapElement key={blogposts[i + 1].id} className={classes.wrapElement}>
                <Box className={classes.wrapElementInner}>
                  <BlogpostCard {...blogposts[i + 1]} />
                </Box>
              </GridWrapElement>
            </Box>
          );
        } else {
          cards.push(
            <GridWrapElement key={blogposts[i].id} className={classes.wrapElement}>
              <Box className={classes.wrapElementInner}>
                <BlogpostCard {...blogposts[i]} />
              </Box>
            </GridWrapElement>
          );
        }
      }
      return (
        <GridWrap>
          <Carousel
            autoPlay={false}
            IndicatorIcon={<LensIcon />}
            NextIcon={<ArrowForwardIosIcon />}
            PrevIcon={<ArrowBackIosIcon />}
            sx={{
              width: "100%",
              height: "fit-content",
              display: "flex",
              flexDirection: "column",
              overflow: "initial",
            }}
          >
            {cards}
          </Carousel>
        </GridWrap>
      );
    }
    if (isMobile) {
      return (
        <GridWrap>
          <Carousel
            autoPlay={false}
            IndicatorIcon={<LensIcon className="indicatorIcon" fontSize="inherit" />}
            NextIcon={<ArrowForwardIosIcon />}
            PrevIcon={<ArrowBackIosIcon />}
            sx={{
              width: "100%",
              height: "fit-content",
              display: "flex",
              flexDirection: "column",

              "& .indicatorIcon": {
                fontSize: "1rem",
              },
            }}
          >
            {blogposts.map((d) => (
              <GridWrapElement
                key={d.id}
                sx={{ [theme.breakpoints.only("sm")]: { width: "100%" } }}
              >
                <BlogpostCard {...d} />
              </GridWrapElement>
            ))}
          </Carousel>
        </GridWrap>
      );
    }
  })();

  return (
    <div {...rest}>
      <GridContainer disableItemMargin className={classes.container}>
        <Typography variant="h1" sx={{ width: "100%", mb: s(8) }}>
          <Trans id="homepage.section.latestBlogPosts">Neuste Blogbeiträge</Trans>
        </Typography>
        {content}
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: s(8) }}>
          <Box sx={{ maxWidth: "1676px", width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <NextLink href={`/${localeSlugs?.analysis}`} legacyBehavior>
                <Button
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "fit-content",
                    backgroundColor: "transparent",
                    color: c.cobalt[500],
                    "&:hover": {
                      textDecoration: "underline",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <Trans id="button.show.all">Alle Anzeigen</Trans>
                  <ArrowRight />
                </Button>
              </NextLink>
            </Box>
          </Box>
        </Box>
      </GridContainer>
    </div>
  );
};

export default TopBlogpostsTeaser;
