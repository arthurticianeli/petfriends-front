import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  Box,
  Button,
  Container,
  Pagination,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { IPetDtoResponse } from "domain/dtos/IPetDtoResponse";
import { IPetFilterPaginatedDtoRequest } from "domain/dtos/IPetFilterPaginatedDtoRequest";
import { IPetUpdateStatusDtoRequest } from "domain/dtos/IPetUpdateStatusDtoRequest";
import { EPetStatus } from "domain/entities/EPetStatus";
import { DeletePetById } from "domain/usecases/DeletePetById";
import { FindPetsByFiltroPaginado } from "domain/usecases/FindPetsByFilterPaginado";
import { UpdatePetStatus } from "domain/usecases/UpdatePetStatus";
import { PetRepositoryImpl } from "infra/PetRepositoryImpl";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IColumn {
  title: string;
  columnKey: string;
  render?: (pet: IPetDtoResponse) => React.ReactNode;
}

export function ListPets() {
  const navigate = useNavigate();
  const petRepository = new PetRepositoryImpl();
  const findByFilterPaginatedUseCase = new FindPetsByFiltroPaginado(
    petRepository
  );
  const updatePetStatusUseCase = new UpdatePetStatus(petRepository);
  const deletePetUseCase = new DeletePetById(petRepository);

  const [filter, setFilter] = useState<IPetFilterPaginatedDtoRequest>();
  const [pets, setPets] = useState<IPetDtoResponse[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const columns: IColumn[] = [
    { title: "Name", columnKey: "name" },
    { title: "Category", columnKey: "category" },
    { title: "Age", columnKey: "age" },
    {
      title: "Status / Change Status",
      columnKey: "status",
      render: (pet: IPetDtoResponse) => (
        <Button
          variant="outlined"
          color={pet.status === EPetStatus.AVAILABLE ? "primary" : "success"}
          onClick={() => handleUpdatePetStatus(pet.id, pet.status)}
        >
          {pet.status}
        </Button>
      ),
    },
    {
      title: "Actions",
      columnKey: "actions",
      render: (pet: IPetDtoResponse) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => {
              navigate(`/pets/${pet.id}`);
            }}
          >
            <EditIcon />
          </Button>
          <Button
            color="error"
            onClick={() => {
              handleDeletePet(pet.id);
            }}
          >
            <DeleteForeverIcon />
          </Button>
        </Box>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await findByFilterPaginatedUseCase.execute(
        filter ?? {
          page: 1,
          pageSize: 10,
        }
      );

      if (response) {
        setPets(response.content);
        setTotalPages(response.page.totalPages);
      }
    } catch (error) {
      setErrorMessage("Error fetching pets");
    }
  };

  useEffect(() => {
    fetchData();
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdatePetStatus = async (
    petId: number,
    currentStatus: EPetStatus
  ) => {
    const newStatus =
      currentStatus === EPetStatus.AVAILABLE
        ? EPetStatus.ADOPTED
        : EPetStatus.AVAILABLE;

    const updateStatusDto: IPetUpdateStatusDtoRequest = {
      id: petId,
      status: newStatus,
    };

    try {
      await updatePetStatusUseCase.execute(updateStatusDto);
      setPets(
        pets.map((pet) =>
          pet.id === petId ? { ...pet, status: newStatus } : pet
        )
      );
    } catch (error) {
      console.error("Error updating pet", error);
    }
  };

  const handleDeletePet = async (petId: number) => {
    try {
      await deletePetUseCase.execute(petId);

      setPets(pets.filter((pet) => pet.id !== petId));
      setShowAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || "Error deleting pet");
    }
  };

  const changePagination = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setFilter((prev: any) => ({ ...prev, page }));
    fetchData();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Pets for Adoption
      </Typography>
      {errorMessage && (
        <Snackbar
          open={!!errorMessage}
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
        <Snackbar open={showAlert} autoHideDuration={6000}>
          <Alert
            onClose={() => setShowAlert(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Pet deleted!
          </Alert>
        </Snackbar>
      )}
      <Button
        variant="contained"
        onClick={() => navigate("/pets/new")}
        sx={{ mb: 2 }}
      >
        Add Pet
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.title}
                  align={column.title === "Actions" ? "center" : "inherit"}
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pets.map((pet, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.columnKey}>
                    {column.render
                      ? column.render(pet)
                      : String(pet[column.columnKey as keyof IPetDtoResponse])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        page={filter?.page ?? 1}
        onChange={changePagination}
        sx={{ mt: 2 }}
      />
    </Container>
  );
}
