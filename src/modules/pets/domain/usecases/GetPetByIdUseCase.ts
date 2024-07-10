import { IBaseUseCase } from "types/IBaseUseCase";
import { IPetDtoResponse } from "../dtos/IPetDtoResponse";
import { IPetRepository } from "../repositories/IPetRepository";

export class GetPetByIdUseCase
  implements IBaseUseCase<number, IPetDtoResponse>
{
  constructor(private readonly repository: IPetRepository) {}

  execute(id: number): Promise<IPetDtoResponse> {
    return this.repository.getPetById(id);
  }
}
