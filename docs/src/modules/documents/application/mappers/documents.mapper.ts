import { TypeDocumentsModel } from 'src/modules/type-documents/domain/schemas/model/type-documents.model';
import { CreateDocumentRequest } from '../../domain/schemas/dto/request/create.document.request';
import { StatusModel } from 'src/modules/status/domain/schemas/model/status.model';
import { ProcessModel } from 'src/modules/process/domain/schemas/model/process.model';
import { DocumentsModel } from '../../domain/schemas/model/documents.model';
import { DocumentsResponse } from '../../domain/schemas/dto/response/documents.response';
import { TypeStatusModel } from 'src/modules/type-status/domain/schemas/model/type-status.model';
import { EntityModel } from 'src/modules/enterprise/domain/schemas/model/entity.model';

export class DocumentsMapper {
  static fromCreateDocumentRequestToModel(
    createDocumentRequest: CreateDocumentRequest,
    typeDocument: TypeDocumentsModel,
    status: StatusModel,
    process: ProcessModel,
  ): DocumentsModel {
    return new DocumentsModel(
      1,
      typeDocument,
      createDocumentRequest.documentName,
      createDocumentRequest.documentDescription,
      new Date(createDocumentRequest.dateRequest),
      new Date(createDocumentRequest.dateReception),
      createDocumentRequest.managerName,
      process,
      createDocumentRequest.documentUrl,
      status,
      new Date(),
      new Date(),
    );
  }

  static fromUpdateDocumentRequestToModel(
    idDocument: number,
    createDocumentRequest: CreateDocumentRequest,
    typeDocument: TypeDocumentsModel,
    status: StatusModel,
    process: ProcessModel,
  ): DocumentsModel {
    return new DocumentsModel(
      idDocument,
      typeDocument,
      createDocumentRequest.documentName,
      createDocumentRequest.documentDescription,
      new Date(createDocumentRequest.dateRequest),
      new Date(createDocumentRequest.dateReception),
      createDocumentRequest.managerName,
      process,
      createDocumentRequest.documentUrl,
      status,
      new Date(),
      new Date(),
    );
  }

  static fromDocumentsResponseToModel(
    documentsResponse: DocumentsResponse,
  ): DocumentsModel {
    return new DocumentsModel(
      documentsResponse.idDocument,
      new TypeDocumentsModel(
        documentsResponse.typeDocument.idTypeDocument,
        documentsResponse.typeDocument.title,
        documentsResponse.typeDocument.description,
        documentsResponse.typeDocument.createdAt,
        documentsResponse.typeDocument.updatedAt,
      ),
      documentsResponse.name,
      documentsResponse.description,
      documentsResponse.dateRequest,
      documentsResponse.dateReception,
      documentsResponse.managerName,
      new ProcessModel(
        documentsResponse.process.idProcess,
        documentsResponse.process.processNumber,
        documentsResponse.process.value,
        documentsResponse.process.category,
        documentsResponse.process.description,
        documentsResponse.process.timeExecution,
        documentsResponse.process.processObject,
        documentsResponse.process.emailManager,
        documentsResponse.process.fullNameManager,
        documentsResponse.process.phoneManager,
        documentsResponse.process.status.idStatus,
        documentsResponse.process.isActive,
        new EntityModel(
          documentsResponse.process.entity.idEntity,
          documentsResponse.process.entity.ruc,
          documentsResponse.process.entity.name,
          documentsResponse.process.entity.email,
          documentsResponse.process.entity.cellphone,
          documentsResponse.process.entity.telephone,
          documentsResponse.process.entity.address,
          documentsResponse.process.entity.description,
          documentsResponse.process.entity.createdAt!,
          documentsResponse.process.entity.updatedAt,
        ),
        new StatusModel(
          documentsResponse.process.status.idStatus,
          documentsResponse.process.status.name,
          documentsResponse.process.status.description,
          new TypeStatusModel(
            documentsResponse.process.status.typeStatus.idTypeStatus,
            documentsResponse.process.status.typeStatus.name,
            documentsResponse.process.status.typeStatus.description,
            documentsResponse.process.status.typeStatus.createdAt!,
          ),
          documentsResponse.process.status.createdAt!,
          documentsResponse.process.status.updatedAt!,
        ),
        documentsResponse.process.createdAt!,
        documentsResponse.process.updatedAt!,
      ),
      documentsResponse.documentUrl,
      new StatusModel(
        documentsResponse.status.idStatus,
        documentsResponse.status.name,
        documentsResponse.status.description,
        new TypeStatusModel(
          documentsResponse.status.typeStatus.idTypeStatus,
          documentsResponse.status.typeStatus.name,
          documentsResponse.status.typeStatus.description,
          documentsResponse.status.typeStatus.createdAt!,
        ),
        documentsResponse.status.createdAt!,
        documentsResponse.status.updatedAt!,
      ),
      documentsResponse.createdAt,
      documentsResponse.updatedAt,
    );
  }
}
