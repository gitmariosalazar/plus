import { Inject, Injectable } from '@nestjs/common';
import { InterfaceEntityUseCase } from '../usecases/entity.use-case.interface';
import { InterfaceEntityRepository } from '../../domain/contracts/entity.interface.repository';
import { CreateEntityRequest } from '../../domain/schemas/dto/request/create.entity.request';
import { EntityResponse } from '../../domain/schemas/dto/response/entity.response';
import { validateFields } from 'src/shared/utils/validators/fields.validators';
import { RpcException } from '@nestjs/microservices';
import { statusCode } from 'src/settings/environments/status-code';
import { EntityMapper } from '../mappers/entity.mapper';
import { UpdateEntityRequest } from '../../domain/schemas/dto/request/update.entity.request';

@Injectable()
export class EntityUseCaseService implements InterfaceEntityUseCase {
  constructor(
    @Inject('EntityRepository')
    private readonly entityRepository: InterfaceEntityRepository,
  ) {}

  async create(entity: CreateEntityRequest): Promise<EntityResponse> {
    try {
      const requiredFields: string[] = [
        'ruc',
        'name',
        'email',
        'cellphone',
        'telephone',
        'address',
        'description',
      ];

      const missingFieldsMessages: string[] = validateFields(
        entity,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const existingEntity = await this.entityRepository.existsByRuc(
        entity.ruc,
      );
      if (existingEntity) {
        throw new RpcException({
          statusCode: statusCode.CONFLICT,
          message: `Entity with RUC ${entity.ruc} already exists`,
        });
      }
      const entityModel = EntityMapper.fromCreateEntityRequestToModel(entity);

      const createdEntity = await this.entityRepository.create(entityModel);
      return createdEntity;
    } catch (error) {
      throw error;
    }
  }

  async update(
    idEntity: number,
    entity: UpdateEntityRequest,
  ): Promise<EntityResponse> {
    try {
      if (!idEntity || idEntity <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid entity ID or not provided',
        });
      }

      const existingEntity = await this.entityRepository.findById(idEntity);
      if (!existingEntity) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Entity with ID ${idEntity} not found`,
        });
      }

      const requiredFields: string[] = [
        'ruc',
        'name',
        'email',
        'cellphone',
        'telephone',
        'address',
        'description',
      ];

      const missingFieldsMessages: string[] = validateFields(
        entity,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const entityModel = EntityMapper.fromUpdateEntityRequestToModel(
        idEntity,
        entity,
      );

      const updatedEntity = await this.entityRepository.update(
        idEntity,
        entityModel,
      );
      return updatedEntity;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<EntityResponse[]> {
    try {
      const entities = await this.entityRepository.findAll();
      if (!entities || entities.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No entities found',
        });
      }
      return entities;
    } catch (error) {
      throw error;
    }
  }

  async findById(idEntity: number): Promise<EntityResponse | null> {
    try {
      if (!idEntity || idEntity <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid entity ID or not provided',
        });
      }
      const entity = await this.entityRepository.findById(idEntity);
      if (!entity) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Entity with ID ${idEntity} not found`,
        });
      }
      return entity;
    } catch (error) {
      throw error;
    }
  }

  async findByRuc(ruc: string): Promise<EntityResponse | null> {
    try {
      if (!ruc || ruc.trim() === '') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'RUC is required',
        });
      }
      const entity = await this.entityRepository.findByRuc(ruc);
      if (!entity) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Entity with RUC ${ruc} not found`,
        });
      }
      return entity;
    } catch (error) {
      throw error;
    }
  }

  async existsById(idEntity: number): Promise<boolean> {
    return this.entityRepository.existsById(idEntity);
  }

  async existsByRuc(ruc: string): Promise<boolean> {
    return this.entityRepository.existsByRuc(ruc);
  }

  async delete(idEntity: number): Promise<boolean> {
    try {
      const existingEntity = await this.entityRepository.findById(idEntity);
      if (!existingEntity) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Entity with ID ${idEntity} not found`,
        });
      }
      const deleted = await this.entityRepository.delete(idEntity);
      if (!deleted) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: `Failed to delete entity with ID ${idEntity}`,
        });
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}
