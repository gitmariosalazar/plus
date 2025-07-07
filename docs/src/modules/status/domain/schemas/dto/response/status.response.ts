import { TypeStatusResponse } from 'src/modules/type-status/domain/schemas/dto/response/type-status.response';

export interface StatusResponse {
  idStatus: number;
  name: string;
  description: string;
  typeStatus: TypeStatusResponse;
  createdAt?: Date;
  updatedAt?: Date;
}
