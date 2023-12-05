import { Box, Card, Fade, Theme, Typography, useMediaQuery } from "@mui/material";
import { Carousel as CarouselComponent } from "@/components/Carousel";

export const Carousel = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  return (
    <Box maxWidth={800} m={4}>
      <CarouselComponent perPage={isMobile ? 1 : 3}>
        {Array.from({ length: 10 })
          .fill(null)
          .map((x, i) => {
            return (
              <Fade key={i} in>
                <Card key={i} sx={{ p: 4 }} elevation={6}>
                  <Typography variant="h4">Card {i}</Typography>
                  <Typography variant="body1">Description for card {i}</Typography>
                </Card>
              </Fade>
            );
          })}
      </CarouselComponent>
    </Box>
  );
};

export default {
  title: "App components / Carousel",
  component: CarouselComponent,
};
