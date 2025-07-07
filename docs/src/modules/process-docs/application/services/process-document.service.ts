import { Inject, Injectable } from '@nestjs/common';
import { InterfaceProcessDocumentRepository } from '../../domain/contracts/process-document.interface.repository';
import { InterfaceProcessDocumentUseCase } from '../usecases/process-document.use-case.interface';
import { CreateProcessDocumentRequest } from '../../domain/schemas/dto/request/create.process-document.request';
import { ProcessDocumentResponse } from '../../domain/schemas/dto/response/process-document.response';
import { validateFields } from 'src/shared/utils/validators/fields.validators';
import { RpcException } from '@nestjs/microservices';
import { statusCode } from 'src/settings/environments/status-code';
import { InterfaceProcessRepository } from 'src/modules/process/domain/contracts/process.interface.repository';
import { InterfaceDocumentsRepository } from 'src/modules/documents/domain/contracts/documents.interface.repository';
import { ProcessModel } from 'src/modules/process/domain/schemas/model/process.model';
import { ProcessMapper } from 'src/modules/process/application/mappers/process.mapper';
import { DocumentsModel } from 'src/modules/documents/domain/schemas/model/documents.model';
import { DocumentsMapper } from 'src/modules/documents/application/mappers/documents.mapper';
import { ProcessDocumentMapper } from '../mappers/process-document.mapper';
import { UpdateProcessDocumentRequest } from '../../domain/schemas/dto/request/update.process-document.request';

@Injectable()
export class ProcessDocumentUseCaseService
  implements InterfaceProcessDocumentUseCase
{
  constructor(
    @Inject('ProcessDocumentRepository')
    private readonly processDocumentRepository: InterfaceProcessDocumentRepository,

    @Inject('ProcessRepository')
    private readonly processRepository: InterfaceProcessRepository,

    @Inject('DocumentsRepository')
    private readonly documentRepository: InterfaceDocumentsRepository,
  ) {}

  async create(
    processDocument: CreateProcessDocumentRequest,
  ): Promise<ProcessDocumentResponse | null> {
    try {
      const requiredFields: string[] = [
        'idProcess',
        'idDocument',
        'observations',
      ];

      const missingFieldsMessages: string[] = validateFields(
        processDocument,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const process = await this.processRepository.findById(
        processDocument.idProcess,
      );
      if (!process) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Process with ID ${processDocument.idProcess} not found.`,
        });
      }

      const document = await this.documentRepository.findById(
        processDocument.idDocument,
      );
      if (!document) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Document with ID ${processDocument.idDocument} not found.`,
        });
      }

      const processModel: ProcessModel =
        ProcessMapper.fromProcessResponseToProcessModel(process);

      const documentModel: DocumentsModel =
        DocumentsMapper.fromDocumentsResponseToModel(document);

      const processDocumentModel =
        ProcessDocumentMapper.fromCreateProcessDocumentRequestToModel(
          processDocument,
          processModel,
          documentModel,
        );

      const createdProcessDocument =
        await this.processDocumentRepository.create(processDocumentModel);

      if (!createdProcessDocument) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to create process document.',
        });
      }
      return createdProcessDocument;
    } catch (error) {
      throw error;
    }
  }

  async update(
    idProcessDocument: number,
    processDocument: UpdateProcessDocumentRequest,
  ): Promise<ProcessDocumentResponse | null> {
    try {
      if (!idProcessDocument || idProcessDocument <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid process document ID or ID not provided.',
        });
      }

      const requiredFields: string[] = [
        'idProcess',
        'idDocument',
        'observations',
      ];

      const missingFieldsMessages: string[] = validateFields(
        processDocument,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const existingProcessDocument =
        await this.processDocumentRepository.existsById(idProcessDocument);
      if (!existingProcessDocument) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Process document with ID ${idProcessDocument} not found.`,
        });
      }

      const process = await this.processRepository.findById(
        processDocument.idProcess,
      );
      if (!process) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Process with ID ${processDocument.idProcess} not found.`,
        });
      }

      const document = await this.documentRepository.findById(
        processDocument.idDocument,
      );
      if (!document) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Document with ID ${processDocument.idDocument} not found.`,
        });
      }

      const processModel: ProcessModel =
        ProcessMapper.fromProcessResponseToProcessModel(process);

      const documentModel: DocumentsModel =
        DocumentsMapper.fromDocumentsResponseToModel(document);

      const updatedProcessDocumentModel =
        ProcessDocumentMapper.fromUpdateProcessDocumentRequestToModel(
          idProcessDocument,
          processDocument,
          processModel,
          documentModel,
        );

      const updatedProcessDocument =
        await this.processDocumentRepository.update(
          idProcessDocument,
          updatedProcessDocumentModel,
        );

      if (!updatedProcessDocument) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to update process document.',
        });
      }
      return updatedProcessDocument;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<ProcessDocumentResponse[]> {
    try {
      const processDocuments = await this.processDocumentRepository.findAll();
      if (!processDocuments || processDocuments.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No process documents found.',
        });
      }
      return processDocuments;
    } catch (error) {
      throw error;
    }
  }

  async findById(
    idProcessDocument: number,
  ): Promise<ProcessDocumentResponse | null> {
    try {
      if (!idProcessDocument || idProcessDocument <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid process document ID or ID not provided.',
        });
      }

      const existingProcessDocument =
        await this.processDocumentRepository.existsById(idProcessDocument);
      if (!existingProcessDocument) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Process document with ID ${idProcessDocument} not found.`,
        });
      }
      return await this.processDocumentRepository.findById(idProcessDocument);
    } catch (error) {
      throw error;
    }
  }

  async findByDocumentId(
    idDocument: number,
  ): Promise<ProcessDocumentResponse[]> {
    try {
      if (!idDocument || idDocument <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid document ID or ID not provided.',
        });
      }

      const processDocuments =
        await this.processDocumentRepository.findByDocumentId(idDocument);
      if (!processDocuments || processDocuments.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No process documents found for document ID ${idDocument}.`,
        });
      }
      return processDocuments;
    } catch (error) {
      throw error;
    }
  }

  async findByProcessId(idProcess: number): Promise<ProcessDocumentResponse[]> {
    try {
      if (!idProcess || idProcess <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid process ID or ID not provided.',
        });
      }

      const processDocuments =
        await this.processDocumentRepository.findByProcessId(idProcess);
      if (!processDocuments || processDocuments.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No process documents found for process ID ${idProcess}.`,
        });
      }
      return processDocuments;
    } catch (error) {
      throw error;
    }
  }

  async delete(idProcessDocument: number): Promise<boolean> {
    try {
      if (!idProcessDocument || idProcessDocument <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid process document ID or ID not provided.',
        });
      }

      const existingProcessDocument =
        await this.processDocumentRepository.existsById(idProcessDocument);
      if (!existingProcessDocument) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Process document with ID ${idProcessDocument} not found.`,
        });
      }

      const deleted =
        await this.processDocumentRepository.delete(idProcessDocument);
      if (!deleted) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to delete process document.',
        });
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async existsById(idProcessDocument: number): Promise<boolean> {
    return this.processDocumentRepository.existsById(idProcessDocument);
  }
}
