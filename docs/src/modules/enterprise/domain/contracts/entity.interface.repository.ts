import { EntityResponse } from '../schemas/dto/response/entity.response';
import { EntityModel } from '../schemas/model/entity.model';

export interface InterfaceEntityRepository {
  findById(idEntity: number): Promise<EntityResponse | null>;
  findByRuc(ruc: string): Promise<EntityResponse | null>;
  findAll(): Promise<EntityResponse[]>;
  create(entity: EntityModel): Promise<EntityResponse>;
  update(idEntity: number, entity: EntityModel): Promise<EntityResponse>;
  delete(idEntity: number): Promise<boolean>;
  existsById(idEntity: number): Promise<boolean>;
  existsByRuc(ruc: string): Promise<boolean>;
}
