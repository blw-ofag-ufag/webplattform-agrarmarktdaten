import { Flex } from "@theme-ui/components";
import { ReactNode } from "react";
import * as M from "../material";

export const ChapterHeader = ({
  id,
  children
}: {
  id: string;
  children: ReactNode;
}) => {
  return (
    <Flex
      id={id}
      as="h2"
      sx={{
        backgroundColor: M.colors.brown,
        backgroundBlendMode: "soft-light",
        backgroundImage: `url("/img/${id}.png")`,
        backgroundSize: "cover",
        width: [`calc(100% + 2rem)`, `calc(100% + 4rem)`],
        position: "relative",
        marginLeft: [-3, -4],
        marginTop: "2rem",
        fontSize: "32px",
        fontWeight: "bold",
        height: 150,
        color: "white",
        justifyContent: "center",
        alignItems: "center"

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
