import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InterfaceEntityRepository } from 'src/modules/enterprise/domain/contracts/entity.interface.repository';
import { EntityResponse } from 'src/modules/enterprise/domain/schemas/dto/response/entity.response';
import { EntityModel } from 'src/modules/enterprise/domain/schemas/model/entity.model';
import { statusCode } from 'src/settings/environments/status-code';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';

@Injectable()
export class EntityPrismaImplementation implements InterfaceEntityRepository {
  constructor(private readonly prismaService: PrismaService) {}

  // Implement the methods defined in InterfaceEntityRepository
  async findById(idEntity: number): Promise<EntityResponse | null> {
    try {
      const entity = await this.prismaService.entity.findUnique({
        where: { id_entity: idEntity },
      });
      if (!entity) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Entity with ID ${idEntity} not found`,
        });
      }
      return {
        idEntity: entity.id_entity,
        ruc: entity.ruc,
        name: entity.name,
        email: entity.email,
        cellphone: entity.cellphone,
        telephone: entity.telephone,
        address: entity.address,
        description: entity.description!,
        createdAt: entity.created_at,
        updatedAt: entity.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async findByRuc(ruc: string): Promise<EntityResponse | null> {
    try {
      const entity = await this.prismaService.entity.findFirst({
        where: { ruc: ruc },
      });
      if (!entity) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Entity with RUC ${ruc} not found`,
        });
      }
      return {
        idEntity: entity.id_entity,
        ruc: entity.ruc,
        name: entity.name,
        email: entity.email,
        cellphone: entity.cellphone,
        telephone: entity.telephone,
        address: entity.address,
        description: entity.description!,
        createdAt: entity.created_at,
        updatedAt: entity.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<EntityResponse[]> {
    try {
      const entities = await this.prismaService.entity.findMany();
      if (!entities || entities.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No entities found',
        });
      }
      return entities.map((entity) => ({
        idEntity: entity.id_entity,
        ruc: entity.ruc,
        name: entity.name,
        email: entity.email,
        cellphone: entity.cellphone,
        telephone: entity.telephone,
        address: entity.address,
        description: entity.description!,
        createdAt: entity.created_at,
        updatedAt: entity.updated_at,
      }));
    } catch (error) {
      throw error;
    }
  }

  async create(entity: EntityModel): Promise<EntityResponse> {
    try {
      const entityCreated = await this.prismaService.entity.create({
        data: {
          ruc: entity.getRuc(),
          name: entity.getName(),
          email: entity.getEmail(),
          cellphone: entity.getCellphone(),
          telephone: entity.getTelephone(),
          address: entity.getAddress(),
          description: entity.getDescription(),
          created_at: entity.getCreatedAt(),
          updated_at: entity.getUpdatedAt(),
        },
      });
      return {
        idEntity: entityCreated.id_entity,
        ruc: entityCreated.ruc,
        name: entityCreated.name,
        email: entityCreated.email,
        cellphone: entityCreated.cellphone,
        telephone: entityCreated.telephone,
        address: entityCreated.address,
        description: entityCreated.description!,
        createdAt: entityCreated.created_at,
        updatedAt: entityCreated.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(idEntity: number, entity: EntityModel): Promise<EntityResponse> {
    try {
      const existingEntity = await this.prismaService.entity.findUnique({
        where: { id_entity: idEntity },
      });
      if (!existingEntity) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Entity with ID ${idEntity} not found`,
        });
      }

      const updatedEntity = await this.prismaService.entity.update({
        where: { id_entity: idEntity },
        data: {
          ruc: entity.getRuc(),
          name: entity.getName(),
          email: entity.getEmail(),
          cellphone: entity.getCellphone(),
          telephone: entity.getTelephone(),
          address: entity.getAddress(),
          description: entity.getDescription(),
          updated_at: new Date(),
        },
      });

      return {
        idEntity: updatedEntity.id_entity,
        ruc: updatedEntity.ruc,
        name: updatedEntity.name,
        email: updatedEntity.email,
        cellphone: updatedEntity.cellphone,
        telephone: updatedEntity.telephone,
        address: updatedEntity.address,
        description: updatedEntity.description!,
        createdAt: updatedEntity.created_at,
        updatedAt: updatedEntity.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(idEntity: number): Promise<boolean> {
    try {
      const deletedEntity = await this.prismaService.entity.delete({
        where: { id_entity: idEntity },
      });
      return !!deletedEntity;
    } catch (error) {
      throw error;
    }
  }

  async existsById(idEntity: number): Promise<boolean> {
    try {
      const entity = await this.prismaService.entity.findUnique({
        where: { id_entity: idEntity },
      });
      return !!entity;
    } catch (error) {
      throw error;
    }
  }

  async existsByRuc(ruc: string): Promise<boolean> {
    try {
      const entity = await this.prismaService.entity.findFirst({
        where: { ruc: ruc },
      });
      return !!entity;
    } catch (error) {
      throw error;
    }
  }
}
