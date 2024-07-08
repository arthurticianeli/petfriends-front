import { IPetRepository } from "domain/repositories/IPetRepository";
import { IBaseUseCase } from "types/IBaseUseCase";

export class DeletePetById implements IBaseUseCase<number, void> {
  constructor(private readonly repository: IPetRepository) {}

  execute(id: number): Promise<void> {
    return this.repository.deletePetById(id);
  }
}
