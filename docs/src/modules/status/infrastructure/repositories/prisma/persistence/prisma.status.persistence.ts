import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InterfaceStatusRepository } from 'src/modules/status/domain/contracts/status.interface.repository';
import { StatusResponse } from 'src/modules/status/domain/schemas/dto/response/status.response';
import { StatusModel } from 'src/modules/status/domain/schemas/model/status.model';
import { statusCode } from 'src/settings/environments/status-code';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';

@Injectable()
export class StatusPrismaImplementation implements InterfaceStatusRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(status: StatusModel): Promise<StatusResponse | null> {
    try {
      const createdStatus = await this.prismaService.status.create({
        data: {
          name: status.getName(),
          description: status.getDescription(),
          type_status: {
            connect: {
              id_type_status: status.getTypeStatus().getIdTypeStatus(),
            },
          },
        },
        include: {
          type_status: true,
        },
      });

      if (!createdStatus) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to create status.',
        });
      }
      return {
        idStatus: createdStatus.id_status,
        name: createdStatus.name,
        description: createdStatus.description!,
        typeStatus: {
          idTypeStatus: createdStatus.type_status.id_type_status,
          name: createdStatus.type_status.name,
          description: createdStatus.type_status.description!,
        },
        createdAt: createdStatus.created_at,
        updatedAt: createdStatus.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(
    idStatus: number,
    status: StatusModel,
  ): Promise<StatusResponse | null> {
    try {
      const updatedStatus = await this.prismaService.status.update({
        where: { id_status: idStatus },
        data: {
          name: status.getName(),
          description: status.getDescription(),
          type_status: {
            connect: {
              id_type_status: status.getTypeStatus().getIdTypeStatus(),
            },
          },
        },
        include: {
          type_status: true,
        },
      });

      if (!updatedStatus) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to update status.',
        });
      }
      return {
        idStatus: updatedStatus.id_status,
        name: updatedStatus.name,
        description: updatedStatus.description!,
        typeStatus: {
          idTypeStatus: updatedStatus.type_status.id_type_status,
          name: updatedStatus.type_status.name,
          description: updatedStatus.type_status.description!,
        },
        createdAt: updatedStatus.created_at,
        updatedAt: updatedStatus.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async existsById(idStatus: number): Promise<boolean> {
    try {
      const status = await this.prismaService.status.findUnique({
        where: { id_status: idStatus },
      });
      return !!status;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<StatusResponse[]> {
    try {
      const statuses = await this.prismaService.status.findMany({
        include: {
          type_status: true,
        },
      });

      if (!statuses || statuses.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No statuses found.',
        });
      }

      return statuses.map((status) => ({
        idStatus: status.id_status,
        name: status.name,
        description: status.description!,
        typeStatus: {
          idTypeStatus: status.type_status.id_type_status,
          name: status.type_status.name,
          description: status.type_status.description!,
        },
        createdAt: status.created_at,
        updatedAt: status.updated_at,
      }));
    } catch (error) {
      throw error;
    }
  }

  async findById(idStatus: number): Promise<StatusResponse | null> {
    try {
      const status = await this.prismaService.status.findUnique({
        where: { id_status: idStatus },
        include: {
          type_status: true,
        },
      });

      if (!status) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Status with ID ${idStatus} not found.`,
        });
      }

      return {
        idStatus: status.id_status,
        name: status.name,
        description: status.description!,
        typeStatus: {
          idTypeStatus: status.type_status.id_type_status,
          name: status.type_status.name,
          description: status.type_status.description!,
        },
        createdAt: status.created_at,
        updatedAt: status.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async findByName(name: string): Promise<StatusResponse | null> {
    try {
      const status = await this.prismaService.status.findFirst({
        where: { name },
        include: {
          type_status: true,
        },
      });

      if (!status) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Status with name ${name} not found.`,
        });
      }

      return {
        idStatus: status.id_status,
        name: status.name,
        description: status.description!,
        typeStatus: {
          idTypeStatus: status.type_status.id_type_status,
          name: status.type_status.name,
          description: status.type_status.description!,
        },
        createdAt: status.created_at,
        updatedAt: status.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(idStatus: number): Promise<boolean> {
    try {
      const deletedStatus = await this.prismaService.status.delete({
        where: { id_status: idStatus },
      });

      if (!deletedStatus) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Status with ID ${idStatus} not found.`,
        });
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
