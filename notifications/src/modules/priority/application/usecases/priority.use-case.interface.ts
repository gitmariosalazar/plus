import { CreatePriorityRequest } from '../../domain/schemas/dto/request/create.priority.request';
import { UpdatePriorityRequest } from '../../domain/schemas/dto/request/update.priority.request';
import { PriorityResponse } from '../../domain/schemas/dto/response/priority.response';

export interface InterfacePriorityUseCase {
  findAll(): Promise<PriorityResponse[]>;

  findById(idPriority: number): Promise<PriorityResponse | null>;

  findByName(name: string): Promise<PriorityResponse | null>;

  create(priority: CreatePriorityRequest): Promise<PriorityResponse | null>;

  update(
    idPriority: number,
    priority: UpdatePriorityRequest,
  ): Promise<PriorityResponse | null>;

  delete(idPriority: number): Promise<boolean>;

  existsById(idPriority: number): Promise<boolean>;

  existsByName(name: string): Promise<boolean>;
}
