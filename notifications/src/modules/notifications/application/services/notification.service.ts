import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka, ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateNotificationRequest } from '../../domain/schemas/dto/request/create.notification.request';
import { NotificationResponse } from '../../domain/schemas/dto/response/notification.response';
import { validateFields } from 'src/shared/utils/validators/fields.validators';
import { statusCode } from 'src/settings/environments/status-code';
import { NotificationMapper } from '../mappers/notification.mapper';
import { InterfaceTypeNotificationRepository } from 'src/modules/type-notification/domain/contracts/type-notification.interface.repository';
import { InterfacePriorityRepository } from 'src/modules/priority/domain/contracts/priority.interface.repository';
import { TypeNotificationModel } from 'src/modules/type-notification/domain/schemas/model/type-notification.model';
import { TypeNotificationMapper } from 'src/modules/type-notification/application/mappers/type-notification.mapper';
import { PriorityModel } from 'src/modules/priority/domain/schemas/model/priority.model';
import { PriorityMapper } from 'src/modules/priority/application/mappers/priority.mapper';
import { UpdateNotificationRequest } from '../../domain/schemas/dto/request/update.notification.request';
import { InterfaceNotificationRepository } from '../../domain/contracts/notification.interface.repository';
import { InterfaceNotificationUseCase } from '../usecases/notification.use-case.interface';
import { TypeNotificationResponse } from 'src/modules/type-notification/domain/schemas/dto/response/type-notification.response';
import { environments } from 'src/settings/environments/environments';
import { firstValueFrom } from 'rxjs';
import { SendNotificationsService } from '../strategies/send-multiple-notifications.service';
import { CreateLogsNotificationsRequest } from '../../domain/schemas/dto/request/create.logs-notifications.request';
import { LogsNotificationsResponse } from '../../domain/schemas/dto/response/logs-notifications.response';

