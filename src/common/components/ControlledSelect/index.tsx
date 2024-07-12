import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { StyledSelect } from "./styled";

interface Option {
  key: string;
  value: string;
  disabled?: boolean;
}

interface ControlledSelectProps<FormType extends FieldValues> {
  control: Control<FormType>;
  name: Path<FormType>;
  options: Option[];
  label: string;
  helperMessage?: string;
}

const ControlledSelect = <FormType extends FieldValues>({
  control,
  name,
  options,
  label,
  helperMessage,
}: ControlledSelectProps<FormType>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, ref, onBlur },
        fieldState: { error },
      }) => (
        <FormControl
          fullWidth
          error={!!error}
          variant="outlined"
          margin="normal"
        >
          {label && <InputLabel>{label}</InputLabel>}
          <StyledSelect
            label={label}
            value={value || ""}
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            MenuProps={{
              PaperProps: {
                style: {
                  backgroundColor: "#f0f0f3",
                  borderRadius: "10px",
                },
              },
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {options.map((option) => (
              <MenuItem
                key={option.key}
                value={option.key}
                disabled={option.disabled}
              >
                {option.value}
              </MenuItem>
            ))}
          </StyledSelect>
          {(error || helperMessage) && (
            <FormHelperText>{error?.message ?? helperMessage}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default ControlledSelect;
