import { IPetDtoRequest } from "domain/dtos/IPetDtoRequest";
import { IPetDtoResponse } from "domain/dtos/IPetDtoResponse";
import { IPetFilterPaginatedDtoRequest } from "domain/dtos/IPetFilterPaginatedDtoRequest";
import { IPetUpdateStatusDtoRequest } from "domain/dtos/IPetUpdateStatusDtoRequest";
import { PaginationResponse } from "types/PaginationResponse";

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
