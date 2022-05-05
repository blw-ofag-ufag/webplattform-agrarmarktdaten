import { timeFormat, timeParse } from "d3";
import { Typography } from "@mui/material";
import { Newsfeed } from "../domain/types";
import Flex from "../components/flex";

const parseTime = timeParse("%Y-%m-%d");
const formatTime = timeFormat("%d.%m.%Y");

export const NewsfeedEntry = ({ title, publicationDate }: Newsfeed) => {
  const date = formatTime(parseTime(publicationDate)!);
  return (
    <Flex
      sx={{
        flexDirection: "column",
        color: "text",
        cursor: "pointer",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        borderBottomColor: "divider",
        py: 4,

        "&:last-of-type": {
          borderBottom: "none",
        },
      }}
    >
      <Typography
        sx={{ fontSize: 4, lineHeight: "body", fontWeight: "bold", pb: 1 }}
      >
        {title}
      </Typography>
      <Typography
        sx={{ fontSize: 4, lineHeight: "body", fontWeight: "regular" }}
      >
        {date}
      </Typography>
    </Flex>
  );
};
