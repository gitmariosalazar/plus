
import { TypeStatusResponse } from '../schemas/dto/response/type-status.response';
import { TypeStatusModel } from '../schemas/model/type-status.model';

export interface InterfaceTypeStatusRepository {
  createTypeStatus(
    typeStatusModel: TypeStatusModel,
  ): Promise<TypeStatusResponse | null>;
  updateTypeStatus(
    idTypeStatus: number,
    typeStatusModel: TypeStatusModel,
  ): Promise<TypeStatusResponse | null>;
  deleteTypeStatus(idTypeStatus: number): Promise<boolean>;
  findTypeStatusById(idTypeStatus: number): Promise<TypeStatusResponse | null>;
  findAllTypeStatus(): Promise<TypeStatusResponse[]>;
  findTypeStatusByName(name: string): Promise<TypeStatusResponse | null>;
}
