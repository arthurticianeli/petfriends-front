import { IBaseUseCase } from "types/IBaseUseCase";
import { IPetUpdateStatusDtoRequest } from "../dtos/IPetUpdateStatusDtoRequest";
import { IPetRepository } from "../repositories/IPetRepository";

export class UpdatePetStatusUseCase
  implements IBaseUseCase<IPetUpdateStatusDtoRequest, void>
{
  constructor(private readonly repository: IPetRepository) {}

  execute(param: IPetUpdateStatusDtoRequest): Promise<void> {
    return this.repository.updateStatusPet(param);
  }
}
