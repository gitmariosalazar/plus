import { Inject, Injectable } from '@nestjs/common';
import { InterfaceTypeStatusUseCases } from '../usecases/type-status.use-cases.interface';
import { InterfaceTypeStatusRepository } from '../../domain/contracts/type-status.interface.repository';
import { CreateTypeStatusRequest } from '../../domain/schemas/dto/request/create.type-status.request';
import { TypeStatusResponse } from '../../domain/schemas/dto/response/type-status.response';
import { TypeStatusMapper } from '../mappers/type-status.mapper';
import { UpdateTypeStatusRequest } from '../../domain/schemas/dto/request/update.type-status.request';
import { validateFields } from 'src/shared/utils/validators/fields.validators';
import { RpcException } from '@nestjs/microservices';
import { statusCode } from 'src/settings/environments/status-code';

@Injectable()
export class TypeStatusUseCaseService implements InterfaceTypeStatusUseCases {
  constructor(
    @Inject('TypeStatusRepository')
    private readonly typeStatusRepository: InterfaceTypeStatusRepository,
  ) {}

  async createTypeStatus(
    createTypeStatusRequest: CreateTypeStatusRequest,
  ): Promise<TypeStatusResponse | null> {
    try {
      const requiredFields: string[] = ['name', 'description'];

      const missingFieldsMessages: string[] = validateFields(
        createTypeStatusRequest,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const typeStatusModel =
        TypeStatusMapper.fromCreateTypeStatusRequestToModel(
          createTypeStatusRequest,
        );
      return this.typeStatusRepository.createTypeStatus(typeStatusModel);
    } catch (error) {
      throw error;
    }
  }

  async updateTypeStatus(
    idTypeStatus: number,
    updateTypeStatusRequest: UpdateTypeStatusRequest,
  ): Promise<TypeStatusResponse | null> {
    try {
      if (!idTypeStatus || typeof idTypeStatus !== 'number') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'ID must be a valid number',
        });
      }
      const requiredFields: string[] = ['name', 'description'];

      const missingFieldsMessages: string[] = validateFields(
        updateTypeStatusRequest,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const typeStatusModel =
        TypeStatusMapper.fromUpdateTypeStatusRequestToModel(
          updateTypeStatusRequest,
        );
      return this.typeStatusRepository.updateTypeStatus(
        idTypeStatus,
        typeStatusModel,
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteTypeStatus(idTypeStatus: number): Promise<boolean> {
    try {
      if (!idTypeStatus || typeof idTypeStatus !== 'number') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'ID must be a valid number',
        });
      }
      const deleted =
        await this.typeStatusRepository.deleteTypeStatus(idTypeStatus);
      if (!deleted) {
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
      if (!idTypeStatus || typeof idTypeStatus !== 'number') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'ID must be a valid number',
        });
      }
      const typeStatus =
        await this.typeStatusRepository.findTypeStatusById(idTypeStatus);
      if (!typeStatus) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type status with ID ${idTypeStatus} not found`,
        });
      }
      return typeStatus;
    } catch (error) {
      throw error;
    }
  }

  async findAllTypeStatus(): Promise<TypeStatusResponse[]> {
    try {
      const typeStatuses = await this.typeStatusRepository.findAllTypeStatus();
      if (!typeStatuses || typeStatuses.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No type statuses found',
        });
      }
      return typeStatuses;
    } catch (error) {
      throw error;
    }
  }

  async findTypeStatusByName(name: string): Promise<TypeStatusResponse | null> {
    try {
      if (!name || typeof name !== 'string' || name.trim() === '') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Name must be a non-empty string',
        });
      }
      const typeStatus =
        await this.typeStatusRepository.findTypeStatusByName(name);
      if (!typeStatus) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type status with name ${name} not found`,
        });
      }
      return typeStatus;
    } catch (error) {
      throw error;
    }
  }
}
