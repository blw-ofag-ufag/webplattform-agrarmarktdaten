import { CheckboxValue } from "@/domain/data";
import {
  Autocomplete,
  AutocompleteProps,
  Checkbox,
  TextField,
  styled,
} from "@mui/material";
import { useMemo } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const StyledTextField = styled(TextField)({
  "& input": {
    minWidth: "100% !important",
  },
});

const MultiCheckboxAutocomplete = <T extends CheckboxValue>({
  values,
  onChange,
  placeholder,
  groupBy,
}: {
  values: T[];
  onChange: (newValues: T[]) => void;
  placeholder: string;
  groupBy?: (item: T) => string;
}) => {
  const selected = useMemo(() => {
    return values.filter((x) => x.value);
  }, [values]);

  const handleChange: AutocompleteProps<T, true, false, false>["onChange"] = (
    _,
    value
  ) => {
    const selectedByName = new Set(value.map((s) => s.name));
    const newValues = values.map((v) => ({
      ...v,
      value: selectedByName.has(v.name),
    }));
    onChange(newValues);
  };

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      value={selected}
      options={values}
      disableCloseOnSelect
      onChange={handleChange}
      sx={{
        "& .MuiOutlinedInput-root .MuiAutocomplete-endAdornment": {
          top: "7px",
        },
      }}
      disableClearable
      getOptionLabel={(option) => option.label}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.label}
        </li>
      )}
      style={{ width: "100%" }}
      ChipProps={{ size: "small" }}
      groupBy={groupBy}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          placeholder={placeholder}
          size="small"
          sx={{ display: "block", minWidth: "100% !important" }}
        />
      )}
    />
  );
};

export default MultiCheckboxAutocomplete;
