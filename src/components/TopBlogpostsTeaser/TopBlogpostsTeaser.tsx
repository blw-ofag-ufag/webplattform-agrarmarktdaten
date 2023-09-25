import NextLink from "next/link";
import { Trans } from "@lingui/macro";
import * as React from "react";
import { BlogpostCard } from "@/components/BlogpostCard";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import * as GQL from "@/graphql";
import Carousel from "react-material-ui-carousel";
import { Button, useMediaQuery, Box, Typography } from "@mui/material";
import { b, s, c } from "@interactivethings/swiss-federal-ci";
import LensIcon from "@mui/icons-material/Lens";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowRight from "@/icons/icons-jsx/control/IcControlArrowRight";

interface Props {
  blogposts: GQL.SimpleBlogPostFragment[];
}

export const TopBlogpostsTeaser = (props: Props) => {
  const { blogposts } = props;
  const isNotDesktop = useMediaQuery(b.down("xl"));
  const isDesktop = useMediaQuery(b.up("xl"));

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box sx={{ maxWidth: "1676px", width: "100%" }}>
          <Typography variant="h1" sx={{ width: "100%", pl: s(7), mb: s(8) }}>
            <Trans id="homepage.section.latestBlogPosts">Neuste Blogbeiträge</Trans>
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {isDesktop && (
          <Grid
            container
            columnSpacing={{
              xxs: "16px",
              xs: "20px",
              sm: "28px",
              md: "36px",
              lg: "40px",
              xl: "48px",
              xxl: "64px",
              xxxl: "64px",
            }}
            sx={{ maxWidth: "1676px", margin: "0 auto" }}
            rowGap={6}
            columns={{ xxxl: 12, xxl: 12, xl: 12, lg: 6, md: 6, sm: 4, xs: 4, xxs: 4 }}
          >
            {blogposts.map((d) => (
              <Grid key={d.id} xxxl={4} xxl={4} xl={4} lg={0} md={0} sm={0} xs={0} xxs={0}>
                <BlogpostCard {...d} />
              </Grid>
            ))}
          </Grid>
        )}
        {isNotDesktop && (
          <Grid
            container
            columnSpacing={{
              xxs: "16px",
              xs: "20px",
              sm: "28px",
              md: "36px",
              lg: "40px",
              xl: "48px",
              xxl: "64px",
              xxxl: "64px",
            }}
            rowGap={6}
            columns={{ xxxl: 12, xxl: 12, xl: 12, lg: 6, md: 6, sm: 4, xs: 4, xxs: 4 }}
          >
            <Carousel
              autoPlay={false}
              IndicatorIcon={<LensIcon />}
              NextIcon={<ArrowForwardIosIcon />}
              PrevIcon={<ArrowBackIosIcon />}
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              {blogposts.map((d) => (
                <Grid key={d.id} xxxl={0} xxl={0} xl={0} lg={6} md={6} sm={4} xs={4} xxs={4}>
                  <BlogpostCard {...d} />
                </Grid>
              ))}
            </Carousel>
          </Grid>
        )}
      </Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: s(8) }}>
        <Box sx={{ maxWidth: "1676px", width: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <NextLink href="/blog" legacyBehavior>
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
    </Box>
  );
};

export default TopBlogpostsTeaser;
