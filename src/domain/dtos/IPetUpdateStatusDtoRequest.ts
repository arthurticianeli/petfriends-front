import { EPetStatus } from "domain/entities/EPetStatus";

export interface IPetUpdateStatusDtoRequest {
  id: number;
  status: EPetStatus;
}
