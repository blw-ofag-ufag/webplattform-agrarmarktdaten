import { Flex } from "@theme-ui/components";
import { ReactNode } from "react";
import { colors } from "./colors";

export const StickyHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      sx={{
        position: "sticky",
        top: 0,
        height: 100,
        zIndex: 6,
        backgroundColor: colors.yellow,
        color: colors.almostBlack,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Flex>
  );
};
