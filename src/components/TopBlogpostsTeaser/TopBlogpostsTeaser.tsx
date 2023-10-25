import NextLink from "next/link";
import { Trans } from "@lingui/macro";
import * as React from "react";
import { BlogpostCard } from "@/components/BlogpostCard";
import * as GQL from "@/graphql";
import Carousel from "react-material-ui-carousel";
import { Button, useMediaQuery, Box, Typography } from "@mui/material";
import { b, s, c } from "@interactivethings/swiss-federal-ci";
import LensIcon from "@mui/icons-material/Lens";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowRight from "@/icons/icons-jsx/control/IcControlArrowRight";
import { GridContainer, GridWrap, GridWrapElement } from "@/components/Grid";
import { useTheme } from "@mui/material/styles";

interface Props {
  blogposts: GQL.SimpleBlogPostFragment[];
}

export const TopBlogpostsTeaser = (props: Props) => {
  const { blogposts } = props;
  const isDesktop = useMediaQuery(b.up("xl"));
  const isTablet = useMediaQuery(b.between("md", "xl"));
  const isMobile = useMediaQuery(b.down("md"));

  const theme = useTheme();

  const content = (() => {
    if (isDesktop) {
      return (
        <GridWrap>
          {blogposts.map((d) => (
            <GridWrapElement
              key={d.id}
              sx={{
                textDecoration: "none",
                [theme.breakpoints.only("xxxl")]: { width: "calc(81px * 4 + 64px * 3)" },
                [theme.breakpoints.only("xxl")]: { width: "calc(70px * 4 + 64px * 3)" },
                [theme.breakpoints.only("xl")]: { width: "calc(52px * 4 + 48px * 3)" },
                [theme.breakpoints.only("lg")]: { width: "calc(121px * 3 + 40px * 2)" },
                [theme.breakpoints.only("md")]: { width: "calc(86px * 3 + 36px * 2)" },
                [theme.breakpoints.only("sm")]: { width: "calc(65px * 3 + 35px * 2)" },
                [theme.breakpoints.down("sm")]: { width: "100%" },
              }}
            >
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
              <GridWrapElement key={blogposts[i].id}>
                <Box sx={{ mr: s(2) }}>
                  <BlogpostCard {...blogposts[i]} />
                </Box>
              </GridWrapElement>
              <GridWrapElement key={blogposts[i + 1].id}>
                <Box sx={{ ml: s(2) }}>
                  <BlogpostCard {...blogposts[i + 1]} />
                </Box>
              </GridWrapElement>
            </Box>
          );
        } else {
          cards.push(
            <GridWrapElement key={blogposts[i].id}>
              <BlogpostCard {...blogposts[i]} />
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
            IndicatorIcon={<LensIcon />}
            NextIcon={<ArrowForwardIosIcon />}
            PrevIcon={<ArrowBackIosIcon />}
            sx={{ width: "100%", height: "fit-content", display: "flex", flexDirection: "column" }}
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
    <GridContainer sx={{ display: "flex", flexDirection: "column", mt: "40px", mb: "40px" }}>
      <Typography variant="h1" sx={{ width: "100%", mb: s(8) }}>
        <Trans id="homepage.section.latestBlogPosts">Neuste Blogbeiträge</Trans>
      </Typography>
      {content}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: s(8) }}>
        <Box sx={{ maxWidth: "1676px", width: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <NextLink href={`/analysis`} legacyBehavior>
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
  );
};

export default TopBlogpostsTeaser;
