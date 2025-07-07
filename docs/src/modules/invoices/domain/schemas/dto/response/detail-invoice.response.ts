import { DocumentsResponse } from 'src/modules/documents/domain/schemas/dto/response/documents.response';
import { EntityResponse } from 'src/modules/enterprise/domain/schemas/dto/response/entity.response';
import { ProcessResponse } from 'src/modules/process/domain/schemas/dto/response/process.response';
import { StatusResponse } from 'src/modules/status/domain/schemas/dto/response/status.response';
import { TypePaymentResponse } from 'src/modules/type-payment/domain/schemas/dto/response/type-payment.response';

export interface DetailInvoiceResponse {
  idDetailInvoice: number;
  process: ProcessResponse;
  totalValue: number;
  invoiceNumber: string;
  entity: EntityResponse;
  description: string;
  emissionDate: Date;
  expirationDate: Date;
  emailResponsability: string;
  typePayment: TypePaymentResponse;
  document: DocumentsResponse;
  status: StatusResponse;
  createdAt?: Date;
  updatedAt?: Date;
}
