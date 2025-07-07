import { DocumentsResponse } from 'src/modules/documents/domain/schemas/dto/response/documents.response';
import { ProcessResponse } from 'src/modules/process/domain/schemas/dto/response/process.response';

export interface ProcessDocumentResponse {
  idProcessDocument: number;
  process: ProcessResponse;
  document: DocumentsResponse;
  observations: string;
  createdAt?: Date;
  updatedAt?: Date;
}
