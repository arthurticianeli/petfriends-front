import { TextField } from "@mui/material";
import { ChangeEventHandler, FocusEventHandler } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface Props<FormType extends FieldValues> {
  control: Control<FormType>;
  id?: string;
  type?: string;
  label?: string;
  name: Path<FormType>;
  value?: string | number;
  placeholder?: string;
  maxLength?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  mask?: (value: string) => string;
  dataTestId?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  helperMessage?: string;
  step?: string;
  autoComplete?: string;
  min?: string | number;
  max?: string | number;
  inputProps?: Record<string, unknown>;
}

const ControlledTextField = <FormType extends FieldValues>({
  control,
  id,
  type,
  label,
  name,
  placeholder,
  onBlur,
  onFocus,
  dataTestId,
  mask,
  disabled,
  maxLength,
  onChange,
  autoFocus,
  helperMessage,
  step,
  autoComplete,
  min,
  max,
  ...props
}: Props<FormType>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange: controllerOnChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <TextField
          inputRef={ref}
          id={id ?? name}
          name={name}
          label={label}
          placeholder={placeholder ?? label}
          type={type}
          margin="normal"
          value={value ?? ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange) onChange(event);
            mask
              ? controllerOnChange(mask(event.target.value))
              : controllerOnChange(event.target.value);
          }}
          onBlur={onBlur}
          onFocus={onFocus}
          error={!!error}
          helperText={error?.message ?? helperMessage}
          disabled={disabled}
          inputProps={{
            maxLength,
            "data-testid": dataTestId,
            autoFocus,
            step,
            autoComplete,
            min,
            max,
            ...props.inputProps,
          }}
          variant="outlined"
          fullWidth
        />
      )}
    />
  );
};

export default ControlledTextField;
