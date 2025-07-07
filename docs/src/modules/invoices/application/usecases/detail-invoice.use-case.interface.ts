import { CreateDetailInvoiceRequest } from '../../domain/schemas/dto/request/create.detail-invoice.request';
import { UpdateDetailInvoiceRequest } from '../../domain/schemas/dto/request/update.detail-invoice.request';
import { DetailInvoiceResponse } from '../../domain/schemas/dto/response/detail-invoice.response';

export interface InterfaceDetailInvoiceUseCase {
  create(
    detailInvoice: CreateDetailInvoiceRequest,
  ): Promise<DetailInvoiceResponse | null>;
  update(
    idDetailInvoice: number,
    detailInvoice: UpdateDetailInvoiceRequest,
  ): Promise<DetailInvoiceResponse | null>;
  findById(idDetailInvoice: number): Promise<DetailInvoiceResponse | null>;
  findAll(): Promise<DetailInvoiceResponse[]>;
  delete(idDetailInvoice: number): Promise<boolean>;
  findByProcessId(idProcess: number): Promise<DetailInvoiceResponse[]>;
  findByEntityId(idEntity: number): Promise<DetailInvoiceResponse[]>;
  findByStatusId(idStatus: number): Promise<DetailInvoiceResponse[]>;
  findByTypePaymentId(idTypePayment: number): Promise<DetailInvoiceResponse[]>;
  findByDocumentId(idDocument: number): Promise<DetailInvoiceResponse[]>;
  findByInvoiceNumber(
    invoiceNumber: string,
  ): Promise<DetailInvoiceResponse | null>;
  findByEmailResponsability(
    emailResponsability: string,
  ): Promise<DetailInvoiceResponse[]>;
  findByEmissionDate(emissionDate: Date): Promise<DetailInvoiceResponse[]>;
  existsById(idDetailInvoice: number): Promise<boolean>;
}
