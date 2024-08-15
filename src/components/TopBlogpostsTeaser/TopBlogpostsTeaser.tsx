import NextLink from "next/link";
import { Trans } from "@lingui/macro";
import * as React from "react";
import { BlogpostCard } from "@/components/BlogpostCard";
import * as GQL from "@/graphql";
import { Button, Box, Typography, Fade } from "@mui/material";
import { s } from "@interactivethings/swiss-federal-ci";
import ArrowRight from "@/icons/icons-jsx/control/IcControlArrowRight";
import { GridWrap, GridWrapElement, GridContainer } from "@/components/Grid";
import { makeStyles } from "@/components/style-utils";
import { useIsDesktop, useIsMobile, useIsTablet } from "@/components/Grid/Grid";
import slugs from "@/generated/slugs.json";
import { useRouter } from "next/router";
import { Carousel } from "../Carousel";

const useStyles = makeStyles()(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    zIndex: 0,
  },
  indicatorIcon: {
    fontSize: "1rem",
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

  const perPage = isTablet ? 2 : 1;

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
    if (isTablet || isMobile) {
      return (
        <Carousel perPage={perPage}>
          {blogposts.map((x) => {
            return (
              <Fade in key={x.id}>
                <GridWrapElement>
                  <BlogpostCard {...x} />
                </GridWrapElement>
              </Fade>
            );
          })}
        </Carousel>
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
        <Box width="100%" display="flex" justifyContent="center" mt={8}>
          <Box width="100%">
            <Box display="flex" justifyContent="end">
              <NextLink href={`/${localeSlugs?.analysis}`} legacyBehavior>
                <Button variant="ghost" sx={{ color: (theme) => theme.palette.cobalt[500] }}>
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
