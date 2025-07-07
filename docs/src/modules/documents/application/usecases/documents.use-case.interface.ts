import { CreateDocumentRequest } from '../../domain/schemas/dto/request/create.document.request';
import { UpdateDocumentRequest } from '../../domain/schemas/dto/request/update.document.request';
import { DocumentsResponse } from '../../domain/schemas/dto/response/documents.response';

export interface InterfaceDocumentsUseCase {
  create(document: CreateDocumentRequest): Promise<DocumentsResponse | null>;
  update(
    idDocument: number,
    document: UpdateDocumentRequest,
  ): Promise<DocumentsResponse | null>;
  findById(idDocument: number): Promise<DocumentsResponse | null>;
  findAll(): Promise<DocumentsResponse[]>;
  findByProcessId(idProcess: number): Promise<DocumentsResponse[]>;
  delete(idDocument: number): Promise<boolean>;
  existsById(idDocument: number): Promise<boolean>;
  findByTypeDocumentId(idTypeDocument: number): Promise<DocumentsResponse[]>;
  findByStatusId(idStatus: number): Promise<DocumentsResponse[]>;
}
