import { IBaseUseCase } from "types/IBaseUseCase";
import { ICategoryDtoRequest } from "../dtos/ICategoryDtoRequest";
import { ICategoryRepository } from "../repositories/ICategoryRepository";

export class CreateCategoryUseCase
  implements IBaseUseCase<ICategoryDtoRequest, void>
{
  constructor(private readonly repository: ICategoryRepository) {}

  execute(param: ICategoryDtoRequest): Promise<void> {
    return this.repository.createCategory(param);
  }
}
