import { FormControlLabel, Radio, Stack, Typography } from "@mui/material";
import { Option } from "@/domain/filters";

export type RadioProps<T extends Option> = {
  options: T[];
  value: T;
  onChange: (newValues: T[]) => void;
};

export default function RadioFilter<T extends Option>({
  options,
  value,
  onChange,
}: {
  options: T[];
  value?: T;
  onChange: (v: T) => void;
}) {
  return (
    <Stack>
      {options.map((option) => (
        <FormControlLabel
          checked={value && option.value === value.value}
          key={option.value}
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
