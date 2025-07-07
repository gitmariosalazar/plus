import { Priority } from '@prisma/client';
import { PriorityResponse } from 'src/modules/priority/domain/schemas/dto/response/priority.response';

export class PrismaPriorityAdapter {
  static fromPrismaPriorityToResponse(
    prismaPriority: Priority,
  ): PriorityResponse {
    return {
      idPriority: prismaPriority.id_priority,
      name: prismaPriority.name,
      description: prismaPriority.description!,
      createdAt: prismaPriority.created_at,
      updatedAt: prismaPriority.updated_at,
    };
  }
}
