import { AccessTokenDto } from "../dtos/AccessTokenDto";
import { CrendentialsRequestDto } from "../dtos/CrendentialsRequestDto";
import { UserRequestDto } from "../dtos/UserRequestDto";

export interface IUserRepository {
  createUser: (param: UserRequestDto) => Promise<AccessTokenDto>;
  login: (param: CrendentialsRequestDto) => Promise<AccessTokenDto>;
}
