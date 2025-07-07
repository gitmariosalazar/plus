import { TypeServicesResponse } from 'src/modules/type-services/domain/schemas/dto/response/type-services.response';

export interface ServiceResponse {
  idService: number;
  name: string;
  description: string;
  typeService: TypeServicesResponse;
  createdAt?: Date;
  updatedAt?: Date;
}
