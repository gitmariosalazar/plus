import { Inject, Injectable } from '@nestjs/common';
import { InterfaceTypeNotificationUseCase } from '../usecases/type-notification.use-case.interface';
import { InterfaceTypeNotificationRepository } from '../../domain/contracts/type-notification.interface.repository';
import { CreateTypeNotificationRequest } from '../../domain/schemas/dto/request/create.type-notification.request';
import { TypeNotificationResponse } from '../../domain/schemas/dto/response/type-notification.response';
import { validateFields } from 'src/shared/utils/validators/fields.validators';
import { RpcException } from '@nestjs/microservices';
import { statusCode } from 'src/settings/environments/status-code';
import { TypeNotificationMapper } from '../mappers/type-notification.mapper';
import { UpdateTypeNotificationRequest } from '../../domain/schemas/dto/request/update.type-notification.request';

@Injectable()
export class TypeNotificationUseCaseService
  implements InterfaceTypeNotificationUseCase
{
  constructor(
    @Inject('TypeNotificationRepository')
    private readonly typeNotificationRepository: InterfaceTypeNotificationRepository,
  ) {}

  async existsById(idTypeNotification: number): Promise<boolean> {
    return this.typeNotificationRepository.existsById(idTypeNotification);
  }

  async existsByName(name: string): Promise<boolean> {
    return this.typeNotificationRepository.existsByName(name);
  }

  async create(
    typeNotification: CreateTypeNotificationRequest,
  ): Promise<TypeNotificationResponse> {
    try {
      const requiredFields: string[] = ['name', 'description'];

      const missingFieldsMessages: string[] = validateFields(
        typeNotification,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const existsByName = await this.typeNotificationRepository.existsByName(
        typeNotification.name,
      );
      if (existsByName) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: `Type notification with name ${typeNotification.name} already exists.`,
        });
      }

      const typeNotificationModel =
        TypeNotificationMapper.fromCreateTypeNotificationRequestToTypeNotificationModel(
          typeNotification,
        );
      const createdTypeNotification =
        await this.typeNotificationRepository.create(typeNotificationModel);
      if (!createdTypeNotification) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to create type notification.',
        });
      }
      return createdTypeNotification;
    } catch (error) {
      throw error;
    }
  }

  async update(
    idTypeNotification: number,
    typeNotification: UpdateTypeNotificationRequest,
  ): Promise<TypeNotificationResponse | null> {
    try {
      if (!idTypeNotification || idTypeNotification <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid type notification ID or ID not provided.',
        });
      }

      const requiredFields: string[] = ['name', 'description'];

      const missingFieldsMessages: string[] = validateFields(
        typeNotification,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const existsById =
        await this.typeNotificationRepository.existsById(idTypeNotification);
      if (!existsById) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type notification with id ${idTypeNotification} not found.`,
        });
      }

      const existsByName = await this.typeNotificationRepository.existsByName(
        typeNotification.name,
      );
      if (existsByName) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: `Type notification with name ${typeNotification.name} already exists.`,
        });
      }

      const typeNotificationModel =
        TypeNotificationMapper.fromUpdateTypeNotificationRequestToTypeNotificationModel(
          typeNotification,
        );
      const updatedTypeNotification =
        await this.typeNotificationRepository.update(
          idTypeNotification,
          typeNotificationModel,
        );
      if (!updatedTypeNotification) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to update type notification.',
        });
      }
      return updatedTypeNotification;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<TypeNotificationResponse[]> {
    try {
      const typeNotifications = await this.typeNotificationRepository.findAll();
      if (!typeNotifications || typeNotifications.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No type notifications found.',
        });
      }
      return typeNotifications;
    } catch (error) {
      throw error;
    }
  }

  async findById(
    idTypeNotification: number,
  ): Promise<TypeNotificationResponse | null> {
    try {
      if (!idTypeNotification || idTypeNotification <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid type notification ID or ID not provided.',
        });
      }

      const typeNotification =
        await this.typeNotificationRepository.findById(idTypeNotification);
      if (!typeNotification) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type notification with id ${idTypeNotification} not found.`,
        });
      }
      return typeNotification;
    } catch (error) {
      throw error;
    }
  }

  async delete(idTypeNotification: number): Promise<boolean> {
    try {
      if (!idTypeNotification || idTypeNotification <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid type notification ID or ID not provided.',
        });
      }

      const existsById =
        await this.typeNotificationRepository.existsById(idTypeNotification);
      if (!existsById) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type notification with id ${idTypeNotification} not found.`,
        });
      }

      const deleted =
        await this.typeNotificationRepository.delete(idTypeNotification);
      if (!deleted) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to delete type notification.',
        });
      }
      return deleted;
    } catch (error) {
      throw error;
    }
  }

  async findByName(name: string): Promise<TypeNotificationResponse | null> {
    try {
      if (!name || name.trim() === '') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Type notification name is required.',
        });
      }

      const existsByName =
        await this.typeNotificationRepository.existsByName(name);
      if (!existsByName) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type notification with name ${name} not found.`,
        });
      }

      const typeNotification =
        await this.typeNotificationRepository.findByName(name);
      if (!typeNotification) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type notification with name ${name} not found.`,
        });
      }
      return typeNotification;
    } catch (error) {
      throw error;
    }
  }
}
