import { Inject, Injectable } from '@nestjs/common';
import { InterfaceDocumentsUseCase } from '../usecases/documents.use-case.interface';
import { InterfaceDocumentsRepository } from '../../domain/contracts/documents.interface.repository';
import { InterfaceTypeDodumentsRepository } from 'src/modules/type-documents/domain/contracts/type-documents.interface.repository';
import { InterfaceStatusRepository } from 'src/modules/status/domain/contracts/status.interface.repository';
import { InterfaceProcessRepository } from 'src/modules/process/domain/contracts/process.interface.repository';
import { CreateDocumentRequest } from '../../domain/schemas/dto/request/create.document.request';
import { DocumentsResponse } from '../../domain/schemas/dto/response/documents.response';
import { validateFields } from 'src/shared/utils/validators/fields.validators';
import { RpcException } from '@nestjs/microservices';
import { statusCode } from 'src/settings/environments/status-code';
import { DocumentsMapper } from '../mappers/documents.mapper';
import { TypeDocumentsModel } from 'src/modules/type-documents/domain/schemas/model/type-documents.model';
import { StatusModel } from 'src/modules/status/domain/schemas/model/status.model';
import { TypeStatusModel } from 'src/modules/type-status/domain/schemas/model/type-status.model';
import { ProcessModel } from 'src/modules/process/domain/schemas/model/process.model';
import { EntityModel } from 'src/modules/enterprise/domain/schemas/model/entity.model';
import { ProcessMapper } from 'src/modules/process/application/mappers/process.mapper';
import { TypeDodumentsMapper } from 'src/modules/type-documents/application/mappers/type-documents.mapper';
import { StatusMapper } from 'src/modules/status/application/mappers/status.mapper';
import { UpdateDocumentRequest } from '../../domain/schemas/dto/request/update.document.request';

@Injectable()
export class DocumentsUseCaseService implements InterfaceDocumentsUseCase {
  constructor(
    @Inject('DocumentsRepository')
    private readonly documentsRepository: InterfaceDocumentsRepository,
    @Inject('TypeDocumentsRepository')
    private readonly typeDocumentsRepository: InterfaceTypeDodumentsRepository,
    @Inject('StatusRepository')
    private readonly statusRepository: InterfaceStatusRepository,
    @Inject('ProcessRepository')
    private readonly processRepository: InterfaceProcessRepository,
  ) {}

