import { IBaseUseCase } from "types/IBaseUseCase";
import { IPetRepository } from "../repositories/IPetRepository";

export class DeletePetByIdUseCase implements IBaseUseCase<number, void> {
  constructor(private readonly repository: IPetRepository) {}

  execute(id: number): Promise<void> {
    return this.repository.deletePetById(id);
  }
}
