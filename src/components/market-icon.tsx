import { Card, Flex, Text } from "theme-ui";
import { Icon, IconName } from "../icons";

export const MarketCard = ({
  title,
  icon,
}: {
  title: string;
  icon: IconName;
}) => {
  return (
    <Card variant="primary" sx={{ width: 150 }}>
      <MarketIcon icon={icon} />
      <Text
        as="h2"
        sx={{
          fontSize: 5,
          fontWeight: "bold",
          lineHeight: "heading",
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </Card>
  );
};

export const MarketIcon = ({ icon }: { icon: IconName }) => {
  return (
    <Flex
      sx={{
        bg: `${icon}Light`,
        color: icon,
        borderRadius: "100%",
        width: "5.5rem",
        height: "5.5rem",
        justifyContent: "center",
        alignItems: "center",
        mb: 2,
        fontSize: "3rem",
        "&:hover": { bg: `${icon}LightHover` },
      }}
    >
      <Icon name={icon} size={50} />
    </Flex>
  );
};
