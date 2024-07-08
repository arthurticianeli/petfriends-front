import { IPetDtoResponse } from "domain/dtos/IPetDtoResponse";
import { IPetRepository } from "domain/repositories/IPetRepository";
import { IBaseUseCase } from "types/IBaseUseCase";

export class GetPetById implements IBaseUseCase<number, IPetDtoResponse> {
  constructor(private readonly repository: IPetRepository) {}

  execute(id: number): Promise<IPetDtoResponse> {
    return this.repository.getPetById(id);
  }
}
