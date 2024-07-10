import { PaginationRequest } from "types/PaginationRequest";
import { PaginationResponse } from "types/PaginationResponse";
import { ICategoryDtoRequest } from "../dtos/ICategoryDtoRequest";
import { ICategoryDtoResponse } from "../dtos/ICategoryDtoResponse";

export interface ICategoryRepository {
  createCategory: (param: ICategoryDtoRequest) => Promise<void>;
  deleteCategoryById: (id: number) => Promise<void>;
  findAllCategoriesPaginated: (
    param: PaginationRequest
  ) => Promise<PaginationResponse<ICategoryDtoResponse>>;
  getAllCategories: () => Promise<ICategoryDtoResponse[]>;
}
