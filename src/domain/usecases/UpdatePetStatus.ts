import { IPetUpdateStatusDtoRequest } from "domain/dtos/IPetUpdateStatusDtoRequest";
import { IPetRepository } from "domain/repositories/IPetRepository";
import { IBaseUseCase } from "types/IBaseUseCase";

export class UpdatePetStatus
  implements IBaseUseCase<IPetUpdateStatusDtoRequest, void>
{
  constructor(private readonly repository: IPetRepository) {}

  execute(param: IPetUpdateStatusDtoRequest): Promise<void> {
    return this.repository.updateStatusPet(param);
  }
}
