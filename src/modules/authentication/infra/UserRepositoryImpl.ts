import { ServiceConfig } from "services/ServiceConfig";
import { AccessTokenDto } from "../domain/dtos/AccessTokenDto";
import { CrendentialsRequestDto } from "../domain/dtos/CrendentialsRequestDto";
import { UserRequestDto } from "../domain/dtos/UserRequestDto";
import { IUserRepository } from "../domain/repositories/IUserRepository";

const http = new ServiceConfig();
export class UserRepositoryImpl implements IUserRepository {
  async createUser(param: UserRequestDto): Promise<AccessTokenDto> {
    return await http.post("/user", param);
  }

  async login(param: CrendentialsRequestDto): Promise<AccessTokenDto> {
    return await http.post("/user/auth", param);
  }
}
