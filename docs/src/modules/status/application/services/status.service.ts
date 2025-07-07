import { Inject, Injectable } from '@nestjs/common';
import { InterfaceStatusUseCase } from '../usecases/status.use-case.interface';
import { InterfaceStatusRepository } from '../../domain/contracts/status.interface.repository';
import { CreateStatusRequest } from '../../domain/schemas/dto/request/create.status.request';
import { StatusResponse } from '../../domain/schemas/dto/response/status.response';
import { validateFields } from 'src/shared/utils/validators/fields.validators';
import { RpcException } from '@nestjs/microservices';
import { statusCode } from 'src/settings/environments/status-code';
import { TypeStatusModel } from 'src/modules/type-status/domain/schemas/model/type-status.model';
import { InterfaceTypeStatusRepository } from 'src/modules/type-status/domain/contracts/type-status.interface.repository';
import { StatusMapper } from '../mappers/status.mapper';
import { UpdateStatusRequest } from '../../domain/schemas/dto/request/update.status.request';
import { StatusModel } from '../../domain/schemas/model/status.model';

@Injectable()
export class StatusUseCaseService implements InterfaceStatusUseCase {
  constructor(
    @Inject('StatusRepository')
    private readonly statusRepository: InterfaceStatusRepository,
    @Inject('TypeStatusRepository')
    private readonly typeStatusRepository: InterfaceTypeStatusRepository,
  ) {}

  async create(status: CreateStatusRequest): Promise<StatusResponse | null> {
    try {
      const requiredFields: string[] = ['name', 'description', 'idTypeStatus'];
      const missingFieldsMessages: string[] = validateFields(
        status,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const typeStatus = await this.typeStatusRepository.findTypeStatusById(
        status.idTypeStatus,
      );

      if (!typeStatus) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type status with ID ${status.idTypeStatus} not found.`,
        });
      }

      const typeStatusModel: TypeStatusModel = new TypeStatusModel(
        typeStatus.idTypeStatus,
        typeStatus.name,
        typeStatus.description,
      );

      const statusModel = StatusMapper.fromCreateStatusRequestToStatusModel(
        status,
        typeStatusModel,
      );

      const createdStatus = await this.statusRepository.create(statusModel);
      if (!createdStatus) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to create status.',
        });
      }

      return createdStatus;
    } catch (error) {
      throw error;
    }
  }

  async update(
    idStatus: number,
    status: UpdateStatusRequest,
  ): Promise<StatusResponse | null> {
    try {
      if (!idStatus) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Status ID is required.',
        });
      }

      const requiredFields: string[] = ['name', 'description', 'idTypeStatus'];
      const missingFieldsMessages: string[] = validateFields(
        status,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const existingStatus = await this.statusRepository.existsById(idStatus);
      if (!existingStatus) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Status with ID ${idStatus} not found.`,
        });
      }

      const typeStatus = await this.typeStatusRepository.findTypeStatusById(
        status.idTypeStatus,
      );

      if (!typeStatus) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type status with ID ${status.idTypeStatus} not found.`,
        });
      }

      const typeStatusModel: TypeStatusModel = new TypeStatusModel(
        typeStatus.idTypeStatus,
        typeStatus.name,
        typeStatus.description,
      );

      const statusModel: StatusModel =
        StatusMapper.fromUpdateStatusRequestToStatusModel(
          idStatus,
          status,
          typeStatusModel,
        );

      const updatedStatus = await this.statusRepository.update(
        idStatus,
        statusModel,
      );
      if (!updatedStatus) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to update status.',
        });
      }

      return updatedStatus;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<StatusResponse[]> {
    try {
      const statuses = await this.statusRepository.findAll();
      if (!statuses || statuses.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No statuses found.',
        });
      }
      return statuses;
    } catch (error) {
      throw error;
    }
  }

  async findById(idStatus: number): Promise<StatusResponse | null> {
    try {
      if (!idStatus) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Status ID is required.',
        });
      }

      const status = await this.statusRepository.findById(idStatus);
      if (!status) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Status with ID ${idStatus} not found.`,
        });
      }
      return status;
    } catch (error) {
      throw error;
    }
  }

  async findByName(name: string): Promise<StatusResponse | null> {
    try {
      if (!name || name.trim() === '') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Status name is required.',
        });
      }

      const status = await this.statusRepository.findByName(name);
      if (!status) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Status with name ${name} not found.`,
        });
      }
      return status;
    } catch (error) {
      throw error;
    }
  }

  async existsById(idStatus: number): Promise<boolean> {
    return this.statusRepository.existsById(idStatus);
  }

  async delete(idStatus: number): Promise<boolean> {
    try {
      if (!idStatus) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Status ID is required.',
        });
      }

      const existingStatus = await this.statusRepository.findById(idStatus);
      if (!existingStatus) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Status with ID ${idStatus} not found.`,
        });
      }

      const deleted = await this.statusRepository.delete(idStatus);
      if (!deleted) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to delete status.',
        });
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}
