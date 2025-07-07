import { ProcessModel } from 'src/modules/process/domain/schemas/model/process.model';
import { CreateDetailInvoiceRequest } from '../../domain/schemas/dto/request/create.detail-invoice.request';
import { EntityModel } from 'src/modules/enterprise/domain/schemas/model/entity.model';
import { DetailInvoiceModel } from '../../domain/schemas/model/detail-invoice.model';
import { TypePaymentModel } from 'src/modules/type-payment/domain/schemas/model/type-payment.model';
import { DocumentsModel } from 'src/modules/documents/domain/schemas/model/documents.model';
import { StatusModel } from 'src/modules/status/domain/schemas/model/status.model';
import { UpdateDetailInvoiceRequest } from '../../domain/schemas/dto/request/update.detail-invoice.request';

export class DetailInvoiceMapper {
  static fromCreateDetailInvoiceRequesttoModel(
    detailInvoice: CreateDetailInvoiceRequest,
    processModel: ProcessModel,
    entityModel: EntityModel,
    TypePaymentModel: TypePaymentModel,
    DocumentModel: DocumentsModel,
    StatusModel: StatusModel,
  ): DetailInvoiceModel {
    return new DetailInvoiceModel(
      1,
      processModel,
      detailInvoice.totalValue,
      detailInvoice.invoiceNumber,
      entityModel,
      detailInvoice.description,
      detailInvoice.emissionDate,
      detailInvoice.expirationDate,
      detailInvoice.emailResponsability,
      TypePaymentModel,
      DocumentModel,
      StatusModel,
      new Date(),
      new Date(),
    );
  }

  static fromUpdateDetailInvoiceRequesttoModel(
    idDetailInvoice: number,
    detailInvoice: UpdateDetailInvoiceRequest,
    processModel: ProcessModel,
    entityModel: EntityModel,
    TypePaymentModel: TypePaymentModel,
    DocumentModel: DocumentsModel,
    StatusModel: StatusModel,
  ): DetailInvoiceModel {
    return new DetailInvoiceModel(
      idDetailInvoice,
      processModel,
      detailInvoice.totalValue,
      detailInvoice.invoiceNumber,
      entityModel,
      detailInvoice.description,
      detailInvoice.emissionDate,
      detailInvoice.expirationDate,
      detailInvoice.emailResponsability,
      TypePaymentModel,
      DocumentModel,
      StatusModel,
      new Date(),
      new Date(),
    );
  }
}
