import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InterfaceTypeDodumentsRepository } from 'src/modules/type-documents/domain/contracts/type-documents.interface.repository';
import { TypeDocumentsResponse } from 'src/modules/type-documents/domain/schemas/dto/response/type-documents.response';
import { TypeDocumentsModel } from 'src/modules/type-documents/domain/schemas/model/type-documents.model';
import { statusCode } from 'src/settings/environments/status-code';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';

@Injectable()
export class TypeDocumentsPrismaImplementation
  implements InterfaceTypeDodumentsRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<TypeDocumentsResponse[]> {
    try {
      const typeDocuments = await this.prismaService.typeDocument.findMany({
        orderBy: {
          created_at: 'desc',
        },
      });
      return typeDocuments.map((doc) => ({
        idTypeDocument: doc.id_type_document,
        title: doc.title,
        description: doc.description!,
        createdAt: doc.created_at,
        updatedAt: doc.updated_at,
      }));
    } catch (error) {
      throw error;
    }
  }

  async findById(
    idTypeDocument: number,
  ): Promise<TypeDocumentsResponse | null> {
    try {
      const typeDocument = await this.prismaService.typeDocument.findUnique({
        where: { id_type_document: idTypeDocument },
      });
      if (!typeDocument) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type document with ID ${idTypeDocument} not found`,
        });
      }
      return {
        idTypeDocument: typeDocument.id_type_document,
        title: typeDocument.title,
        description: typeDocument.description!,
        createdAt: typeDocument.created_at,
        updatedAt: typeDocument.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async findByTitle(title: string): Promise<TypeDocumentsResponse | null> {
    try {
      const typeDocument = await this.prismaService.typeDocument.findFirst({
        where: { title },
      });
      if (!typeDocument) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type document with title "${title}" not found`,
        });
      }
      return {
        idTypeDocument: typeDocument.id_type_document,
        title: typeDocument.title,
        description: typeDocument.description!,
        createdAt: typeDocument.created_at,
        updatedAt: typeDocument.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async create(
    typeDocument: TypeDocumentsModel,
  ): Promise<TypeDocumentsResponse | null> {
    try {
      const createdTypeDocument = await this.prismaService.typeDocument.create({
        data: {
          title: typeDocument.getTitle(),
          description: typeDocument.getDescription(),
        },
      });

      if (!createdTypeDocument) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to create type document',
        });
      }

      return {
        idTypeDocument: createdTypeDocument.id_type_document,
        title: createdTypeDocument.title,
        description: createdTypeDocument.description!,
        createdAt: createdTypeDocument.created_at,
        updatedAt: createdTypeDocument.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(
    idTypeDocument: number,
    typeDocument: TypeDocumentsModel,
  ): Promise<TypeDocumentsResponse | null> {
    try {
      const updatedTypeDocument = await this.prismaService.typeDocument.update({
        where: { id_type_document: idTypeDocument },
        data: {
          title: typeDocument.getTitle(),
          description: typeDocument.getDescription(),
        },
      });

      return {
        idTypeDocument: updatedTypeDocument.id_type_document,
        title: updatedTypeDocument.title,
        description: updatedTypeDocument.description!,
        createdAt: updatedTypeDocument.created_at,
        updatedAt: updatedTypeDocument.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(idTypeDocument: number): Promise<boolean> {
    try {
      const deletedTypeDocument = await this.prismaService.typeDocument.delete({
        where: { id_type_document: idTypeDocument },
      });

      if (!deletedTypeDocument) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type document with ID ${idTypeDocument} not found`,
        });
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async existsById(idTypeDocument: number): Promise<boolean> {
    try {
      const existsById = await this.prismaService.typeDocument.findUnique({
        where: { id_type_document: idTypeDocument },
      });
      return !!existsById;
    } catch (error) {
      throw error;
    }
  }
}
