import { CreateProcessDocumentRequest } from '../../domain/schemas/dto/request/create.process-document.request';
import { UpdateProcessDocumentRequest } from '../../domain/schemas/dto/request/update.process-document.request';
import { ProcessDocumentResponse } from '../../domain/schemas/dto/response/process-document.response';

export interface InterfaceProcessDocumentUseCase {
  create(
    processDocument: CreateProcessDocumentRequest,
  ): Promise<ProcessDocumentResponse | null>;
  update(
    idProcessDocument: number,
    processDocument: UpdateProcessDocumentRequest,
  ): Promise<ProcessDocumentResponse | null>;
  findById(idProcessDocument: number): Promise<ProcessDocumentResponse | null>;
  findByProcessId(idProcess: number): Promise<ProcessDocumentResponse[]>;
  findByDocumentId(idDocument: number): Promise<ProcessDocumentResponse[]>;
  findAll(): Promise<ProcessDocumentResponse[]>;
  delete(idProcessDocument: number): Promise<boolean>;
  existsById(idProcessDocument: number): Promise<boolean>;
}
