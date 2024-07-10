import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import React, { useCallback, useEffect, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface IControlledAutocompleteProps<FormType extends FieldValues, Response> {
  control: Control<FormType>;
  name: Path<FormType>;
  placeholder?: string;
  label?: React.ReactNode;
  error?: string;
  disabled?: boolean;
  helperMessage?: React.ReactNode;
  usecasePromiseCallback?: () => Promise<Response[]>;
  loading?: boolean;
  onChange?: (value: Response | null) => void;
  onInputChange?: (event: React.ChangeEvent<{}>, value: string) => void;
}

const ControlledAutocomplete = <FormType extends FieldValues, Response>({
  control,
  name,
  placeholder = "Selecione",
  label,
  error,
  disabled,
  helperMessage,
  usecasePromiseCallback,
  onChange,
  onInputChange,
  loading,
}: IControlledAutocompleteProps<FormType, Response>) => {
  const [options, setOptions] = useState<Response[]>([]);

  const fetchData = useCallback(async () => {
    if (!usecasePromiseCallback) return;
    const response: Response[] = await usecasePromiseCallback();
    setOptions(response);
  }, [usecasePromiseCallback]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange: onChangeValues, value },
        fieldState: { error: validationError },
      }) => (
        <Autocomplete
          value={value ?? null}
          onChange={(_, val) => {
            onChangeValues(val);
            onChange?.(val);
          }}
          onInputChange={onInputChange}
          options={options}
          loading={loading}
          disabled={disabled}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              label={label}
              placeholder={placeholder}
              error={!!(error ?? validationError?.message)}
              helperText={error ?? validationError?.message ?? helperMessage}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading && <CircularProgress color="inherit" size={20} />}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          getOptionLabel={(option: any) => option.name}
          isOptionEqualToValue={(option: any, val: any) =>
            option.codigo === val.codigo
          }
        />
      )}
    />
  );
};

export default ControlledAutocomplete;
