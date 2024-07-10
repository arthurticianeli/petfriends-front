import { ICategoryEntity } from "modules/categories/domain/entities/ICategoryEntity";
import { PaginationRequest } from "types/PaginationRequest";

export interface IPetFilterPaginatedDtoRequest extends PaginationRequest {
  name?: string;
  category?: ICategoryEntity;
  status?: string;
}
