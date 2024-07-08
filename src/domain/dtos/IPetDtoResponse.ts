import { EPetStatus } from "domain/entities/EPetStatus";

export interface IPetDtoResponse {
  id: number;
  name: string;
  description: string;
  urlImage: string;
  category: string;
  birthDate: Date;
  status: EPetStatus;
}
