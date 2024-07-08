export interface IPetDtoRequest {
  id?: number;
  name: string;
  description: string;
  urlImage: string;
  category: string;
  birthDate: Date;
  status: string;
}
