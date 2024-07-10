import { IBaseUseCase } from "types/IBaseUseCase";
import { AccessTokenDto } from "../dtos/AccessTokenDto";
import { CrendentialsRequestDto } from "../dtos/CrendentialsRequestDto";
import { IUserRepository } from "../repositories/IUserRepository";

export class LoginUseCase
  implements IBaseUseCase<CrendentialsRequestDto, AccessTokenDto>
{
  constructor(private readonly repository: IUserRepository) {}

  execute(param: CrendentialsRequestDto): Promise<AccessTokenDto> {
    return this.repository.login(param);
  }
}
