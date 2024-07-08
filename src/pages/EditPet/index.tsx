import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import { IPetDtoRequest } from "domain/dtos/IPetDtoRequest";
import { EPetStatus } from "domain/entities/EPetStatus";
import { GetPetById } from "domain/usecases/GetPetById";
import { UpdatePetUseCase } from "domain/usecases/UpdatePetUseCase";
import { PetRepositoryImpl } from "infra/PetRepositoryImpl";
import { ControlledCalendar } from "pages/components/ControlledCalendar";
import ControlledSelect from "pages/components/ControlledSelect";
import ControlledTextField from "pages/components/ControlledTextField";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { extractKeyValueFromEnum } from "utils/extractKeyValueFromEnum";
import * as yup from "yup";

const petFormSchema = yup
  .object({
    name: yup.string().required("Field required"),
    description: yup.string().required("Field required"),
    urlImage: yup.string().required("Field required"),
    category: yup.string().required("Field required"),
    birthDate: yup.date().required("Field required"),
    status: yup.string().required("Field required"),
  })
  .required();

const EditPet: React.FC = () => {
  const navigate = useNavigate();
  const { petId } = useParams();
  const petRepository = new PetRepositoryImpl();
  const updatePetUseCase = new UpdatePetUseCase(petRepository);
  const getPetByIdUseCase = new GetPetById(petRepository);

  const [errorMessage, setErrorMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPetDtoRequest>({
    resolver: yupResolver(petFormSchema),
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
      setErrorMessage(error.message || "Error fetching pet");
    }
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = handleSubmit(async (data: IPetDtoRequest) => {
    try {
      await updatePetUseCase.execute(data);
      setShowAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "Error updating pet");
    }
  });

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Edit Pet
      </Typography>
      {errorMessage && (
        <Snackbar
          open={Boolean(errorMessage)}
          autoHideDuration={6000}
          onClose={() => setErrorMessage("")}
        >
          <Alert
            onClose={() => setErrorMessage("")}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
      {showAlert && (
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => navigate("/")}
        >
          <Alert
            onClose={() => navigate("/")}
            severity="success"
            sx={{ width: "100%" }}
          >
            Pet edited!
          </Alert>
        </Snackbar>
      )}
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
            <ControlledTextField
              name="category"
              label="Category"
              control={control}
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
                type="submit"
                variant="outlined"
                color="primary"
                sx={{ mr: 2 }}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
              <Button
                type="button"
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
    </Container>
  );
};

export default EditPet;
