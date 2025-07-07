import { CreateEntityRequest } from '../../domain/schemas/dto/request/create.entity.request';
import { UpdateEntityRequest } from '../../domain/schemas/dto/request/update.entity.request';
import { EntityResponse } from '../../domain/schemas/dto/response/entity.response';

export interface InterfaceEntityUseCase {
  findById(idEntity: number): Promise<EntityResponse | null>;
  findByRuc(ruc: string): Promise<EntityResponse | null>;
  findAll(): Promise<EntityResponse[]>;
  create(entity: CreateEntityRequest): Promise<EntityResponse>;
  update(
    idEntity: number,
    entity: UpdateEntityRequest,
  ): Promise<EntityResponse>;
  delete(idEntity: number): Promise<boolean>;
  existsById(idEntity: number): Promise<boolean>;
  existsByRuc(ruc: string): Promise<boolean>;
}
