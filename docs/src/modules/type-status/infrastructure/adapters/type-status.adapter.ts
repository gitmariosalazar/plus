import { TypeStatusModel } from '../../domain/schemas/model/type-status.model';

export class TypeStatusAdapter {
  static fromModelToResponse(typeStatusModel: TypeStatusModel): any {
    return {
      idTypeStatus: typeStatusModel.getIdTypeStatus(),
      name: typeStatusModel.getUpdatedAt(),
      description: typeStatusModel.getDescription(),
      createdAt: typeStatusModel.getCreatedAt(),
    };
  }
}
