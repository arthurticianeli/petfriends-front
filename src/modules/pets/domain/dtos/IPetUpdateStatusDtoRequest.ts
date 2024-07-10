import { EPetStatus } from "../entities/EPetStatus";

export interface IPetUpdateStatusDtoRequest {
  id: number;
  status: EPetStatus;
}
