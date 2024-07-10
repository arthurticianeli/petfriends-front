import { IBaseUseCase } from "types/IBaseUseCase";
import { IPetDtoRequest } from "../dtos/IPetDtoRequest";
import { IPetRepository } from "../repositories/IPetRepository";

export class CreatePetUseCase implements IBaseUseCase<IPetDtoRequest, void> {
  constructor(private readonly repository: IPetRepository) {}

  execute(param: IPetDtoRequest): Promise<void> {
    return this.repository.createPet(param);
  }
}
