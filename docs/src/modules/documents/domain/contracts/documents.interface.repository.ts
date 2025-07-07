import { DocumentsResponse } from '../schemas/dto/response/documents.response';
import { DocumentsModel } from '../schemas/model/documents.model';

export interface InterfaceDocumentsRepository {
  create(document: DocumentsModel): Promise<DocumentsResponse | null>;
  update(
    idDocument: number,
    document: DocumentsModel,
  ): Promise<DocumentsResponse | null>;
  findById(idDocument: number): Promise<DocumentsResponse | null>;
  findAll(): Promise<DocumentsResponse[]>;
  findByProcessId(idProcess: number): Promise<DocumentsResponse[]>;
  delete(idDocument: number): Promise<boolean>;
  existsById(idDocument: number): Promise<boolean>;
  findByTypeDocumentId(idTypeDocument: number): Promise<DocumentsResponse[]>;
  findByStatusId(idStatus: number): Promise<DocumentsResponse[]>;
}
