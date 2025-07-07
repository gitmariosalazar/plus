import { ProcessModel } from 'src/modules/process/domain/schemas/model/process.model';
import { CreateProcessReviewRequest } from '../../domain/schemas/dto/request/create.process-review.request';
import { ProcessReviewModel } from '../../domain/schemas/model/process-review.model';
import { UpdateProcessReviewRequest } from '../../domain/schemas/dto/request/update.process-review.request';
import { ProcessReviewResponse } from '../../domain/schemas/dto/response/process-review.response';
import { EntityModel } from 'src/modules/enterprise/domain/schemas/model/entity.model';
import { StatusModel } from 'src/modules/status/domain/schemas/model/status.model';
import { TypeStatusModel } from 'src/modules/type-status/domain/schemas/model/type-status.model';

export class ProcessReviewMapper {
  static fromCreateProcessReviewRequestToModel(
    processReviewRequest: CreateProcessReviewRequest,
    processModel: ProcessModel,
  ): ProcessReviewModel {
    return new ProcessReviewModel(
      0,
      processModel,
      processReviewRequest.isActive,
      processReviewRequest.isSelected,
      new Date(),
      new Date(),
    );
  }

  static fromUpdateProcessReviewRequestToModel(
    idProcessReview: number,
    processReviewRequest: UpdateProcessReviewRequest,
    processModel: ProcessModel,
  ): ProcessReviewModel {
    return new ProcessReviewModel(
      idProcessReview,
      processModel,
      processReviewRequest.isActive,
      processReviewRequest.isSelected,
      undefined,
      new Date(),
    );
  }

  static fromProcessReviewResponseToModel(
    processReviewResponse: ProcessReviewResponse,
  ): ProcessReviewModel {
    return new ProcessReviewModel(
      processReviewResponse.idProcessReview,
      new ProcessModel(
        processReviewResponse.process.idProcess,
        processReviewResponse.process.processNumber,
        processReviewResponse.process.value,
        processReviewResponse.process.category,
        processReviewResponse.process.description,
        processReviewResponse.process.timeExecution,
        processReviewResponse.process.processObject,
        processReviewResponse.process.emailManager,
        processReviewResponse.process.fullNameManager,
        processReviewResponse.process.phoneManager,
        processReviewResponse.process.status.idStatus,
        processReviewResponse.process.isActive,
        new EntityModel(
          processReviewResponse.process.entity.idEntity,
          processReviewResponse.process.entity.ruc,
          processReviewResponse.process.entity.name,
          processReviewResponse.process.entity.email,
          processReviewResponse.process.entity.cellphone,
          processReviewResponse.process.entity.telephone,
          processReviewResponse.process.entity.address,
          processReviewResponse.process.entity.description,
          processReviewResponse.process.entity.createdAt!,
          processReviewResponse.process.entity.updatedAt,
        ),
        new StatusModel(
          processReviewResponse.process.status.idStatus,
          processReviewResponse.process.status.name,
          processReviewResponse.process.status.description,
          new TypeStatusModel(
            processReviewResponse.process.status.typeStatus.idTypeStatus,
            processReviewResponse.process.status.typeStatus.name,
            processReviewResponse.process.status.typeStatus.description,
            processReviewResponse.process.status.typeStatus.createdAt,
          ),
          processReviewResponse.process.status.createdAt,
          processReviewResponse.process.status.updatedAt,
        ),
        processReviewResponse.process.createdAt!,
        processReviewResponse.process.updatedAt!,
      ),
      processReviewResponse.isActive,
      processReviewResponse.isSelected,
      processReviewResponse.createdAt,
      processReviewResponse.updatedAt,
    );
  }
}
