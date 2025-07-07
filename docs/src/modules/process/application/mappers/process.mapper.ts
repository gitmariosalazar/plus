import { EntityModel } from 'src/modules/enterprise/domain/schemas/model/entity.model';
import { CreateProcessRequest } from '../../domain/schemas/dto/request/create.process.request';
import { ProcessModel } from '../../domain/schemas/model/process.model';
import { StatusModel } from 'src/modules/status/domain/schemas/model/status.model';
import { UpdateProcessRequest } from '../../domain/schemas/dto/request/update.process.request';
import { ProcessResponse } from '../../domain/schemas/dto/response/process.response';
import { TypeStatusModel } from 'src/modules/type-status/domain/schemas/model/type-status.model';

export class ProcessMapper {
  static fromCreateProcessRequestToModel(
    request: CreateProcessRequest,
    entityModel: EntityModel,
    statusModel: StatusModel,
  ): ProcessModel {
    return new ProcessModel(
      0,
      request.processNumber,
      request.value,
      request.category,
      request.description,
      request.timeExecution,
      request.processObject,
      request.emailManager,
      request.fullNameManager,
      request.phoneManager,
      statusModel.getIdStatus(),
      true,
      entityModel,
      statusModel,
      new Date(),
      new Date(),
    );
  }

  static fromUpdateProcessRequestToModel(
    idProcess: number,
    request: UpdateProcessRequest,
    entityModel: EntityModel,
    statusModel: StatusModel,
  ): ProcessModel {
    return new ProcessModel(
      idProcess,
      request.processNumber,
      request.value,
      request.category,
      request.description,
      request.timeExecution,
      request.processObject,
      request.emailManager,
      request.fullNameManager,
      request.phoneManager,
      statusModel.getIdStatus(),
      true,
      entityModel,
      statusModel,
      new Date(),
      new Date(),
    );
  }
  /*
  static fromProcessResponseToModel(process: ProcessResponse): ProcessModel {
    const processModel = new ProcessModel(
      process.idProcess,
      process.processNumber,
      process.value,
      process.category,
      process.description,
      process.timeExecution,
      process.processObject,
      process.emailManager,
      process.fullNameManager,
      process.phoneManager,
      process.statusProcess,
      process.isActive,
      new EntityModel(
        process.entity.idEntity,
        process.entity.ruc,
        process.entity.name,
        process.entity.email,
        process.entity.cellphone,
        process.entity.telephone,
        process.entity.address,
        process.entity.description,
        process.entity.createdAt,
        process.entity.updatedAt,
      ),
      new StatusModel(
        process.status.idStatus,
        process.status.name,
        process.status.description,
        new TypeStatusModel(
          process.status.typeStatus.idTypeStatus,
          process.status.typeStatus.name,
          process.status.typeStatus.description,
          process.status.typeStatus.createdAt,
        ),
      ),
      process.createdAt!,
      process.updatedAt!,
    );
    return processModel;
  }
*/
  static fromProcessResponseToProcessModel(
    processResponse: ProcessResponse,
  ): ProcessModel {
    return new ProcessModel(
      processResponse.idProcess,
      processResponse.processNumber,
      processResponse.value,
      processResponse.category,
      processResponse.description,
      processResponse.timeExecution,
      processResponse.processObject,
      processResponse.emailManager,
      processResponse.fullNameManager,
      processResponse.phoneManager,
      processResponse.statusProcess,
      processResponse.isActive,
      new EntityModel(
        processResponse.entity.idEntity,
        processResponse.entity.ruc,
        processResponse.entity.name,
        processResponse.entity.email,
        processResponse.entity.cellphone,
        processResponse.entity.telephone,
        processResponse.entity.address,
        processResponse.entity.description,
        processResponse.entity.createdAt,
        processResponse.entity.updatedAt,
      ),
      new StatusModel(
        processResponse.status.idStatus,
        processResponse.status.name,
        processResponse.status.description,
        new TypeStatusModel(
          processResponse.status.typeStatus.idTypeStatus,
          processResponse.status.typeStatus.name,
          processResponse.status.typeStatus.description,
          processResponse.status.typeStatus.createdAt!,
        ),
      ),
      processResponse.createdAt!,
      processResponse.updatedAt!,
    );
  }
}
