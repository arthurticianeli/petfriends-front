import { yupResolver } from "@hookform/resolvers/yup";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { ICategoryDtoRequest } from "modules/categories/domain/dtos/ICategoryDtoRequest";
import { ICategoryDtoResponse } from "modules/categories/domain/dtos/ICategoryDtoResponse";
import { CreateCategoryUseCase } from "modules/categories/domain/usecases/CreateCategoryUseCase";
import { DeleteCategoryByIdUseCase } from "modules/categories/domain/usecases/DeleteCategoryByIdUseCase";
import { FindAllCategoriesPaginatedUseCase } from "modules/categories/domain/usecases/FindAllCategoriesPaginatedUseCase";

import ControlledTextField from "common/components/ControlledTextField";
import { useAlert } from "hooks/useAlert";
import { CategoryRepositoryImpl } from "modules/categories/infra/CategoryRepositoryImpl";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { categoryFormSchema } from "../Validators";

interface IColumn {
  title: string | React.ReactNode;
  columnKey: string;
  render?: (category: ICategoryDtoResponse) => React.ReactNode;
}

export function ListCategories() {
  const { showAlert } = useAlert();
  const categoryRepository = new CategoryRepositoryImpl();
  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);

  const findByFilterPaginatedUseCase = new FindAllCategoriesPaginatedUseCase(
    categoryRepository
  );
  const deleteCategoryUseCase = new DeleteCategoryByIdUseCase(
    categoryRepository
  );

  const [categories, setCategories] = useState<ICategoryDtoResponse[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(100);

  const { control, handleSubmit, reset } = useForm<ICategoryDtoRequest>({
    resolver: yupResolver(categoryFormSchema),
  });

  const columns: IColumn[] = [
    { title: "Name", columnKey: "name" },
    {
      title: "Actions",
      columnKey: "actions",
      render: (category: ICategoryDtoResponse) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            color="error"
            onClick={() => {
              handleDeleteCategory(category.id);
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
        setCategories(response.content);

        setTotal(response.page.totalElements);
      }
    } catch (error) {
      showAlert("Error fetching Categories", "error");
    }
  };

  useEffect(() => {
    fetchData();
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  const handleSave = handleSubmit(async (values: ICategoryDtoRequest) => {
    try {
      await createCategoryUseCase.execute(values);
      showAlert("Category created successfully", "success");
      reset();
      fetchData();
    } catch (error: any) {
      showAlert(error.response.data || "Erro ao criar categoria", "error");
    }
  });

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      await deleteCategoryUseCase.execute(categoryId);
      fetchData();
      showAlert("Category deleted successfully", "success");
    } catch (error: any) {
      showAlert(error.response.data || "Error deleting category", "error");
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
        Categories List
      </Typography>
      <Box>
        <form onSubmit={handleSave}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <ControlledTextField
                name="name"
                label="Category Name"
                control={control}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Box sx={{ mt: 3 }}>
                <Button type="submit" variant="contained" color="primary">
                  Add
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
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
              {categories.map((category, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.columnKey}>
                      {column.render
                        ? column.render(category)
                        : String(
                            category[
                              column.columnKey as keyof ICategoryDtoResponse
                            ]
                          )}
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
      </Box>
    </Container>
  );
}
