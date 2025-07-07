import { CreateTypeStatusRequest } from '../../domain/schemas/dto/request/create.type-status.request';
import { UpdateTypeStatusRequest } from '../../domain/schemas/dto/request/update.type-status.request';
import { TypeStatusResponse } from '../../domain/schemas/dto/response/type-status.response';
import { TypeStatusModel } from '../../domain/schemas/model/type-status.model';

export class TypeStatusMapper {
  static fromCreateTypeStatusRequestToModel(
    createTypeStatusRequest: CreateTypeStatusRequest,
  ): TypeStatusModel {
    return new TypeStatusModel(
      1,
      createTypeStatusRequest.name,
      createTypeStatusRequest.description,
    );
  }

  static fromUpdateTypeStatusRequestToModel(
    createTypeStatusRequest: UpdateTypeStatusRequest,
  ): TypeStatusModel {
    return new TypeStatusModel(
      1,
      createTypeStatusRequest.name,
      createTypeStatusRequest.description,
    );
  }

  static fromTypeStatusResponseToModel(
    typeStatus: TypeStatusResponse,
  ): TypeStatusModel {
    return new TypeStatusModel(
      typeStatus.idTypeStatus,
      typeStatus.name,
      typeStatus.description,
    );
  }
}
