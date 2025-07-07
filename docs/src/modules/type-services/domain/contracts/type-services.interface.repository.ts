import { TypeServicesResponse } from '../schemas/dto/response/type-services.response';
import { TypeServicesModel } from '../schemas/model/type-services.model';

export interface InterfaceTypeServicesRepository {
  findAll(): Promise<TypeServicesResponse[]>;
  findById(idTypeService: number): Promise<TypeServicesResponse | null>;
  create(typeService: TypeServicesModel): Promise<TypeServicesResponse>;
  update(
    idTypeService: number,
    typeService: TypeServicesModel,
  ): Promise<TypeServicesResponse | null>;
  delete(idTypeService: number): Promise<boolean>;
  findByName(name: string): Promise<TypeServicesResponse | null>;
}
