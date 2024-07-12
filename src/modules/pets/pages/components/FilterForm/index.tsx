import { Button, Grid } from "@mui/material";
import ControlledAutocomplete from "common/components/ControlledAutocomplete";
import ControlledSelect from "common/components/ControlledSelect";
import ControlledTextField from "common/components/ControlledTextField";
import { ICategoryDtoResponse } from "modules/categories/domain/dtos/ICategoryDtoResponse";
import { GetAllCategoriesUseCase } from "modules/categories/domain/usecases/GetAllCategoriesUseCase";
import { IPetFilterPaginatedDtoRequest } from "modules/pets/domain/dtos/IPetFilterPaginatedDtoRequest";
import { EPetStatus } from "modules/pets/domain/entities/EPetStatus";
import React from "react";
import { Control } from "react-hook-form";
import { extractKeyValueFromEnum } from "utils/extractKeyValueFromEnum";

interface IFilterProps {
  control: Control<IPetFilterPaginatedDtoRequest>;
  onSubmit: (data: IPetFilterPaginatedDtoRequest) => void;
  getAllCategoriesUseCase: GetAllCategoriesUseCase;
  handleSubmit: any;
}

const FilterComponent: React.FC<IFilterProps> = ({
  control,
  onSubmit,
  getAllCategoriesUseCase,
  handleSubmit,
}) => {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={12} sm={3}>
        <ControlledTextField label="Name" name="name" control={control} />
      </Grid>
      <Grid item xs={12} sm={3}>
        <ControlledSelect
          control={control}
          name={"status"}
          label="Status"
          options={extractKeyValueFromEnum(EPetStatus)}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <ControlledAutocomplete<
          IPetFilterPaginatedDtoRequest,
          ICategoryDtoResponse
        >
          control={control}
          name={"category"}
          label="Category"
          usecasePromiseCallback={() => getAllCategoriesUseCase.execute()}
        />
      </Grid>
      <Grid container item xs={12} sm={3} mt={3}>
        <Grid item>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Filter
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FilterComponent;
