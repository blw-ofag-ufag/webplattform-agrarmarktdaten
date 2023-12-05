import { Typography } from "@mui/material";
import { Intersperse } from "@/components/Intersperse";
import { Avatars } from "@/components/Avatars";
import { makeStyles } from "@/components/style-utils";
import { HTMLProps } from "react";

const useStyles = makeStyles()((theme) => ({
  root: {
    display: "flex",
    position: "relative",
    height: "5.5rem",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1.25rem",
    [theme.breakpoints.down("md")]: {
      gap: "0.75rem",
    },
  },
  avatar: {
    width: "52px",
    height: "52px",
    [theme.breakpoints.down("md")]: {
      width: "40px",
      height: "40px",
    },
  },
  names: {
    flexWrap: "wrap",
    fontFamily: theme.typography.body1.fontFamily,
    fontSize: theme.typography.body1.fontSize,
    [theme.breakpoints.down("md")]: {
      fontSize: theme.typography.body3.fontSize,
    },
  },
}));

type Author = {
  img?: string;
  firstName?: string | null;
  lastName?: string | null;
  initials?: string | null;
  url?: string | null;
};

/**
 * @see https://storybook.bund-ds.bedev.liip.ch/?path=/docs/components-authors--example
 */
export const Authors = ({
  authors,
  ...props
}: {
  authors: Author[];
} & HTMLProps<HTMLDivElement>) => {
  const { classes, cx } = useStyles();
  return (
    <div {...props} className={cx(classes.root, props.className)}>
      <Avatars
        avatarProps={{ className: classes.avatar }}
        avatars={authors.map((x) => ({
          url: x.img,
          alt: `${x.firstName} ${x.lastName}`,
        }))}
      />
      <Typography variant="body1" fontSize="inherit" component="span" className={classes.names}>
        <Intersperse separator=",&nbsp;">
          {authors.map((author) => {
            return (
              <span key={`${author.firstName} ${author.lastName}`}>
                {`${author.firstName} ${author.lastName}`}
              </span>
            );
          })}
        </Intersperse>
      </Typography>
    </div>
  );
};
