import NextLink from "next/link";
import { Trans } from "@lingui/macro";
import * as React from "react";
import { BlogpostCard } from "@/components/BlogpostCard";
import Grid from "@mui/material/Unstable_Grid2";
import * as GQL from "@/graphql";
import Carousel from "react-material-ui-carousel";
import { Button, useMediaQuery, Box, Typography } from "@mui/material";
import { b, s, c } from "@interactivethings/swiss-federal-ci";
import LensIcon from "@mui/icons-material/Lens";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowRight from "@/icons/icons-jsx/control/IcControlArrowRight";
import { ContentContainer } from "@/components/content-container";

interface Props {
  blogposts: GQL.SimpleBlogPostFragment[];
}

export const TopBlogpostsTeaser = (props: Props) => {
  const { blogposts } = props;
  const isDesktop = useMediaQuery(b.up("xl"));
  const isTablet = useMediaQuery(b.between("md", "xl"));
  const isMobile = useMediaQuery(b.down("md"));

  const content = (() => {
    if (isDesktop) {
      return (
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
          sx={{ width: "100%" }}
          rowGap={6}
          columns={{ xxxl: 12, xxl: 12, xl: 12, lg: 6, md: 6, sm: 4, xs: 4, xxs: 4 }}
        >
          {blogposts.map((d) => (
            <Grid key={d.id} xxxl={4} xxl={4} xl={4} lg={0} md={0} sm={0} xs={0} xxs={0}>
              <BlogpostCard {...d} />
            </Grid>
          ))}
        </Grid>
      );
    }
    if (isTablet) {
      const cards = [];
      for (let i = 0; i < blogposts.length; i += 2) {
        console.log(i);
        if (blogposts[i + 1]) {
          cards.push(
            <Box key={i} display="flex">
              <Grid
                key={blogposts[i].id}
                xxxl={0}
                xxl={0}
                xl={0}
                lg={3}
                md={3}
                sm={4}
                xs={4}
                xxs={4}
              >
                <BlogpostCard {...blogposts[i]} />
              </Grid>
              <Grid
                key={blogposts[i + 1].id}
                xxxl={0}
                xxl={0}
                xl={0}
                lg={3}
                md={3}
                sm={4}
                xs={4}
                xxs={4}
              >
                <BlogpostCard {...blogposts[i + 1]} />
              </Grid>
            </Box>
          );
        } else {
          cards.push(
            <Grid key={blogposts[i].id} xxxl={0} xxl={0} xl={0} lg={3} md={3} sm={4} xs={4} xxs={4}>
              <BlogpostCard {...blogposts[i]} />
            </Grid>
          );
        }
      }
      return (
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
          sx={{ maxWidth: "1676px", width: "100%", margin: "0 auto" }}
          rowGap={6}
          columns={{ xxxl: 12, xxl: 12, xl: 12, lg: 6, md: 6, sm: 4, xs: 4, xxs: 4 }}
        >
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
        </Grid>
      );
    }
    if (isMobile) {
      return (
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
          sx={{ maxWidth: "1676px", width: "100%", margin: "0 auto" }}
          rowGap={6}
          columns={{ xxxl: 12, xxl: 12, xl: 12, lg: 6, md: 6, sm: 4, xs: 4, xxs: 4 }}
        >
          <Carousel
            autoPlay={false}
            IndicatorIcon={<LensIcon />}
            NextIcon={<ArrowForwardIosIcon />}
            PrevIcon={<ArrowBackIosIcon />}
            sx={{ width: "100%", height: "fit-content", display: "flex", flexDirection: "column" }}
          >
            {blogposts.map((d) => (
              <Grid key={d.id} xxxl={0} xxl={0} xl={0} lg={6} md={6} sm={4} xs={4} xxs={4}>
                <BlogpostCard {...d} />
              </Grid>
            ))}
          </Carousel>
        </Grid>
      );
    }
  })();

  return (
    <ContentContainer sx={{ display: "flex", flexDirection: "column", mt: "40px" }}>
      <Typography variant="h1" sx={{ width: "100%", mb: s(8) }}>
        <Trans id="homepage.section.latestBlogPosts">Neuste Blogbeiträge</Trans>
      </Typography>
      <Box
        display="flex"
        sx={{
          justifyContent: "center",
          [b.up("xxxl")]: {
            mx: s(-16 / 2),
          },
          [b.up("xxl")]: {
            mx: s(-16 / 2),
          },
          [b.only("xl")]: {
            mx: s(-12 / 2),
          },
          [b.only("lg")]: {
            mx: s(-10 / 2),
          },
          [b.only("md")]: {
            mx: s(-9 / 2),
          },
          [b.only("sm")]: {
            mx: s(-7 / 2),
          },
          [b.only("xs")]: {
            mx: s(-5 / 2),
          },
          [b.down("xs")]: {
            mx: s(-4 / 2),
          },
        }}
      >
        {content}
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
    </ContentContainer>
  );
};

export default TopBlogpostsTeaser;
