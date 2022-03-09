import { timeFormat, timeParse } from "d3-time-format";
import { Flex, Text } from "theme-ui";
import { Newsfeed } from "../domain/types";

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
        borderBottomColor: "muted",
        py: 4,

        "&:last-of-type": {
          borderBottom: "none",
        },
      }}
    >
      <Text sx={{ fontSize: 4, lineHeight: "body", fontWeight: "bold", pb: 1 }}>
        {title}
      </Text>
      <Text sx={{ fontSize: 4, lineHeight: "body", fontWeight: "regular" }}>
        {date}
      </Text>
    </Flex>
  );
};
