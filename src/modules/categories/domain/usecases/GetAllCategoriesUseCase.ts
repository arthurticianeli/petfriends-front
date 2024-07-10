import { IBaseUseCase } from "types/IBaseUseCase";
import { ICategoryDtoResponse } from "../dtos/ICategoryDtoResponse";
import { ICategoryRepository } from "../repositories/ICategoryRepository";

export class GetAllCategoriesUseCase
  implements IBaseUseCase<void, ICategoryDtoResponse[]>
{
  constructor(private readonly repository: ICategoryRepository) {}

  execute(): Promise<ICategoryDtoResponse[]> {
    return this.repository.getAllCategories();
  }
}
