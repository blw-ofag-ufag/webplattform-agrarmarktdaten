import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Intersperse } from "@/components/Intersperse";
import { Avatars } from "@/components/Avatars";
import { makeStyles } from "@/components/style-utils";
import { HTMLProps } from "react";

const useStyles = makeStyles()({
  root: {
    display: "flex",
    position: "relative",
    height: "5.5rem",
    alignItems: "center",
    gap: "1.25rem",
  },
});

export const Authors = ({
  authors,
  ...props
}: {
  authors: { img?: string; firstName?: string | null; lastName?: string | null }[];
} & HTMLProps<HTMLDivElement>) => {
  const { classes, cx } = useStyles();
  return (
    <div {...props} className={cx(classes.root, props.className)}>
      <Avatars
        avatars={authors.map((x) => ({
          url: x.img,
          alt: `${x.firstName} ${x.lastName}`,
        }))}
      />
      <Box display="flex" alignItems="center">
        <Intersperse separator=",&nbsp;">
          {authors.map((author) => {
            return (
              <Typography variant="body1" key={`${author.firstName} ${author.lastName}`}>
                {`${author.firstName} ${author.lastName}`}
              </Typography>
            );
          })}
        </Intersperse>
      </Box>
    </div>
  );
};
