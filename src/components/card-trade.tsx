import { Flex, Card, Text, Link } from "theme-ui";
import { Icon, IconName } from "../icons";

export const TradeLevelsGrid = ({
  tradeLevels,
  color
}: {
  tradeLevels: { title: string; icon: IconName }[];
  color: string;
}) => (
  <Flex sx={{ justifyContent: "space-between", flexFlow: "row wrap" }}>
    {tradeLevels.map(tl => (
      <TradeCard title={tl.title} icon={tl.icon} color={color} />
    ))}
  </Flex>
);

const TradeCard = ({
  title,
  icon,
  color
}: {
  title: string;
  icon: IconName;
  color: string;
}) => {
  return (
    <Card variant="primary" sx={{ width: ["49%", "24%"], mb: 4 }}>
      <TradeIcon icon={icon} color={color} />
      <Text
        as="h2"
        sx={{
          fontSize: 5,
          fontWeight: "bold",
          lineHeight: "heading",
          textAlign: "center"
        }}
      >
        <Link>{title}</Link>
      </Text>
    </Card>
  );
};

export const TradeIcon = ({
  icon,
  color
}: {
  icon: IconName;
  color: string;
}) => {
  return (
    <Flex
      sx={{
        bg: `${color}Light`,
        color: color,
        width: "100%",
        height: "5.5rem",
        justifyContent: "center",
        alignItems: "center",
        mb: 2,
        fontSize: "3rem",
        "&:hover": { bg: `${color}LightHover` }
      }}
    >
      <Icon name={icon} size={50} />
    </Flex>
  );
};
