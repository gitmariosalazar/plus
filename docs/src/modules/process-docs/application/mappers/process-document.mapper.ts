import { ProcessModel } from 'src/modules/process/domain/schemas/model/process.model';
import { CreateProcessDocumentRequest } from '../../domain/schemas/dto/request/create.process-document.request';
import { ProcessDocumentModel } from '../../domain/schemas/model/process-document.model';
import { DocumentsModel } from 'src/modules/documents/domain/schemas/model/documents.model';
import { UpdateProcessDocumentRequest } from '../../domain/schemas/dto/request/update.process-document.request';

export class ProcessDocumentMapper {
  static fromCreateProcessDocumentRequestToModel(
    processDocument: CreateProcessDocumentRequest,
    processModel: ProcessModel,
    documentModel: DocumentsModel,
  ): ProcessDocumentModel {
    const model: ProcessDocumentModel = new ProcessDocumentModel();
    model.setIdProcessDocument(1);
    model.setProcess(processModel);
    model.setDocument(documentModel);
    model.setObservations(processDocument.observations);
    model.setCreatedAt(new Date());
    model.setUpdatedAt(new Date());

    return model;
  }

  static fromUpdateProcessDocumentRequestToModel(
    idProcessDocument: number,
    processDocument: UpdateProcessDocumentRequest,
    processModel: ProcessModel,
    documentModel: DocumentsModel,
  ): ProcessDocumentModel {
    const model: ProcessDocumentModel = new ProcessDocumentModel();
    model.setIdProcessDocument(idProcessDocument);
    model.setProcess(processModel);
    model.setDocument(documentModel);
    model.setObservations(processDocument.observations);
    model.setCreatedAt(new Date());
    model.setUpdatedAt(new Date());

    return model;
  }
}
