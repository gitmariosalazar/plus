import { ServiceResponse } from '../schemas/dto/response/services.response';
import { ServiceModel } from '../schemas/model/services.model';

export interface InterfaceServiceRepository {
  findAll(): Promise<ServiceResponse[]>;
  findById(idService: number): Promise<ServiceResponse | null>;
  findByName(name: string): Promise<ServiceResponse | null>;
  create(service: ServiceModel): Promise<ServiceResponse>;
  update(
    idService: number,
    service: ServiceModel,
  ): Promise<ServiceResponse | null>;
  delete(idService: number): Promise<boolean>;
  existsById(idService: number): Promise<boolean>;
}
