import { Card, Typography } from "@mui/material";

import Flex from "@/components/flex";
import { Icon, IconName } from "@/icons";

export const MarketCard = ({
  title,
  icon,
}: {
  title: string;
  icon: IconName;
}) => {
  return (
    <Card
      sx={{
        width: 150,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
      elevation={0}
    >
      <MarketIcon icon={icon} />
      <Typography
        component="h2"
        sx={{
          fontSize: 5,
          fontWeight: "bold",
          lineHeight: "heading",
          textAlign: "center",
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
