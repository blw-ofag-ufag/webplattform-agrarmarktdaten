import { Flex } from "@theme-ui/components";
import { ReactNode } from "react";
import { colors } from "./colors";

export const ChapterHeader = ({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) => {
  return (
    <Flex
      id={id}
      as="h2"
      sx={{
        // backgroundColor: colors.brown,
        // backgroundBlendMode: "soft-light",
        backgroundImage: `url("/img/${id}-brown.png")`,
        backgroundSize: "cover",
        width: [`calc(100% + 1.5rem)`, `calc(100% + 2rem)`],
        marginLeft: [-3, -4],
        position: "relative",
        marginTop: "2rem",
        fontSize: "32px",
        fontWeight: "bold",
        height: 150,
        color: "white",
        justifyContent: "center",
        alignItems: "center",

        // "::after": {
        //   content: "''",
        //   opacity: 0.5,
        //   top: 0,
        //   left: 0,
        //   bottom: 0,
        //   right: 0,
        //   position: "absolute",
        //   zIndex: -1
        // }
      }}
    >
      {children}
    </Flex>
  );
};
