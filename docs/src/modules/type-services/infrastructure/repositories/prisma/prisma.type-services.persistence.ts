import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InterfaceTypeServicesRepository } from 'src/modules/type-services/domain/contracts/type-services.interface.repository';
import { TypeServicesResponse } from 'src/modules/type-services/domain/schemas/dto/response/type-services.response';
import { TypeServicesModel } from 'src/modules/type-services/domain/schemas/model/type-services.model';
import { statusCode } from 'src/settings/environments/status-code';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';

@Injectable()
export class TypeServicesPrismaImplementation
  implements InterfaceTypeServicesRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<TypeServicesResponse[]> {
    try {
      const typeServices = await this.prismaService.typeService.findMany();
      if (!typeServices || typeServices.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No type services found',
        });
      }

      return typeServices.map((typeService) => ({
        idTypeService: typeService.id_type_service,
        name: typeService.name,
        description: typeService.description!,
        createdAt: typeService.created_at,
        updatedAt: typeService.updated_at,
      }));
    } catch (error) {
      throw error;
    }
  }

  async findById(idTypeService: number): Promise<TypeServicesResponse | null> {
    try {
      const typeService = await this.prismaService.typeService.findUnique({
        where: { id_type_service: idTypeService },
      });

      if (!typeService) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type service with id ${idTypeService} not found`,
        });
      }

      return {
        idTypeService: typeService.id_type_service,
        name: typeService.name,
        description: typeService.description!,
        createdAt: typeService.created_at,
        updatedAt: typeService.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async findByName(name: string): Promise<TypeServicesResponse | null> {
    try {
      const typeService = await this.prismaService.typeService.findFirst({
        where: { name },
      });

      if (!typeService) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type service with name ${name} not found`,
        });
      }

      return {
        idTypeService: typeService.id_type_service,
        name: typeService.name,
        description: typeService.description!,
        createdAt: typeService.created_at,
        updatedAt: typeService.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async create(typeService: TypeServicesModel): Promise<TypeServicesResponse> {
    try {
      const createdTypeService = await this.prismaService.typeService.create({
        data: {
          name: typeService.getName(),
          description: typeService.getDescription(),
        },
      });

      if (!createdTypeService) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to create type service',
        });
      }

      return {
        idTypeService: createdTypeService.id_type_service,
        name: createdTypeService.name,
        description: createdTypeService.description!,
        createdAt: createdTypeService.created_at,
        updatedAt: createdTypeService.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(
    idTypeService: number,
    typeService: TypeServicesModel,
  ): Promise<TypeServicesResponse | null> {
    try {
      const existingTypeService =
        await this.prismaService.typeService.findUnique({
          where: { id_type_service: idTypeService },
        });

      if (!existingTypeService) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type service with id ${idTypeService} not found`,
        });
      }

      const updatedTypeService = await this.prismaService.typeService.update({
        where: { id_type_service: idTypeService },
        data: {
          name: typeService.getName(),
          description: typeService.getDescription(),
        },
      });

      if (!updatedTypeService) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to update type service',
        });
      }

      return {
        idTypeService: updatedTypeService.id_type_service,
        name: updatedTypeService.name,
        description: updatedTypeService.description!,
        createdAt: updatedTypeService.created_at,
        updatedAt: updatedTypeService.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(idTypeService: number): Promise<boolean> {
    try {
      const existingTypeService =
        await this.prismaService.typeService.findUnique({
          where: { id_type_service: idTypeService },
        });

      if (!existingTypeService) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type service with id ${idTypeService} not found`,
        });
      }

      await this.prismaService.typeService.delete({
        where: { id_type_service: idTypeService },
      });

      return true;
    } catch (error) {
      throw error;
    }
  }
}
