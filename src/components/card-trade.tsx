import { Card, Typography, Link } from "@mui/material";
import { Icon, IconName } from "../icons";
import Flex from "../components/flex";

export const TradeLevelsGrid = ({
  tradeLevels,
  color,
}: {
  tradeLevels: { title: string; icon: IconName }[];
  color: string;
}) => (
  <Flex sx={{ justifyContent: "space-between", flexFlow: "row wrap" }}>
    {tradeLevels.map((tl) => (
      <TradeCard key={tl.title} title={tl.title} icon={tl.icon} color={color} />
    ))}
  </Flex>
);

const TradeCard = ({
  title,
  icon,
  color,
}: {
  title: string;
  icon: IconName;
  color: string;
}) => {
  return (
    <Card variant="primary" sx={{ width: ["49%", "24%"], mb: 4 }}>
      <TradeIcon icon={icon} color={color} />
      <Typography
        component="h2"
        sx={{
          fontSize: 5,
          fontWeight: "bold",
          lineHeight: "heading",
          textAlign: "center",
        }}
      >
        <Link>{title}</Link>
      </Typography>
    </Card>
  );
};

export const TradeIcon = ({
  icon,
  color,
}: {
  icon: IconName;
  color: string;
}) => {
  return (
    <Flex
      sx={{
        backgroundColor: `${color}Light`,
        color: color,
        width: "100%",
        height: "5.5rem",
        justifyContent: "center",
        alignItems: "center",
        mb: 2,
        fontSize: "3rem",
        "&:hover": { backgroundColor: `${color}LightHover` },
      }}
    >
      <Icon name={icon} size={50} />
    </Flex>
  );
};
