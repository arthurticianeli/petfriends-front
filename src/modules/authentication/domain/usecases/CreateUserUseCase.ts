import { IBaseUseCase } from "types/IBaseUseCase";
import { AccessTokenDto } from "../dtos/AccessTokenDto";
import { UserRequestDto } from "../dtos/UserRequestDto";
import { IUserRepository } from "../repositories/IUserRepository";

export class CreateUserUseCase
  implements IBaseUseCase<UserRequestDto, AccessTokenDto>
{
  constructor(private readonly repository: IUserRepository) {}

  execute(param: UserRequestDto): Promise<AccessTokenDto> {
    return this.repository.createUser(param);
  }
}