  async create(
    document: CreateDocumentRequest,
  ): Promise<DocumentsResponse | null> {
    try {
      const requiredFields: string[] = [
        'idTypeDocument',
        'documentName',
        'documentDescription',
        'dateRequest',
        'dateReception',
        'managerName',
        'idProcess',
        'documentUrl',
        'idStatus',
      ];

      const missingFieldsMessages: string[] = validateFields(
        document,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          status: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      if (typeof document.dateRequest === 'string') {
        document.dateRequest = new Date(document.dateRequest);
      }

      if (!document.dateRequest || isNaN(document.dateRequest.getTime())) {
        throw new RpcException({
          status: statusCode.BAD_REQUEST,
          message: 'dateRequest is required and must be a valid date.',
        });
      }

      if (typeof document.dateReception === 'string') {
        document.dateReception = new Date(document.dateReception);
      }

      if (!document.dateReception || isNaN(document.dateReception.getTime())) {
        throw new RpcException({
          status: statusCode.BAD_REQUEST,
          message: 'dateReception is required and must be a valid date.',
        });
      }

      const typeDocument = await this.typeDocumentsRepository.findById(
        document.idTypeDocument,
      );
      if (!typeDocument) {
        throw new RpcException({
          status: statusCode.NOT_FOUND,
          message: `Type document with ID ${document.idTypeDocument} not found.`,
        });
      }

      const typeDocumentModel: TypeDocumentsModel =
        TypeDodumentsMapper.fromTypeDocumentsResponseToTypeDocumentsModel(
          typeDocument,
        );

      const status = await this.statusRepository.findById(document.idStatus);
      if (!status) {
        throw new RpcException({
          status: statusCode.NOT_FOUND,
          message: `Status with ID ${document.idStatus} not found.`,
        });
      }

      const statusModel: StatusModel =
        StatusMapper.fromStatusResponseToStatusModel(status);

      const process = await this.processRepository.findById(document.idProcess);
      if (!process) {
        throw new RpcException({
          status: statusCode.NOT_FOUND,
          message: `Process with ID ${document.idProcess} not found.`,
        });
      }

      const processModel: ProcessModel =
        ProcessMapper.fromProcessResponseToProcessModel(process);

      const documentModel = DocumentsMapper.fromCreateDocumentRequestToModel(
        document,
        typeDocumentModel,
        statusModel,
        processModel,
      );

      const createdDocument =
        await this.documentsRepository.create(documentModel);
      if (!createdDocument) {
        throw new RpcException({
          status: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to create document.',
        });
      }
      return createdDocument;
    } catch (error) {
      throw error;
    }
  }

  async update(
    idDocument: number,
    document: UpdateDocumentRequest,
  ): Promise<DocumentsResponse | null> {
    try {
      if (!idDocument || idDocument <= 0) {
        throw new RpcException({
          status: statusCode.BAD_REQUEST,
          message: 'Document ID is required or invalid.',
        });
      }

      const requiredFields: string[] = [
        'idTypeDocument',
        'documentName',
        'documentDescription',
        'dateRequest',
        'dateReception',
        'managerName',
        'idProcess',
        'documentUrl',
        'idStatus',
      ];
      const missingFieldsMessages: string[] = validateFields(
        document,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          status: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const existingDocument =
        await this.documentsRepository.existsById(idDocument);

      if (!existingDocument) {
        throw new RpcException({
          status: statusCode.NOT_FOUND,
          message: `Document with ID ${idDocument} not found.`,
        });
      }

      const typeDocument = await this.typeDocumentsRepository.findById(
        document.idTypeDocument,
      );
      if (!typeDocument) {
        throw new RpcException({
          status: statusCode.NOT_FOUND,
          message: `Type document with ID ${document.idTypeDocument} not found.`,
        });
      }

      const typeDocumentModel: TypeDocumentsModel =
        TypeDodumentsMapper.fromTypeDocumentsResponseToTypeDocumentsModel(
          typeDocument,
        );

      const status = await this.statusRepository.findById(document.idStatus);
      if (!status) {
        throw new RpcException({
          status: statusCode.NOT_FOUND,
          message: `Status with ID ${document.idStatus} not found.`,
        });
      }
      const statusModel: StatusModel =
        StatusMapper.fromStatusResponseToStatusModel(status);

      const process = await this.processRepository.findById(document.idProcess);
      if (!process) {
        throw new RpcException({
          status: statusCode.NOT_FOUND,
          message: `Process with ID ${document.idProcess} not found.`,
        });
      }
      const processModel: ProcessModel =
        ProcessMapper.fromProcessResponseToProcessModel(process);
      const documentModel = DocumentsMapper.fromUpdateDocumentRequestToModel(
        idDocument,
        document,
        typeDocumentModel,
        statusModel,
        processModel,
      );
      const updatedDocument = await this.documentsRepository.update(
        idDocument,
        documentModel,
      );
      if (!updatedDocument) {
        throw new RpcException({
          status: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to update document.',
        });
      }
      return updatedDocument;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<DocumentsResponse[]> {
    try {
      const documents = await this.documentsRepository.findAll();
      if (!documents || documents.length === 0) {
        throw new RpcException({
          status: statusCode.NOT_FOUND,
          message: 'No documents found.',
        });
      }
      return documents;
    } catch (error) {
      throw error;
    }
  }

  async findById(idDocument: number): Promise<DocumentsResponse | null> {
    try {
      if (!idDocument || idDocument <= 0) {
        throw new RpcException({
          status: statusCode.BAD_REQUEST,
          message: 'Document ID is required or invalid.',
        });
      }

      const existingDocument =
        await this.documentsRepository.existsById(idDocument);

      if (!existingDocument) {
        throw new RpcException({
          status: statusCode.NOT_FOUND,
          message: `Document with ID ${idDocument} not found.`,
        });
      }

      const document = await this.documentsRepository.findById(idDocument);
      if (!document) {
        throw new RpcException({
          status: statusCode.NOT_FOUND,
          message: `Document with ID ${idDocument} not found.`,
        });
      }
      return document;
    } catch (error) {
      throw error;
    }
  }

  async findByProcessId(idProcess: number): Promise<DocumentsResponse[]> {
    try {
      if (!idProcess || idProcess <= 0) {
        throw new RpcException({
          status: statusCode.BAD_REQUEST,
          message: 'Process ID is required or invalid.',
        });
      }

      const existingProcess =
        await this.processRepository.existsById(idProcess);

      if (!existingProcess) {
        throw new RpcException({
          status: statusCode.NOT_FOUND,
          message: `Process with ID ${idProcess} not found.`,
        });
      }

      const documents =
        await this.documentsRepository.findByProcessId(idProcess);
      if (!documents || documents.length === 0) {
        throw new RpcException({
          status: statusCode.NOT_FOUND,
          message: `No documents found for process with ID ${idProcess}.`,
        });
      }
      return documents;
    } catch (error) {
      throw error;
    }
  }

  async findByStatusId(idStatus: number): Promise<DocumentsResponse[]> {
    try {
      if (!idStatus || idStatus <= 0) {
        throw new RpcException({
          status: statusCode.BAD_REQUEST,
          message: 'Status ID is required or invalid.',
        });
      }

      const existingStatus = await this.statusRepository.existsById(idStatus);
      if (!existingStatus) {
        throw new RpcException({
          status: statusCode.NOT_FOUND,
          message: `Status with ID ${idStatus} not found.`,
        });
      }

      const documents = await this.documentsRepository.findByStatusId(idStatus);
      if (!documents || documents.length === 0) {
        throw new RpcException({
          status: statusCode.NOT_FOUND,
          message: `No documents found for status with ID ${idStatus}.`,
        });
      }
      return documents;
    } catch (error) {
      throw error;
    }
  }

  async findByTypeDocumentId(
    idTypeDocument: number,
  ): Promise<DocumentsResponse[]> {
    try {
      if (!idTypeDocument || idTypeDocument <= 0) {
        throw new RpcException({
          status: statusCode.BAD_REQUEST,
          message: 'Type Document ID is required or invalid.',
        });
      }

      const existingTypeDocument =
        await this.typeDocumentsRepository.existsById(idTypeDocument);

      if (!existingTypeDocument) {
        throw new RpcException({
          status: statusCode.NOT_FOUND,
          message: `Type Document with ID ${idTypeDocument} not found.`,
        });
      }

      const documents =
        await this.documentsRepository.findByTypeDocumentId(idTypeDocument);
      if (!documents || documents.length === 0) {
        throw new RpcException({
          status: statusCode.NOT_FOUND,
          message: `No documents found for type document with ID ${idTypeDocument}.`,
        });
      }
      return documents;
    } catch (error) {
      throw error;
    }
  }

  async existsById(idDocument: number): Promise<boolean> {
    return this.documentsRepository.existsById(idDocument);
  }

  async delete(idDocument: number): Promise<boolean> {
    try {
      if (!idDocument || idDocument <= 0) {
        throw new RpcException({
          status: statusCode.BAD_REQUEST,
          message: 'Document ID is required or invalid.',
        });
      }

      const existingDocument =
        await this.documentsRepository.existsById(idDocument);

      if (!existingDocument) {
        throw new RpcException({
          status: statusCode.NOT_FOUND,
          message: `Document with ID ${idDocument} not found.`,
        });
      }

      const deleted = await this.documentsRepository.delete(idDocument);
      if (!deleted) {
        throw new RpcException({
          status: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to delete document.',
        });
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}
