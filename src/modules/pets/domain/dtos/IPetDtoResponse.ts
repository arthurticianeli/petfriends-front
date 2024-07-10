import { ICategoryEntity } from "modules/categories/domain/entities/ICategoryEntity";
import { EPetStatus } from "../entities/EPetStatus";

export interface IPetDtoResponse {
  id: number;
  name: string;
  description: string;
  urlImage: string;
  category: ICategoryEntity;
  birthDate: Date;
  status: EPetStatus;
}