@Injectable()
export class NotificationUseCaseService
  implements InterfaceNotificationUseCase, OnModuleInit
{
  constructor(
    @Inject('NotificationRepository')
    private readonly notificationRepository: InterfaceNotificationRepository,
    @Inject('TypeNotificationRepository')
    private readonly typeNotificationRepository: InterfaceTypeNotificationRepository,
    @Inject('PriorityRepository')
    private readonly priorityRepository: InterfacePriorityRepository,
    @Inject(environments.documentsKafkaClient)
    private readonly documentsClient: ClientKafka,
    private readonly sendMultipleNotificationService: SendNotificationsService,
  ) {}

  onModuleInit() {
    this.documentsClient.subscribeToResponseOf('process.find-by-id');
    this.documentsClient.subscribeToResponseOf('status.find-by-id');
    this.documentsClient.connect().catch((error) => {
      throw new RpcException({
        statusCode: statusCode.INTERNAL_SERVER_ERROR,
        message: `Failed to connect to Kafka: ${error.message}`,
      });
    });
  }

  async sendAndCreateNotification(
    notification: CreateLogsNotificationsRequest,
  ): Promise<LogsNotificationsResponse | null> {
    try {
      const requiredFields: string[] = [
        'log',
        'message',
        'subject',
        'phone',
        'email',
        'module',
        'eventType',
        'userId',
        'userEmail',
        'ipAddress',
        'userAgent',
        'statusCode',
        'kafkaTopic',
        'correlationId',
      ];
      const missingFieldsMessages: string[] = validateFields(
        notification,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const logsNotificationModel =
        NotificationMapper.fromCreateLogsNotificationsRequestToModel(
          notification,
        );

      const logsNotificationCreated =
        await this.notificationRepository.sendAndCreateNotification(
          logsNotificationModel,
        );

      if (!logsNotificationCreated) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to create logs notification.',
        });
      }

      const sendMessage =
        await this.sendMultipleNotificationService.sendNotificationToMultipleChannels(
          {
            email: notification.email,
            phone: notification.phone,
            subject: notification.subject,
            message: notification.message,
          },
        );

      return logsNotificationCreated;
    } catch (error) {
      throw error;
    }
  }

  async create(
    notification: CreateNotificationRequest,
  ): Promise<NotificationResponse | null> {
    try {
      const requiredFields: string[] = [
        'email',
        'phone',
        'message',
        'subject',
        'idTypeNotification',
        'idPriority',
        'processCode',
        'idStatus',
      ];
      const missingFieldsMessages: string[] = validateFields(
        notification,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const typeNotification: TypeNotificationResponse | null =
        await this.typeNotificationRepository.findById(
          notification.idTypeNotification,
        );
      if (!typeNotification) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type Notification with ID ${notification.idTypeNotification} not found.`,
        });
      }

      const priority = await this.priorityRepository.findById(
        notification.idPriority,
      );

      if (!priority || !priority.idPriority) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Priority with ID ${notification.idPriority} not found.`,
        });
      }

      let process = null;
      try {
        process = await firstValueFrom(
          this.documentsClient.send('process.find-by-id', {
            idProcess: notification.processCode,
          }),
        );
      } catch (error) {
        if (error.message.includes('no matching message handler')) {
          throw new RpcException({
            statusCode: statusCode.BAD_REQUEST,
            message: `Command 'process.find-by-id' not found. Ensure the process microservice is running and the command is correctly defined.`,
          });
        }
        throw new RpcException({
          statusCode: error.statusCode || statusCode.BAD_REQUEST,
          message:
            error.message ||
            'Error while fetching process by ID from documents service.',
        });
      }

      let status = null;
      try {
        status = await firstValueFrom(
          this.documentsClient.send('status.find-by-id', {
            idStatus: notification.idStatus,
          }),
        );
      } catch (error) {
        if (error.message.includes('no matching message handler')) {
          throw new RpcException({
            statusCode: statusCode.BAD_REQUEST,
            message: `Command 'status.find-by-id' not found. Ensure the documents microservice is running and the command is correctly defined.`,
          });
        }
        throw new RpcException({
          statusCode: error.statusCode || statusCode.BAD_REQUEST,
          message:
            error.message ||
            'Error while fetching status by ID from documents service.',
        });
      }

      const typeNotificationModel: TypeNotificationModel =
        TypeNotificationMapper.fromTypeNotificationResponseToTypeNotificationModel(
          typeNotification,
        );

      const priorityModel: PriorityModel =
        PriorityMapper.fromPriorityResponseToPriorityModel(priority);

      const notificationModel =
        NotificationMapper.fromCreateNotificationRequestToModel(
          notification,
          typeNotificationModel,
          priorityModel,
        );

      const notificationCreated =
        await this.notificationRepository.create(notificationModel);

      if (!notificationCreated) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to create notification.',
        });
      }

      const sendMessage =
        await this.sendMultipleNotificationService.sendNotificationToMultipleChannels(
          {
            email: notification.email,
            phone: notification.phone,
            subject: notification.subject,
            message: notification.message,
          },
        );

      notificationCreated.logs_notification = sendMessage;

      return notificationCreated;
    } catch (error) {
      throw error;
    }
  }

  async update(
    idNotifications: number,
    notification: UpdateNotificationRequest,
  ): Promise<NotificationResponse | null> {
    try {
      if (!idNotifications || idNotifications <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid notification ID or ID not provided.',
        });
      }

      const exists =
        await this.notificationRepository.existsById(idNotifications);
      if (!exists) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Notification with ID ${idNotifications} not found.`,
        });
      }

      const requiredFields: string[] = [
        'email',
        'phone',
        'subject',
        'message',
        'idTypeNotification',
        'idPriority',
        'processCode',
        'idStatus',
      ];
      const missingFieldsMessages: string[] = validateFields(
        notification,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const typeNotification = await this.typeNotificationRepository.findById(
        notification.idTypeNotification,
      );

      if (!typeNotification) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type Notification with ID ${notification.idTypeNotification} not found.`,
        });
      }

      const priority = await this.priorityRepository.findById(
        notification.idPriority,
      );

      if (!priority) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Priority with ID ${notification.idPriority} not found.`,
        });
      }

      let process = null;
      try {
        process = await firstValueFrom(
          this.documentsClient.send('process.find-by-id', {
            idProcess: notification.processCode,
          }),
        );
      } catch (error) {
        if (error.message.includes('no matching message handler')) {
          throw new RpcException({
            statusCode: statusCode.BAD_REQUEST,
            message: `Command 'process.find-by-id' not found. Ensure the process microservice is running and the command is correctly defined.`,
          });
        }
        throw new RpcException({
          statusCode: error.statusCode || statusCode.BAD_REQUEST,
          message:
            error.message ||
            'Error while fetching process by ID from documents service.',
        });
      }

      let status = null;
      try {
        status = await firstValueFrom(
          this.documentsClient.send('status.find-by-id', {
            idStatus: notification.idStatus,
          }),
        );
      } catch (error) {
        if (error.message.includes('no matching message handler')) {
          throw new RpcException({
            statusCode: statusCode.BAD_REQUEST,
            message: `Command 'status.find-by-id' not found. Ensure the documents microservice is running and the command is correctly defined.`,
          });
        }
        throw new RpcException({
          statusCode: error.statusCode || statusCode.BAD_REQUEST,
          message:
            error.message ||
            'Error while fetching status by ID from documents service.',
        });
      }

      const typeNotificationModel: TypeNotificationModel =
        TypeNotificationMapper.fromTypeNotificationResponseToTypeNotificationModel(
          typeNotification,
        );

      const priorityModel: PriorityModel =
        PriorityMapper.fromPriorityResponseToPriorityModel(priority);

      const notificationModel =
        NotificationMapper.fromUpdateNotificationRequestToModel(
          idNotifications,
          notification,
          typeNotificationModel,
          priorityModel,
        );

      const updatedNotification = await this.notificationRepository.update(
        idNotifications,
        notificationModel,
      );

      if (!updatedNotification) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to update notification.',
        });
      }

      return updatedNotification;
    } catch (error) {
      throw error;
    }
  }

  async existsById(idNotifications: number): Promise<boolean> {
    return this.notificationRepository.existsById(idNotifications);
  }

  async findById(
    idNotifications: number,
  ): Promise<NotificationResponse | null> {
    try {
      if (!idNotifications || idNotifications <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid notification ID or ID not provided.',
        });
      }

      const exists =
        await this.notificationRepository.existsById(idNotifications);
      if (!exists) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Notification with ID ${idNotifications} not found.`,
        });
      }

      const notification =
        await this.notificationRepository.findById(idNotifications);

      if (!notification) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Notification with ID ${idNotifications} not found.`,
        });
      }

      return notification;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<NotificationResponse[]> {
    try {
      if (!email || email.trim() === '') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Email is required.',
        });
      }

      const notification = await this.notificationRepository.findByEmail(email);

      if (!notification || notification.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Notification with email ${email} not found.`,
        });
      }

      return notification;
    } catch (error) {
      throw error;
    }
  }

  async delete(idNotifications: number): Promise<boolean> {
    try {
      if (!idNotifications || idNotifications <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid notification ID or ID not provided.',
        });
      }

      const exists =
        await this.notificationRepository.existsById(idNotifications);
      if (!exists) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Notification with ID ${idNotifications} not found.`,
        });
      }

      const deleted = await this.notificationRepository.delete(idNotifications);

      if (!deleted) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to delete notification.',
        });
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<NotificationResponse[]> {
    try {
      const notifications = await this.notificationRepository.findAll();

      if (!notifications || notifications.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No notifications found.',
        });
      }

      return notifications;
    } catch (error) {
      throw error;
    }
  }
}
