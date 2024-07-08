import { IPetDtoResponse } from "domain/dtos/IPetDtoResponse";
import { IPetFilterPaginatedDtoRequest } from "domain/dtos/IPetFilterPaginatedDtoRequest";
import { IPetRepository } from "domain/repositories/IPetRepository";
import { IBaseUseCase } from "types/IBaseUseCase";
import { PaginationResponse } from "types/PaginationResponse";

export class FindPetsByFiltroPaginado
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
