import { FormControlLabel, Radio, Stack, Typography, formLabelClasses } from "@mui/material";
import { Option } from "@/domain/filters";
import { makeStyles } from "@/components/style-utils";

export type RadioProps<T extends Option> = {
  options: T[];
  value: T;
  onChange: (newValues: T[]) => void;
};

const useStyles = makeStyles()(({ palette: c }) => ({
  radio: {
    [`&.${formLabelClasses.disabled}`]: {
      color: c.monochrome[400],
    },
  },
}));

export default function RadioFilter<T extends Option>({
  options,
  value,
  onChange,
}: {
  options: T[];
  value?: T;
  onChange: (v: T) => void;
}) {
  const { classes } = useStyles();
  return (
    <Stack>
      {options.map((option) => (
        <FormControlLabel
          className={classes.radio}
          checked={value && option.value === value.value}
          key={option.value}
          disabled={option?.disabled}
          label={<Typography variant="body2">{option.label}</Typography>}
          name={option.label}
          control={<Radio size="small" sx={{ padding: 1 }} />}
          onChange={() => {
            onChange(option);
          }}
        />
      ))}
    </Stack>
  );
}
