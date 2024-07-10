import { AxiosResponse } from "axios";
import { ServiceConfig } from "services/ServiceConfig";
import { PaginationRequest } from "types/PaginationRequest";
import { PaginationResponse } from "types/PaginationResponse";
import { ICategoryDtoRequest } from "../domain/dtos/ICategoryDtoRequest";
import { ICategoryDtoResponse } from "../domain/dtos/ICategoryDtoResponse";
import { ICategoryRepository } from "../domain/repositories/ICategoryRepository";

const http = new ServiceConfig();
export class CategoryRepositoryImpl implements ICategoryRepository {
  async createCategory(category: ICategoryDtoRequest): Promise<void> {
    await http.post("/categories", category);
  }

  async deleteCategoryById(id: number): Promise<void> {
    await http.delete(`/categories/${id}`);
  }

  async findAllCategoriesPaginated(
    param: PaginationRequest
  ): Promise<PaginationResponse<ICategoryDtoResponse>> {
    const response: AxiosResponse<PaginationResponse<ICategoryDtoResponse>> =
      await http.get("/categories/list", {
        params: param,
      });
    return response.data;
  }

  async getAllCategories(): Promise<ICategoryDtoResponse[]> {
    const response: AxiosResponse<ICategoryDtoResponse[]> = await http.get(
      "/categories"
    );
    return response.data;
  }
}
