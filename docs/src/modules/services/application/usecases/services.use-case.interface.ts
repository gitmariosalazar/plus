import { CreateServiceRequest } from '../../domain/schemas/dto/request/create.services.request';
import { UpdateServiceRequest } from '../../domain/schemas/dto/request/update.services.request';
import { ServiceResponse } from '../../domain/schemas/dto/response/services.response';

export interface InterfaceServicesUseCase {
  findAll(): Promise<ServiceResponse[]>;
  findById(idService: number): Promise<ServiceResponse | null>;
  findByName(name: string): Promise<ServiceResponse | null>;
  create(service: CreateServiceRequest): Promise<ServiceResponse>;
  update(
    idService: number,
    service: UpdateServiceRequest,
  ): Promise<ServiceResponse | null>;
  delete(idService: number): Promise<boolean>;
  existsById(idService: number): Promise<boolean>;
}
