import { makeStyles } from "@/components/style-utils";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";

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

export const Avatars: React.FC<{
  avatars: { url?: string; alt: string }[];
}> = ({ avatars }) => {
  const { classes } = useStyles();
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {avatars.map(({ url, alt }, i) => {
        return (
          <Avatar
            style={{ zIndex: -i }}
            key={`${i}`}
            alt={`${alt}`}
            src={url}
            className={classes.root0}
          />
        );
      })}
    </Box>
  );
};
