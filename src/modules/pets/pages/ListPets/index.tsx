import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAlert } from "hooks/useAlert";
import { IPetDtoResponse } from "modules/pets/domain/dtos/IPetDtoResponse";
import { IPetUpdateStatusDtoRequest } from "modules/pets/domain/dtos/IPetUpdateStatusDtoRequest";
import { EPetStatus } from "modules/pets/domain/entities/EPetStatus";
import { DeletePetByIdUseCase } from "modules/pets/domain/usecases/DeletePetByIdUseCase";
import { FindPetsByFiltroPaginadoUseCase } from "modules/pets/domain/usecases/FindPetsByFilterPaginadoUseCase";
import { UpdatePetStatusUseCase } from "modules/pets/domain/usecases/UpdatePetStatusUseCase";
import { PetRepositoryImpl } from "modules/pets/infra/PetRepositoryImpl";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IColumn {
  title: string | React.ReactNode;
  columnKey: string;
  render?: (pet: IPetDtoResponse) => React.ReactNode;
}

export function ListPets() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const petRepository = new PetRepositoryImpl();
  const findByFilterPaginatedUseCase = new FindPetsByFiltroPaginadoUseCase(
    petRepository
  );
  const updatePetStatusUseCase = new UpdatePetStatusUseCase(petRepository);
  const deletePetUseCase = new DeletePetByIdUseCase(petRepository);

  const [pets, setPets] = useState<IPetDtoResponse[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(100);

  const columns: IColumn[] = [
    { title: "Name", columnKey: "name" },
    {
      title: "Category",
      columnKey: "category",
      render: (pet) => pet?.category?.name,
    },
    { title: "Age", columnKey: "age" },
    {
      title: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          Status
          <Tooltip title="Click on status to change">
            <HelpOutlineIcon
              fontSize="small"
              color="primary"
              style={{
                cursor: "pointer",
                marginLeft: 5,
              }}
            />
          </Tooltip>
        </Box>
      ),
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
      const response = await findByFilterPaginatedUseCase.execute({
        page: page + 1,
        size: rowsPerPage,
      });

      if (response) {
        setPets(response.content);
        setTotal(response.page.totalElements);
      }
    } catch (error) {
      showAlert("Error fetching Pets", "error");
    }
  };

  useEffect(() => {
    fetchData();
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

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
        pets?.map((pet) =>
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
      showAlert("Pet deleted successfully", "success");
    } catch (error: any) {
      showAlert(error.response.data || "Error deleting pet", "error");
    }
  };

  const handleChangePage = (
    event: any,
    newPage: React.SetStateAction<number>
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Pets for Adoption
      </Typography>
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
              {columns?.map((column) => (
                <TableCell
                  key={column.columnKey}
                  align={column.title === "Actions" ? "center" : "inherit"}
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pets?.map((pet, index) => (
              <TableRow key={index}>
                {columns?.map((column) => (
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
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}
