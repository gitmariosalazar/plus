import { CreateTypeStatusRequest } from '../../domain/schemas/dto/request/create.type-status.request';
import { UpdateTypeStatusRequest } from '../../domain/schemas/dto/request/update.type-status.request';
import { TypeStatusResponse } from '../../domain/schemas/dto/response/type-status.response';

export interface InterfaceTypeStatusUseCases {
  createTypeStatus(
    createTypeStatusRequest: CreateTypeStatusRequest,
  ): Promise<TypeStatusResponse | null>;
  updateTypeStatus(
    idTypeStatus: number,
    updateTypeStatusRequest: UpdateTypeStatusRequest,
  ): Promise<TypeStatusResponse | null>;
  deleteTypeStatus(idTypeStatus: number): Promise<boolean>;
  findTypeStatusById(idTypeStatus: number): Promise<TypeStatusResponse | null>;
  findAllTypeStatus(): Promise<TypeStatusResponse[]>;
  findTypeStatusByName(name: string): Promise<TypeStatusResponse | null>;
}
