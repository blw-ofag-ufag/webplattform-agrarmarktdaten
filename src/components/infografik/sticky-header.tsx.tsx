import { ReactNode } from "react";

import Flex from "@/components/components/flex";
import { colors } from "@/components/infografik/colors";

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
