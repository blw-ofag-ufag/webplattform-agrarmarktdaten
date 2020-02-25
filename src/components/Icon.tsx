import { Flex } from "theme-ui";

export const Icon = ({ icon }: { icon: string }) => {
  return (
    <Flex
      sx={{
        bg: "primary",
        color: "background",
        borderRadius: "100%",
        width: "4rem",
        height: "4rem",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 5,
        textDecoration: "none"
      }}
    >
      {icon.substr(0, 1).toLocaleUpperCase()}
    </Flex>
  );
};
