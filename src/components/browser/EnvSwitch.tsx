import { Environment, environments, lindasAtom } from "@/domain/cubes";
import { FormControl, MenuItem, Paper, Select, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { makeStyles } from "../style-utils";

const useStyles = makeStyles()((theme) => ({
  container: {
    position: "fixed",
    top: 0,
    left: "50%",
    zIndex: 1100,
    transform: "translateX(-50%)",
    padding: theme.spacing(2, 4),
    borderBottom: "2px solid",
    borderColor: theme.palette.red[500],
    borderBottomLeftRadius: theme.spacing(1),
    borderBottomRightRadius: theme.spacing(1),
  },
}));

export default function EnvSwitch() {
  const { classes } = useStyles();
  const [lindas, setLindas] = useAtom(lindasAtom);

  return (
    <Paper className={classes.container} elevation={8}>
      <FormControl size="small">
        <Stack direction="row" spacing={4} alignItems="baseline">
          <Typography
            id="env-switch-label"
            variant="h5"
            sx={{
              textWrap: "nowrap",
            }}
          >
            Data Source:
          </Typography>
          <Select
            labelId="env-switch-label"
            sx={{
              minWidth: 100,
              height: 40,
            }}
            value={lindas.value}
            onChange={(e) => {
              const value = e.target.value as Environment;
              const env = environments[value];
              setLindas(env);
            }}
          >
            {Object.keys(environments).map((key) => {
              const env = environments[key as Environment];
              return (
                <MenuItem key={key} value={env.value}>
                  {env.label}
                </MenuItem>
              );
            })}
          </Select>
        </Stack>
      </FormControl>
    </Paper>
  );
}
