import { PriorityResponse } from '../schemas/dto/response/priority.response';
import { PriorityModel } from '../schemas/model/priority.model';

export interface InterfacePriorityRepository {
  findAll(): Promise<PriorityResponse[]>;
  findById(idPriority: number): Promise<PriorityResponse | null>;
  findByName(name: string): Promise<PriorityResponse | null>;
  create(priority: PriorityModel): Promise<PriorityResponse | null>;
  update(
    idPriority: number,
    priority: PriorityModel,
  ): Promise<PriorityResponse | null>;
  delete(idPriority: number): Promise<boolean>;
  existsById(idPriority: number): Promise<boolean>;
  existsByName(name: string): Promise<boolean>;
}
