import { FormControl, FormHelperText } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { Controller, FieldValues } from "react-hook-form";

interface Props<FormType extends FieldValues> {
  control: any;
  name: string;
  label: string;

  disabled?: boolean;
  dataTestId?: string;
  defaultValue?: string;
  helperMessage?: string;
  options?: string[];
  onChange?: (date: Date | null) => void;
}

export const ControlledCalendar = <FormType extends FieldValues>({
  control,
  name,
  label,
  disabled,
  dataTestId,
  defaultValue,
  helperMessage,
  options,
  onChange,
  ...props
}: Props<FormType>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange: controllerOnChange, value },
        fieldState: { error },
      }) => (
        <FormControl
          fullWidth
          error={!!error}
          variant="outlined"
          margin="normal"
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              onChange={(date: Date | null) => {
                controllerOnChange(date);
                if (onChange) onChange(date);
              }}
              value={value ? new Date(value) : null}
              disabled={disabled}
              disableFuture
              label={label}
              slotProps={{
                textField: {
                  error: !!error,
                },
              }}
              {...props}
            />
          </LocalizationProvider>

          {(error || helperMessage) && (
            <FormHelperText>{error?.message || helperMessage}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
