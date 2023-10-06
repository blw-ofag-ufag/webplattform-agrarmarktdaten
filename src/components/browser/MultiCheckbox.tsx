import { CheckboxValue } from "@/domain/data";
import { Checkbox, FormControlLabel, Radio, Typography } from "@mui/material";

const renderCheckbox = ({ value }: { value: CheckboxValue }) => (
  <Checkbox value={value.value} checked={value.value || false} />
);
const renderRadio = ({ value }: { value: CheckboxValue }) => (
  <Radio sx={{ mt: "-6px" }} size="small" checked={value.value || false} />
);

const MultiCheckbox = <T extends CheckboxValue>({
  values,
  onChange,
  radio,
}: {
  values: T[];
  onChange: (v: T[]) => void;
  radio?: boolean;
}) => {
  const handleChange = (i: number, value: boolean) => {
    let newValues;
    if (radio) {
      newValues = values.map((v, j) => ({ ...v, value: i === j }));
    } else {
      newValues = [
        ...values.slice(0, i),
        { ...values[i], value },
        ...values.slice(i + 1),
      ];
    }
    onChange(newValues);
  };
  const control = radio ? renderRadio : renderCheckbox;

  return (
    <>
      {values.map((value, i) => (
        <FormControlLabel
          key={value.name}
          disableTypography
          sx={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            "& .MuiTypography-root": {
              position: "relative",
              top: 2,
            },
          }}
          label={<Typography variant="body2">{value.label}</Typography>}
          name={value.name}
          control={control({ value })}
          onChange={(_, checked: boolean) => {
            handleChange(i, checked);
          }}
        />
      ))}
    </>
  );
};

export default MultiCheckbox;
