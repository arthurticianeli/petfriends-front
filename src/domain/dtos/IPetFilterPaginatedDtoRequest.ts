export interface IPetFilterPaginatedDtoRequest {
  name?: string;
  category?: string;
  status?: string;
  page: number;
  pageSize: number;
}
