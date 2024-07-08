import { Button, Grid } from "@mui/material";
import { EPetStatus } from "domain/entities/EPetStatus";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { extractKeyValueFromEnum } from "utils/extractKeyValueFromEnum";
import { ControlledCalendar } from "../ControlledCalendar";
import ControlledSelect from "../ControlledSelect";
import ControlledTextField from "../ControlledTextField";

// Definição das props do componente
interface PetFormProps {
  mode: "create" | "edit";
  onSubmit: (data: any) => void;
  initialValues?: any; // Tipagem pode ser ajustada para corresponder aos dados do pet
}

const PetForm: React.FC<PetFormProps> = ({ mode, onSubmit, initialValues }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  // Preencher o formulário com os valores iniciais no modo de edição
  useEffect(() => {
    if (mode === "edit" && initialValues) {
      Object.keys(initialValues).forEach((key) => {
        setValue(key, initialValues[key]);
      });
    }
  }, [mode, initialValues, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {/* Campos do formulário */}
        <Grid item xs={12} sm={6}>
          <ControlledTextField name="name" label="Name" control={control} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ControlledTextField
            name="urlImage"
            label="Url Image"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ControlledTextField
            name="category"
            label="Category"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ControlledCalendar
            name="birthDate"
            label="Birth Date"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ControlledSelect
            name="status"
            label="Status"
            control={control}
            options={extractKeyValueFromEnum(EPetStatus)}
          />
        </Grid>
      </Grid>
      <Button type="submit">{mode === "create" ? "Create" : "Edit"} Pet</Button>
    </form>
  );
};

export default PetForm;
