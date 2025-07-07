import { TypeStatusModel } from 'src/modules/type-status/domain/schemas/model/type-status.model';
import { CreateStatusRequest } from '../../domain/schemas/dto/request/create.status.request';
import { StatusModel } from '../../domain/schemas/model/status.model';
import { UpdateStatusRequest } from '../../domain/schemas/dto/request/update.status.request';
import { StatusResponse } from '../../domain/schemas/dto/response/status.response';

export class StatusMapper {
  static fromCreateStatusRequestToStatusModel(
    request: CreateStatusRequest,
    typeStatus: TypeStatusModel,
  ): StatusModel {
    return new StatusModel(
      0,
      request.name,
      request.description,
      typeStatus,
      new Date(),
      undefined,
    );
  }

  static fromUpdateStatusRequestToStatusModel(
    idStatus: number,
    request: UpdateStatusRequest,
    typeStatus: TypeStatusModel,
  ): StatusModel {
    const statusModel = new StatusModel(
      idStatus,
      request.name,
      request.description,
      typeStatus,
      undefined,
      new Date(),
    );
    return statusModel;
  }

  static fromStatusResponseToStatusModel(
    statusResponse: StatusResponse,
  ): StatusModel {
    return new StatusModel(
      statusResponse.idStatus,
      statusResponse.name,
      statusResponse.description,
      new TypeStatusModel(
        statusResponse.typeStatus.idTypeStatus,
        statusResponse.typeStatus.name,
        statusResponse.typeStatus.description,
      ),
      statusResponse.createdAt,
      statusResponse.updatedAt,
    );
  }
}
