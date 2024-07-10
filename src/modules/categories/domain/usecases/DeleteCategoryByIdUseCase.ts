import { IBaseUseCase } from "types/IBaseUseCase";
import { ICategoryRepository } from "../repositories/ICategoryRepository";

export class DeleteCategoryByIdUseCase implements IBaseUseCase<number, void> {
  constructor(private readonly repository: ICategoryRepository) {}

  execute(id: number): Promise<void> {
    return this.repository.deleteCategoryById(id);
  }
}
