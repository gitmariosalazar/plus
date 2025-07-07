import { Inject, Injectable } from '@nestjs/common';
import { InterfaceDetailInvoiceUseCase } from '../usecases/detail-invoice.use-case.interface';
import { InterfaceDetailInvoiceRepository } from '../../domain/contracts/detail-invoice.interface.repository';
import { InterfaceProcessRepository } from 'src/modules/process/domain/contracts/process.interface.repository';
import { InterfaceEntityRepository } from 'src/modules/enterprise/domain/contracts/entity.interface.repository';
import { InterfaceTypePaymentRepository } from 'src/modules/type-payment/domain/contracts/type-payment.interface.repository';
import { InterfaceDocumentsRepository } from 'src/modules/documents/domain/contracts/documents.interface.repository';
import { InterfaceStatusRepository } from 'src/modules/status/domain/contracts/status.interface.repository';
import { CreateDetailInvoiceRequest } from '../../domain/schemas/dto/request/create.detail-invoice.request';
import { DetailInvoiceResponse } from '../../domain/schemas/dto/response/detail-invoice.response';
import { DetailInvoiceMapper } from '../mappers/detail-invoice.mapper';
import { ProcessMapper } from 'src/modules/process/application/mappers/process.mapper';
import { EntityMapper } from 'src/modules/enterprise/application/mappers/entity.mapper';
import { TypePaymentMapper } from 'src/modules/type-payment/application/mappers/type-payment.mapper';
import { DocumentsMapper } from 'src/modules/documents/application/mappers/documents.mapper';
import { StatusMapper } from 'src/modules/status/application/mappers/status.mapper';
import { RpcException } from '@nestjs/microservices';
import { statusCode } from 'src/settings/environments/status-code';
import { validateFields } from 'src/shared/utils/validators/fields.validators';
import { UpdateDetailInvoiceRequest } from '../../domain/schemas/dto/request/update.detail-invoice.request';

