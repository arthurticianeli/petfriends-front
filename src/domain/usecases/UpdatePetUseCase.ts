import { IPetDtoRequest } from "domain/dtos/IPetDtoRequest";
import { IPetRepository } from "domain/repositories/IPetRepository";
import { IBaseUseCase } from "types/IBaseUseCase";

export class UpdatePetUseCase implements IBaseUseCase<IPetDtoRequest, void> {
  constructor(private readonly repository: IPetRepository) {}

  execute(param: IPetDtoRequest): Promise<void> {
    return this.repository.updatePet(param);
  }
}
