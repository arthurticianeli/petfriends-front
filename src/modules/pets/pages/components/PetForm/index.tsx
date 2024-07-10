import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid } from "@mui/material";

import { IPetDtoRequest } from "modules/pets/domain/dtos/IPetDtoRequest";
import { EPetStatus } from "modules/pets/domain/entities/EPetStatus";
import { CreatePetUseCase } from "modules/pets/domain/usecases/CreatePetUseCase";
import { GetPetByIdUseCase } from "modules/pets/domain/usecases/GetPetByIdUseCase";
import { UpdatePetUseCase } from "modules/pets/domain/usecases/UpdatePetUseCase";

import ControlledAutocomplete from "common/components/ControlledAutocomplete";
import { useAlert } from "hooks/useAlert";
import { ICategoryDtoResponse } from "modules/categories/domain/dtos/ICategoryDtoResponse";
import { GetAllCategoriesUseCase } from "modules/categories/domain/usecases/GetAllCategoriesUseCase";
import { CategoryRepositoryImpl } from "modules/categories/infra/CategoryRepositoryImpl";
import { PetRepositoryImpl } from "modules/pets/infra/PetRepositoryImpl";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { extractKeyValueFromEnum } from "utils/extractKeyValueFromEnum";
import { ControlledCalendar } from "../../../../../common/components/ControlledCalendar";
import ControlledSelect from "../../../../../common/components/ControlledSelect";
import ControlledTextField from "../../../../../common/components/ControlledTextField";
import { petFormSchema } from "../../Validators";

const PetForm: React.FC = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const petRepository = new PetRepositoryImpl();
  const categoryRepository = new CategoryRepositoryImpl();
  const createPetUseCase = new CreatePetUseCase(petRepository);
  const updatePetUseCase = new UpdatePetUseCase(petRepository);
  const getPetByIdUseCase = new GetPetByIdUseCase(petRepository);
  const getAllCategoriesUseCase = new GetAllCategoriesUseCase(
    categoryRepository
  );

  const { petId } = useParams();

  const { control, handleSubmit, reset } = useForm<IPetDtoRequest>({
    resolver: yupResolver(petFormSchema),
  });

  const handleSave = handleSubmit(async (values: IPetDtoRequest) => {
    if (petId) {
      try {
        await updatePetUseCase.execute(values);
        showAlert("Pet updated successfully", "success");
        navigate("/");
      } catch (error: any) {
        showAlert(error.message || "Error updating pet", "error");
      }
    } else {
      try {
        await createPetUseCase.execute(values);
        showAlert("Pet created successfully", "success");
        navigate("/");
      } catch (error: any) {
        showAlert(error.message || "Error creating pet", "error");
      }
    }
  });

  const fetchData = async () => {
    try {
      const response = await getPetByIdUseCase.execute(Number(petId));

      response &&
        reset({
          id: response.id,
          name: response.name,
          description: response.description,
          urlImage: response.urlImage,
          category: response.category,
          birthDate: response.birthDate,
          status: response.status,
        });
    } catch (error: any) {
      showAlert(error.message || "Error fetching pet", "error");
    }
  };

  React.useEffect(() => {
    petId && fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <form onSubmit={handleSave}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <ControlledTextField name="name" label="Name" control={control} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ControlledTextField
              name="description"
              label="Description"
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ControlledTextField
              name="urlImage"
              label="Url Image"
              control={control}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ControlledAutocomplete<IPetDtoRequest, ICategoryDtoResponse>
              control={control}
              name={"category"}
              label="Category"
              usecasePromiseCallback={() => getAllCategoriesUseCase.execute()}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ControlledCalendar
              control={control}
              name="birthDate"
              label="Birth Date"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ControlledSelect
              control={control}
              name={"status"}
              label="Status"
              options={extractKeyValueFromEnum(EPetStatus)}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mr: 2 }}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSave}
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default PetForm;
