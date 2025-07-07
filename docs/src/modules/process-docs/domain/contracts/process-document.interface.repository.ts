import { ProcessDocumentResponse } from '../schemas/dto/response/process-document.response';
import { ProcessDocumentModel } from '../schemas/model/process-document.model';

export interface InterfaceProcessDocumentRepository {
  create(
    processDocument: ProcessDocumentModel,
  ): Promise<ProcessDocumentResponse | null>;
  update(
    idProcessDocument: number,
    processDocument: ProcessDocumentModel,
  ): Promise<ProcessDocumentResponse | null>;
  findById(idProcessDocument: number): Promise<ProcessDocumentResponse | null>;
  findByProcessId(idProcess: number): Promise<ProcessDocumentResponse[]>;
  findByDocumentId(idDocument: number): Promise<ProcessDocumentResponse[]>;
  findAll(): Promise<ProcessDocumentResponse[]>;
  delete(idProcessDocument: number): Promise<boolean>;
  existsById(idProcessDocument: number): Promise<boolean>;
}
