import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InterfaceTypeStatusRepository } from 'src/modules/type-status/domain/contracts/type-status.interface.repository';
import { TypeStatusResponse } from 'src/modules/type-status/domain/schemas/dto/response/type-status.response';
import { TypeStatusModel } from 'src/modules/type-status/domain/schemas/model/type-status.model';
import { statusCode } from 'src/settings/environments/status-code';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';

@Injectable()
export class TypeStatusPrismaImplementation
  implements InterfaceTypeStatusRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async createTypeStatus(
    typeStatusModel: TypeStatusModel,
  ): Promise<TypeStatusResponse | null> {
    try {
      const createdTypeStatus = await this.prismaService.typeStatus.create({
        data: {
          name: typeStatusModel.getName(),
          description: typeStatusModel.getDescription(),
        },
      });

      if (!createdTypeStatus) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to create type status',
        });
      }

      return {
        idTypeStatus: createdTypeStatus.id_type_status,
        name: createdTypeStatus.name,
        description: createdTypeStatus.description!,
        createdAt: createdTypeStatus.created_at,
        updatedAt: createdTypeStatus.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateTypeStatus(
    idTypeStatus: number,
    typeStatusModel: TypeStatusModel,
  ): Promise<TypeStatusResponse | null> {
    try {
      const typeStatusExists = await this.prismaService.typeStatus.findUnique({
        where: { id_type_status: idTypeStatus },
      });

      if (!typeStatusExists) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type status with ID ${idTypeStatus} not found`,
        });
      }

      const updatedTypeStatus = await this.prismaService.typeStatus.update({
        where: { id_type_status: idTypeStatus },
        data: {
          name: typeStatusModel.getName(),
          description: typeStatusModel.getDescription(),
        },
      });

      if (!updatedTypeStatus) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'Failed to update type status',
        });
      }

      return {
        idTypeStatus: updatedTypeStatus.id_type_status,
        name: updatedTypeStatus.name,
        description: updatedTypeStatus.description!,
        createdAt: updatedTypeStatus.created_at,
        updatedAt: updatedTypeStatus.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteTypeStatus(idTypeStatus: number): Promise<boolean> {
    try {
      const typeStatusExists = await this.prismaService.typeStatus.findUnique({
        where: { id_type_status: idTypeStatus },
      });

      if (!typeStatusExists) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type status with ID ${idTypeStatus} not found`,
        });
      }

      const deletedTypeStatus = await this.prismaService.typeStatus.delete({
        where: { id_type_status: idTypeStatus },
      });

      if (!deletedTypeStatus) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type status with ID ${idTypeStatus} not found`,
        });
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async findTypeStatusById(
    idTypeStatus: number,
  ): Promise<TypeStatusResponse | null> {
    try {
      const typeStatus = await this.prismaService.typeStatus.findUnique({
        where: { id_type_status: idTypeStatus },
      });

      if (!typeStatus) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type status with ID ${idTypeStatus} not found`,
        });
      }

      return {
        idTypeStatus: typeStatus.id_type_status,
        name: typeStatus.name,
        description: typeStatus.description!,
        createdAt: typeStatus.created_at,
        updatedAt: typeStatus.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAllTypeStatus(): Promise<TypeStatusResponse[]> {
    try {
      const typeStatuses = await this.prismaService.typeStatus.findMany();

      if (!typeStatuses || typeStatuses.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No type statuses found',
        });
      }

      return typeStatuses.map((typeStatus) => ({
        idTypeStatus: typeStatus.id_type_status,
        name: typeStatus.name,
        description: typeStatus.description!,
        createdAt: typeStatus.created_at,
        updatedAt: typeStatus.updated_at,
      }));
    } catch (error) {
      throw error;
    }
  }

  async findTypeStatusByName(name: string): Promise<TypeStatusResponse | null> {
    try {
      const typeStatus = await this.prismaService.typeStatus.findFirst({
        where: { name: name },
      });

      if (!typeStatus) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type status with name ${name} not found`,
        });
      }

      return {
        idTypeStatus: typeStatus.id_type_status,
        name: typeStatus.name,
        description: typeStatus.description!,
        createdAt: typeStatus.created_at,
        updatedAt: typeStatus.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }
}
