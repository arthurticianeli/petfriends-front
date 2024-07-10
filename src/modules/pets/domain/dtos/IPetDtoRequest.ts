import { ICategoryEntity } from "modules/categories/domain/entities/ICategoryEntity";

export interface IPetDtoRequest {
  id?: number;
  name: string;
  description?: string;
  urlImage?: string;
  category: ICategoryEntity;
  birthDate: Date;
  status: string;
}
