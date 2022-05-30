import { Card, Typography } from "@mui/material";

import Flex from "@/components/flex";
import { Icon, IconName } from "@/icons";

export const MarketCard = ({ title }: { title: string }) => {
  return (
    <Card
      sx={{
        width: 226,
        height: 280,
        backgroundColor: "grey.300",
        borderTopRightRadius: "30px",
        borderBottomLeftRadius: "30px",
      }}
      elevation={0}
    >
      <Typography
        component="h2"
        sx={{
          mt: "30px",
          ml: "20px",
          fontSize: 5,
          fontWeight: "bold",
          lineHeight: "heading",
          textTransform: "uppercase",
        }}
      >
        {title}
      </Typography>
    </Card>
  );
};

export const MarketIcon = ({ icon }: { icon: IconName }) => {
  return (
    <Flex
      sx={{
        backgroundColor: `${icon}.light`,
        color: `${icon}.main`,
        borderRadius: "100%",
        width: "5.5rem",
        height: "5.5rem",
        justifyContent: "center",
        alignItems: "center",
        mb: 2,
        fontSize: "3rem",
        "&:hover": { backgroundColor: `${icon}.lightHover` },
      }}
    >
      <Icon name={icon} size={50} />
    </Flex>
  );
};
