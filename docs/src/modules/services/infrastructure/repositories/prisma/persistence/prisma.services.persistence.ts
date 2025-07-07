import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InterfaceServiceRepository } from 'src/modules/services/domain/contracts/services.interface.repository';
import { ServiceResponse } from 'src/modules/services/domain/schemas/dto/response/services.response';
import { ServiceModel } from 'src/modules/services/domain/schemas/model/services.model';
import { statusCode } from 'src/settings/environments/status-code';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';

@Injectable()
export class ServicesPrismaImplementation
  implements InterfaceServiceRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(service: ServiceModel): Promise<ServiceResponse> {
    try {
      const createdService = await this.prismaService.service.create({
        data: {
          name: service.getName(),
          description: service.getDescription(),
          id_type_service: service.getTypeService().getIdTypeService(),
        },
        include: {
          type_service: true,
        },
      });

      if (!createdService) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Error creating service',
        });
      }
      return {
        idService: createdService.id_service,
        name: createdService.name,
        description: createdService.description!,
        typeService: {
          idTypeService: createdService.type_service.id_type_service,
          name: createdService.type_service.name,
          description: createdService.type_service.description!,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async update(
    idService: number,
    service: ServiceModel,
  ): Promise<ServiceResponse | null> {
    try {
      const existsById = await this.existsById(idService);
      if (!existsById) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Service with ID ${idService} not found`,
        });
      }

      const updatedService = await this.prismaService.service.update({
        where: { id_service: idService },
        data: {
          name: service.getName(),
          description: service.getDescription(),
          id_type_service: service.getTypeService().getIdTypeService(),
        },
        include: {
          type_service: true,
        },
      });
      return {
        idService: updatedService.id_service,
        name: updatedService.name,
        description: updatedService.description!,
        typeService: {
          idTypeService: updatedService.type_service.id_type_service,
          name: updatedService.type_service.name,
          description: updatedService.type_service.description!,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async existsById(idService: number): Promise<boolean> {
    try {
      const service = await this.prismaService.service.findUnique({
        where: { id_service: idService },
      });
      return !!service;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<ServiceResponse[]> {
    try {
      const services = await this.prismaService.service.findMany({
        include: {
          type_service: true,
        },
      });

      if (!services || services.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No services found',
        });
      }

      return services.map((service) => ({
        idService: service.id_service,
        name: service.name,
        description: service.description!,
        typeService: {
          idTypeService: service.type_service.id_type_service,
          name: service.type_service.name,
          description: service.type_service.description!,
        },
      }));
    } catch (error) {
      throw error;
    }
  }

  async findById(idService: number): Promise<ServiceResponse | null> {
    try {
      const service = await this.prismaService.service.findUnique({
        where: { id_service: idService },
        include: {
          type_service: true,
        },
      });

      if (!service) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Service with ID ${idService} not found`,
        });
      }

      return {
        idService: service.id_service,
        name: service.name,
        description: service.description!,
        typeService: {
          idTypeService: service.type_service.id_type_service,
          name: service.type_service.name,
          description: service.type_service.description!,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async findByName(name: string): Promise<ServiceResponse | null> {
    try {
      const service = await this.prismaService.service.findFirst({
        where: { name },
        include: {
          type_service: true,
        },
      });

      if (!service) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Service with name ${name} not found`,
        });
      }

      return {
        idService: service.id_service,
        name: service.name,
        description: service.description!,
        typeService: {
          idTypeService: service.type_service.id_type_service,
          name: service.type_service.name,
          description: service.type_service.description!,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(idService: number): Promise<boolean> {
    try {
      const existsById = await this.existsById(idService);
      if (!existsById) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Service with ID ${idService} not found`,
        });
      }

      await this.prismaService.service.delete({
        where: { id_service: idService },
      });

      return true;
    } catch (error) {
      throw error;
    }
  }
}
