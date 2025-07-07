import { CreatePriorityRequest } from '../../domain/schemas/dto/request/create.priority.request';
import { UpdatePriorityRequest } from '../../domain/schemas/dto/request/update.priority.request';
import { PriorityResponse } from '../../domain/schemas/dto/response/priority.response';
import { PriorityModel } from '../../domain/schemas/model/priority.model';

export class PriorityMapper {
  static fromCreatePriorityRequestToPrioriryModel(
    priority: CreatePriorityRequest,
  ): PriorityModel {
    return new PriorityModel(
      0,
      priority.name,
      priority.description,
      new Date(),
      new Date(),
    );
  }

  static fromUpdatePriorityRequestToPriorityModel(
    idPriority: number,
    priority: UpdatePriorityRequest,
  ): PriorityModel {
    return new PriorityModel(
      idPriority,
      priority.name,
      priority.description,
      undefined,
      new Date(),
    );
  }

  static fromPriorityResponseToPriorityModel(
    priorityResponse: PriorityResponse,
  ): PriorityModel {
    return new PriorityModel(
      priorityResponse.idPriority,
      priorityResponse.name,
      priorityResponse.description,
      priorityResponse.createdAt || new Date(),
      priorityResponse.updatedAt || new Date(),
    );
  }
}
