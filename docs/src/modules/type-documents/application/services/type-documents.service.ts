import { Inject, Injectable } from '@nestjs/common';
import { InterfaceTypeDocumentsUseCase } from '../usecases/type-documents.use-case.interface';
import { InterfaceTypeDodumentsRepository } from '../../domain/contracts/type-documents.interface.repository';
import { TypeDocumentsResponse } from '../../domain/schemas/dto/response/type-documents.response';
import { RpcException } from '@nestjs/microservices';
import { statusCode } from 'src/settings/environments/status-code';
import { CreateTypeDocumentsRequest } from '../../domain/schemas/dto/request/create.type-documents.request';
import { validateFields } from 'src/shared/utils/validators/fields.validators';
import { TypeDocumentsModel } from '../../domain/schemas/model/type-documents.model';
import { TypeDodumentsMapper } from '../mappers/type-documents.mapper';
import { UpdateTypeDocumentsRequest } from '../../domain/schemas/dto/request/update.type-documents.request';

@Injectable()
export class TypeDocumentsUseCaseService
  implements InterfaceTypeDocumentsUseCase
{
  constructor(
    @Inject('TypeDocumentsRepository')
    private readonly typeDocumentsRepository: InterfaceTypeDodumentsRepository,
  ) {}
  async delete(idTypeDocument: number): Promise<boolean> {
    try {
      if (!idTypeDocument || isNaN(idTypeDocument)) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid ID provided or ID no provided',
        });
      }

      const existsById =
        await this.typeDocumentsRepository.existsById(idTypeDocument);

      if (!existsById) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type document with ID ${idTypeDocument} not found`,
        });
      }

      return await this.typeDocumentsRepository.delete(idTypeDocument);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<TypeDocumentsResponse[]> {
    try {
      const typeDocuments = await this.typeDocumentsRepository.findAll();

      if (!typeDocuments || typeDocuments.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No type documents found',
        });
      }
      return typeDocuments;
    } catch (error) {
      throw error;
    }
  }

  async findById(
    idTypeDocument: number,
  ): Promise<TypeDocumentsResponse | null> {
    try {
      if (!idTypeDocument || isNaN(idTypeDocument)) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid ID provided or ID no provided',
        });
      }

      const existsById =
        await this.typeDocumentsRepository.existsById(idTypeDocument);

      if (!existsById) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type document with ID ${idTypeDocument} not found`,
        });
      }
      return await this.typeDocumentsRepository.findById(idTypeDocument);
    } catch (error) {
      throw error;
    }
  }

  async existsById(idTypeDocument: number): Promise<boolean> {
    return this.typeDocumentsRepository.existsById(idTypeDocument);
  }

  async findByTitle(title: string): Promise<TypeDocumentsResponse | null> {
    try {
      if (!title || typeof title !== 'string') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid title provided or title no provided',
        });
      }
      return await this.typeDocumentsRepository.findByTitle(title);
    } catch (error) {
      throw error;
    }
  }

  async create(
    typeDocumentRequest: CreateTypeDocumentsRequest,
  ): Promise<TypeDocumentsResponse | null> {
    try {
      const requiredFields: string[] = ['title', 'description'];

      const missingFieldsMessages: string[] = validateFields(
        typeDocumentRequest,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const typeDocumentModel: TypeDocumentsModel =
        TypeDodumentsMapper.fromCreateTypeDocumentsRequestToTypeDocumentsModel(
          typeDocumentRequest,
        );

      const typeDocument =
        await this.typeDocumentsRepository.create(typeDocumentModel);

      return typeDocument;
    } catch (error) {
      throw error;
    }
  }

  async update(
    idTypeDocument: number,
    typeDocumentRequest: UpdateTypeDocumentsRequest,
  ): Promise<TypeDocumentsResponse | null> {
    try {
      if (!idTypeDocument || isNaN(idTypeDocument)) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid ID provided or ID no provided',
        });
      }

      const existsById =
        await this.typeDocumentsRepository.existsById(idTypeDocument);

      if (!existsById) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type document with ID ${idTypeDocument} not found`,
        });
      }

      const requiredFields: string[] = ['title', 'description'];

      const missingFieldsMessages: string[] = validateFields(
        typeDocumentRequest,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const typeDocumentModel: TypeDocumentsModel =
        TypeDodumentsMapper.fromUpdateTypeDocumentsRequestToTypeDocumentsModel(
          typeDocumentRequest,
        );

      return await this.typeDocumentsRepository.update(
        idTypeDocument,
        typeDocumentModel,
      );
    } catch (error) {
      throw error;
    }
  }
}
