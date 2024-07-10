import { IBaseUseCase } from "types/IBaseUseCase";
import { PaginationResponse } from "types/PaginationResponse";
import { IPetDtoResponse } from "../dtos/IPetDtoResponse";
import { IPetFilterPaginatedDtoRequest } from "../dtos/IPetFilterPaginatedDtoRequest";
import { IPetRepository } from "../repositories/IPetRepository";

export class FindPetsByFiltroPaginadoUseCase
  implements
    IBaseUseCase<
      IPetFilterPaginatedDtoRequest,
      PaginationResponse<IPetDtoResponse>
    >
{
  constructor(private readonly repository: IPetRepository) {}

  execute(
    filter: IPetFilterPaginatedDtoRequest
  ): Promise<PaginationResponse<IPetDtoResponse>> {
    return this.repository.findByFilterPaginated(filter);
  }
}
