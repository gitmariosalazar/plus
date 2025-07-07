import { ProcessResponse } from 'src/modules/process/domain/schemas/dto/response/process.response';
import { StatusResponse } from 'src/modules/status/domain/schemas/dto/response/status.response';
import { TypeDocumentsResponse } from 'src/modules/type-documents/domain/schemas/dto/response/type-documents.response';

export interface DocumentsResponse {
  idDocument: number;
  name: string;
  description: string;
  dateRequest: Date;
  dateReception: Date;
  managerName: string;
  documentUrl: string;
  status: StatusResponse;
  typeDocument: TypeDocumentsResponse;
  process: ProcessResponse;
  createdAt?: Date;
  updatedAt?: Date;
}
