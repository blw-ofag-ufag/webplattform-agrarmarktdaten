import { Typography } from "@mui/material";

import { ContentContainer } from "./content-container";
import Flex from "./flex";

type Props = {
  title: string;
  lead: string;
};

export const Hero = (props: Props) => {
  const { title, lead } = props;

  return (
    <Flex
      sx={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "420px",
        backgroundColor: "muted.main",
      }}
    >
      <ContentContainer narrow={true} sx={{ textAlign: "center" }}>
        <Typography variant="h1">{title}</Typography>
        <Typography variant="subtitle1" sx={{ mt: 3, color: "secondary.main" }}>
          {lead}
        </Typography>
      </ContentContainer>
    </Flex>
  );
};
