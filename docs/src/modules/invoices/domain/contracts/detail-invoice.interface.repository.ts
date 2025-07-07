import { DetailInvoiceResponse } from '../schemas/dto/response/detail-invoice.response';
import { DetailInvoiceModel } from '../schemas/model/detail-invoice.model';

export interface InterfaceDetailInvoiceRepository {
  create(
    detailInvoice: DetailInvoiceModel,
  ): Promise<DetailInvoiceResponse | null>;
  update(
    idDetailInvoice: number,
    detailInvoice: DetailInvoiceModel,
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
