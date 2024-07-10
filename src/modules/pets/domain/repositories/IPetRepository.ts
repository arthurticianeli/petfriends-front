import { PaginationResponse } from "types/PaginationResponse";
import { IPetDtoRequest } from "../dtos/IPetDtoRequest";
import { IPetDtoResponse } from "../dtos/IPetDtoResponse";
import { IPetFilterPaginatedDtoRequest } from "../dtos/IPetFilterPaginatedDtoRequest";
import { IPetUpdateStatusDtoRequest } from "../dtos/IPetUpdateStatusDtoRequest";

export interface IPetRepository {
  findByFilterPaginated: (
    filter: IPetFilterPaginatedDtoRequest
  ) => Promise<PaginationResponse<IPetDtoResponse>>;
  getPetById: (id: number) => Promise<IPetDtoResponse>;
  createPet: (param: IPetDtoRequest) => Promise<void>;
  updatePet: (param: IPetDtoRequest) => Promise<void>;
  deletePetById: (id: number) => Promise<void>;
  updateStatusPet: (param: IPetUpdateStatusDtoRequest) => Promise<void>;
}
