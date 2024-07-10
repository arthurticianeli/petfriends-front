import { IBaseUseCase } from "types/IBaseUseCase";
import { PaginationRequest } from "types/PaginationRequest";
import { PaginationResponse } from "types/PaginationResponse";
import { ICategoryDtoResponse } from "../dtos/ICategoryDtoResponse";
import { ICategoryRepository } from "../repositories/ICategoryRepository";

export class FindAllCategoriesPaginatedUseCase
  implements
    IBaseUseCase<PaginationRequest, PaginationResponse<ICategoryDtoResponse>>
{
  constructor(private readonly repository: ICategoryRepository) {}

  execute(
    param: PaginationRequest
  ): Promise<PaginationResponse<ICategoryDtoResponse>> {
    return this.repository.findAllCategoriesPaginated(param);
  }
}
