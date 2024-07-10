import { AxiosResponse } from "axios";

import { ServiceConfig } from "services/ServiceConfig";
import { PaginationResponse } from "types/PaginationResponse";
import { IPetDtoRequest } from "../domain/dtos/IPetDtoRequest";
import { IPetDtoResponse } from "../domain/dtos/IPetDtoResponse";
import { IPetFilterPaginatedDtoRequest } from "../domain/dtos/IPetFilterPaginatedDtoRequest";
import { IPetUpdateStatusDtoRequest } from "../domain/dtos/IPetUpdateStatusDtoRequest";
import { IPetRepository } from "../domain/repositories/IPetRepository";

const http = new ServiceConfig();
export class PetRepositoryImpl implements IPetRepository {
  async getPetById(id: number): Promise<IPetDtoResponse> {
    const response: AxiosResponse<IPetDtoResponse> = await http.get(
      `/pets/${id}`
    );
    return response.data;
  }

  async createPet(Pet: IPetDtoRequest): Promise<void> {
    await http.post("/pets", Pet);
  }

  async updatePet(pet: IPetDtoRequest): Promise<void> {
    await http.put(`/pets/${pet.id}`, pet);
  }

  async deletePetById(id: number): Promise<void> {
    await http.delete(`/pets/${id}`);
  }

  async findByFilterPaginated(
    params: IPetFilterPaginatedDtoRequest
  ): Promise<PaginationResponse<IPetDtoResponse>> {
    const response: AxiosResponse<PaginationResponse<IPetDtoResponse>> =
      await http.get("/pets/list", {
        params,
      });
    return response.data;
  }

  async updateStatusPet(param: IPetUpdateStatusDtoRequest): Promise<void> {
    const statusUpperCase = param.status.toUpperCase();
    await http.put(`/pets/${param.id}/status?status=${statusUpperCase}`);
  }
}
