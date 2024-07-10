import { ICategoryEntity } from "modules/categories/domain/entities/ICategoryEntity";

export interface PetEntity {
  id: number;
  name: string;
  description: string;
  urlImage: string;
  category: ICategoryEntity;
  birthDate: string;
  status: string;
}
