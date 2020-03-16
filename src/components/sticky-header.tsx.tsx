import { Box, Flex } from "@theme-ui/components";
import { ReactNode } from "react";
import * as M from "../material";

export const StickyHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      sx={{
        position: "sticky",
        top: 0,
        height: 100,
        zIndex: 6,
        backgroundColor: M.colors.yellow,
        color: M.colors.almostBlack,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {children}
    </Flex>
  );
};
