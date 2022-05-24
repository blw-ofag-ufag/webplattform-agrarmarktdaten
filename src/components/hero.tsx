import { Typography } from "@mui/material";

import { ContentContainer } from "./content-container";
import Flex from "./flex";

export const Hero = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "456px",
        backgroundColor: "muted.main",
      }}
    >
      <ContentContainer narrow={true} sx={{ textAlign: "center" }}>
        <Typography variant="h1">{title}</Typography>
        <Typography variant="subtitle1" sx={{ mt: 3, color: "secondary.main" }}>
          {description}
        </Typography>
      </ContentContainer>
    </Flex>
  );
};
