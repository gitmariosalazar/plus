import { CreateTypeServicesRequest } from '../../domain/schemas/dto/request/create.type-services.request';
import { UpdateTypeServicesRequest } from '../../domain/schemas/dto/request/update.type-services.request';
import { TypeServicesResponse } from '../../domain/schemas/dto/response/type-services.response';

export interface InterfaceTypeServicesUseCase {
  findAll(): Promise<TypeServicesResponse[]>;
  findById(idTypeService: number): Promise<TypeServicesResponse | null>;
  create(typeService: CreateTypeServicesRequest): Promise<TypeServicesResponse>;
  update(
    idTypeService: number,
    typeService: UpdateTypeServicesRequest,
  ): Promise<TypeServicesResponse | null>;
  delete(idTypeService: number): Promise<boolean>;
  findByName(name: string): Promise<TypeServicesResponse | null>;
}
