import { makeStyles } from "@/components/style-utils";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { ComponentProps } from "react";

const useStyles = makeStyles()((theme) => ({
  root0: {
    "&:not(:first-child)": {
      marginLeft: "-16px",
    },
    width: "56px",
    height: "56px",
    border: "2px solid",
    borderColor: theme.palette.background.paper,
  },
}));

export const Avatars = ({
  avatars,
  avatarProps,
}: {
  avatars: { url?: string; alt: string }[];
  avatarProps?: ComponentProps<typeof Avatar>;
}) => {
  const { classes, cx } = useStyles();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {avatars.map(({ url, alt }, i) => {
        return (
          <Avatar
            key={`${i}`}
            alt={`${alt}`}
            src={url}
            {...avatarProps}
            className={cx(classes.root0, avatarProps?.className)}
            style={{ zIndex: -i, ...avatarProps?.style }}
          />
        );
      })}
    </Box>
  );
};