@Injectable()
export class DetailInvoiceUseCaseService
  implements InterfaceDetailInvoiceUseCase
{
  constructor(
    @Inject('DetailInvoiceRepository')
    private readonly detailInvoiceRepository: InterfaceDetailInvoiceRepository,
    @Inject('ProcessRepository')
    private readonly processRepository: InterfaceProcessRepository,
    @Inject('EntityRepository')
    private readonly entityRepository: InterfaceEntityRepository,
    @Inject('TypePaymentRepository')
    private readonly typePaymentRepository: InterfaceTypePaymentRepository,
    @Inject('DocumentsRepository')
    private readonly documentRepository: InterfaceDocumentsRepository,
    @Inject('StatusRepository')
    private readonly statusRepository: InterfaceStatusRepository,
  ) {}

  async create(
    detailInvoice: CreateDetailInvoiceRequest,
  ): Promise<DetailInvoiceResponse | null> {
    try {
      const requiredFields: string[] = [
        'idProcess',
        'totalValue',
        'invoiceNumber',
        'idEntity',
        'description',
        'emissionDate',
        'expirationDate',
        'emailResponsability',
        'idTypePayment',
        'idDocument',
        'idStatus',
      ];

      const missingFieldsMessages: string[] = validateFields(
        detailInvoice,
        requiredFields,
      );
      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const process = await this.processRepository.findById(
        detailInvoice.idProcess,
      );
      if (!process) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Process with id ${detailInvoice.idProcess} not found`,
        });
      }

      const entity = await this.entityRepository.findById(
        detailInvoice.idEntity,
      );
      if (!entity) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Entity with id ${detailInvoice.idEntity} not found`,
        });
      }

      const typePayment = await this.typePaymentRepository.findById(
        detailInvoice.idTypePayment,
      );
      if (!typePayment) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `TypePayment with id ${detailInvoice.idTypePayment} not found`,
        });
      }

      const document = await this.documentRepository.findById(
        detailInvoice.idDocument,
      );
      if (!document) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Document with id ${detailInvoice.idDocument} not found`,
        });
      }

      const status = await this.statusRepository.findById(
        detailInvoice.idStatus,
      );
      if (!status) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Status with id ${detailInvoice.idStatus} not found`,
        });
      }

      const detailInvoiceModel =
        DetailInvoiceMapper.fromCreateDetailInvoiceRequesttoModel(
          detailInvoice,
          ProcessMapper.fromProcessResponseToProcessModel(process),
          EntityMapper.fromEntityResponseToModel(entity),
          TypePaymentMapper.fromTypePaymentResponseToTypePaymentModel(
            typePayment,
          ),
          DocumentsMapper.fromDocumentsResponseToModel(document),
          StatusMapper.fromStatusResponseToStatusModel(status),
        );

      const detailInvoiceCreated =
        await this.detailInvoiceRepository.create(detailInvoiceModel);
      if (!detailInvoiceCreated) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Error creating detail invoice',
        });
      }

      const notificationPayload = {
        email: 'mariosalazar.ms.10@gmail.com',
        phone: '+593994532438',
        subject: `New Invoice Created: ${detailInvoiceCreated.invoiceNumber}`,
        message: `Invoice with ID ${detailInvoiceCreated.process.processNumber} has been created.`,
        idTypeNotification: 1,
        processCode: detailInvoiceCreated.process.processNumber,
        idPriority: 1,
        attempts: 0,
        sent_at: new Date().toISOString(),
      };

      return detailInvoiceCreated;
    } catch (error) {
      throw error;
    }
  }

  async update(
    idDetailInvoice: number,
    detailInvoice: UpdateDetailInvoiceRequest,
  ): Promise<DetailInvoiceResponse | null> {
    try {
      if (!idDetailInvoice || idDetailInvoice <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'idDetailInvoice is required or ID provided is invalid',
        });
      }
      const requiredFields: string[] = [
        'idProcess',
        'totalValue',
        'invoiceNumber',
        'idEntity',
        'description',
        'emissionDate',
        'expirationDate',
        'emailResponsability',
        'idTypePayment',
        'idDocument',
        'idStatus',
      ];
      const missingFieldsMessages: string[] = validateFields(
        detailInvoice,
        requiredFields,
      );
      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }
      const existsDetailInvoice =
        await this.detailInvoiceRepository.existsById(idDetailInvoice);
      if (!existsDetailInvoice) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Detail Invoice with id ${idDetailInvoice} not found`,
        });
      }
      const process = await this.processRepository.findById(
        detailInvoice.idProcess,
      );
      if (!process) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Process with id ${detailInvoice.idProcess} not found`,
        });
      }

      const entity = await this.entityRepository.findById(
        detailInvoice.idEntity,
      );
      if (!entity) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Entity with id ${detailInvoice.idEntity} not found`,
        });
      }

      const typePayment = await this.typePaymentRepository.findById(
        detailInvoice.idTypePayment,
      );
      if (!typePayment) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `TypePayment with id ${detailInvoice.idTypePayment} not found`,
        });
      }

      const document = await this.documentRepository.findById(
        detailInvoice.idDocument,
      );
      if (!document) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Document with id ${detailInvoice.idDocument} not found`,
        });
      }

      const status = await this.statusRepository.findById(
        detailInvoice.idStatus,
      );
      if (!status) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Status with id ${detailInvoice.idStatus} not found`,
        });
      }

      const detailInvoiceModel =
        DetailInvoiceMapper.fromUpdateDetailInvoiceRequesttoModel(
          idDetailInvoice,
          detailInvoice,
          ProcessMapper.fromProcessResponseToProcessModel(process),
          EntityMapper.fromEntityResponseToModel(entity),
          TypePaymentMapper.fromTypePaymentResponseToTypePaymentModel(
            typePayment,
          ),
          DocumentsMapper.fromDocumentsResponseToModel(document),
          StatusMapper.fromStatusResponseToStatusModel(status),
        );
      const detailInvoiceUpdated = await this.detailInvoiceRepository.update(
        idDetailInvoice,
        detailInvoiceModel,
      );
      if (!detailInvoiceUpdated) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Error updating detail invoice',
        });
      }
      return detailInvoiceUpdated;
    } catch (error) {
      throw error;
    }
  }

  async existsById(idDetailInvoice: number): Promise<boolean> {
    return this.detailInvoiceRepository.existsById(idDetailInvoice);
  }

  async findAll(): Promise<DetailInvoiceResponse[]> {
    try {
      const detailInvoices = await this.detailInvoiceRepository.findAll();
      if (!detailInvoices || detailInvoices.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No detail invoices found',
        });
      }
      return detailInvoices;
    } catch (error) {
      throw error;
    }
  }

  async findById(
    idDetailInvoice: number,
  ): Promise<DetailInvoiceResponse | null> {
    try {
      if (!idDetailInvoice || idDetailInvoice <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'idDetailInvoice is required or ID provided is invalid',
        });
      }

      const existsDetailInvoice =
        await this.detailInvoiceRepository.existsById(idDetailInvoice);
      if (!existsDetailInvoice) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Detail Invoice with id ${idDetailInvoice} not found`,
        });
      }

      const detailInvoice =
        await this.detailInvoiceRepository.findById(idDetailInvoice);
      if (!detailInvoice) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Detail Invoice with id ${idDetailInvoice} not found`,
        });
      }
      return detailInvoice;
    } catch (error) {
      throw error;
    }
  }

  async findByDocumentId(idDocument: number): Promise<DetailInvoiceResponse[]> {
    try {
      if (!idDocument || idDocument <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'idDocument is required or ID provided is invalid',
        });
      }

      const detailInvoices =
        await this.detailInvoiceRepository.findByDocumentId(idDocument);
      if (!detailInvoices || detailInvoices.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No detail invoices found for document with id ${idDocument}`,
        });
      }
      return detailInvoices;
    } catch (error) {
      throw error;
    }
  }

  async findByEmailResponsability(
    emailResponsability: string,
  ): Promise<DetailInvoiceResponse[]> {
    try {
      if (!emailResponsability || emailResponsability.trim() === '') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'emailResponsability is required',
        });
      }

      const detailInvoices =
        await this.detailInvoiceRepository.findByEmailResponsability(
          emailResponsability,
        );
      if (!detailInvoices || detailInvoices.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No detail invoices found for email ${emailResponsability}`,
        });
      }
      return detailInvoices;
    } catch (error) {
      throw error;
    }
  }

  async findByEmissionDate(
    emissionDate: Date,
  ): Promise<DetailInvoiceResponse[]> {
    try {
      if (typeof emissionDate === 'string') {
        emissionDate = new Date(emissionDate);
      }

      if (!emissionDate || isNaN(emissionDate.getTime())) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'emissionDate is required and must be a valid date',
        });
      }

      const detailInvoices =
        await this.detailInvoiceRepository.findByEmissionDate(emissionDate);
      if (!detailInvoices || detailInvoices.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No detail invoices found for emission date ${emissionDate.toISOString()}`,
        });
      }
      return detailInvoices;
    } catch (error) {
      throw error;
    }
  }

  async findByEntityId(idEntity: number): Promise<DetailInvoiceResponse[]> {
    try {
      if (!idEntity || idEntity <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'idEntity is required or ID provided is invalid',
        });
      }

      const detailInvoices =
        await this.detailInvoiceRepository.findByEntityId(idEntity);
      if (!detailInvoices || detailInvoices.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No detail invoices found for entity with id ${idEntity}`,
        });
      }
      return detailInvoices;
    } catch (error) {
      throw error;
    }
  }

  async findByInvoiceNumber(
    invoiceNumber: string,
  ): Promise<DetailInvoiceResponse | null> {
    try {
      if (!invoiceNumber || invoiceNumber.trim() === '') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'invoiceNumber is required',
        });
      }

      const detailInvoice =
        await this.detailInvoiceRepository.findByInvoiceNumber(invoiceNumber);
      if (!detailInvoice) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Detail Invoice with invoice number ${invoiceNumber} not found`,
        });
      }
      return detailInvoice;
    } catch (error) {
      throw error;
    }
  }

  async findByProcessId(idProcess: number): Promise<DetailInvoiceResponse[]> {
    try {
      if (!idProcess || idProcess <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'idProcess is required or ID provided is invalid',
        });
      }

      const detailInvoices =
        await this.detailInvoiceRepository.findByProcessId(idProcess);
      if (!detailInvoices || detailInvoices.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No detail invoices found for process with id ${idProcess}`,
        });
      }
      return detailInvoices;
    } catch (error) {
      throw error;
    }
  }

  async findByStatusId(idStatus: number): Promise<DetailInvoiceResponse[]> {
    try {
      if (!idStatus || idStatus <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'idStatus is required or ID provided is invalid',
        });
      }

      const detailInvoices =
        await this.detailInvoiceRepository.findByStatusId(idStatus);
      if (!detailInvoices || detailInvoices.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No detail invoices found for status with id ${idStatus}`,
        });
      }
      return detailInvoices;
    } catch (error) {
      throw error;
    }
  }

  async findByTypePaymentId(
    idTypePayment: number,
  ): Promise<DetailInvoiceResponse[]> {
    try {
      if (!idTypePayment || idTypePayment <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'idTypePayment is required or ID provided is invalid',
        });
      }

      const detailInvoices =
        await this.detailInvoiceRepository.findByTypePaymentId(idTypePayment);
      if (!detailInvoices || detailInvoices.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No detail invoices found for type payment with id ${idTypePayment}`,
        });
      }
      return detailInvoices;
    } catch (error) {
      throw error;
    }
  }

  async delete(idDetailInvoice: number): Promise<boolean> {
    try {
      if (!idDetailInvoice || idDetailInvoice <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'idDetailInvoice is required or ID provided is invalid',
        });
      }

      const existsDetailInvoice =
        await this.detailInvoiceRepository.existsById(idDetailInvoice);
      if (!existsDetailInvoice) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Detail Invoice with id ${idDetailInvoice} not found`,
        });
      }

      const deleted =
        await this.detailInvoiceRepository.delete(idDetailInvoice);
      if (!deleted) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Error deleting detail invoice',
        });
      }
      return deleted;
    } catch (error) {
      throw error;
    }
  }
}
