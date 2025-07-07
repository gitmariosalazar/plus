import { Injectable } from '@nestjs/common';
import { connect } from 'http2';
import { InterfaceNotificationRepository } from 'src/modules/notifications/domain/contracts/notification.interface.repository';
import { NotificationResponse } from 'src/modules/notifications/domain/schemas/dto/response/notification.response';
import { NotificationModel } from 'src/modules/notifications/domain/schemas/model/notification.model';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { PrismaNotificationAdapter } from '../adapters/prisma.notification.adapter';
import { LogsNotificationsResponse } from 'src/modules/notifications/domain/schemas/dto/response/logs-notifications.response';
import { LogsNotificationsModel } from 'src/modules/notifications/domain/schemas/model/logs-notifications.model';

@Injectable()
export class PrismaNotificationPersistence
  implements InterfaceNotificationRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async sendAndCreateNotification(
    notification: LogsNotificationsModel,
  ): Promise<LogsNotificationsResponse | null> {
    try {
      const createdNotification =
        await this.prismaService.logsNotifications.create({
          data: {
            log: notification.getLog(),
            message: notification.getMessage(),
            subject: notification.getSubject(),
            phone: notification.getPhone(),
            email: notification.getEmail(),
            module: notification.getModule(),
            event_type: notification.getEventType(),
            user_id: notification.getUserId(),
            user_email: notification.getUserEmail(),
            ip_address: notification.getIpAddress(),
            user_agent: notification.getUserAgent(),
            status_code: notification.getStatusCode(),
            kafka_topic: notification.getKafkaTopic(),
            correlation_id: notification.getCorrelationId(),
          },
        });

      if (!createdNotification) {
        return null;
      }

      return PrismaNotificationAdapter.fromPrismaLogsNotificationsToLogsNotificationsResponse(
        createdNotification,
      );
    } catch (error) {
      throw error;
    }
  }

  async create(
    notification: NotificationModel,
  ): Promise<NotificationResponse | null> {
    try {
      const createdNotification = await this.prismaService.notification.create({
        data: {
          email: notification.getEmail(),
          phone: notification.getPhone(),
          subject: notification.getSubject(),
          message: notification.getMessage(),
          type_notification: {
            connect: {
              id_type_notification: notification
                .getTypeNotification()
                .getIdTypeNotification(),
            },
          },
          attempts: notification.getAttempts(),
          sent_at: notification.getSentAt(),
          process: {
            connect: {
              id_process: notification.getProcessCode(),
            },
          },
          priority: {
            connect: {
              id_priority: notification.getPriority().getIdPriority(),
            },
          },
          status: {
            connect: {
              id_status: notification.getIdStatus(),
            },
          },
        },
        include: {
          type_notification: true,
          priority: true,
        },
      });

      if (!createdNotification) {
        return null;
      }

      return PrismaNotificationAdapter.fromPrismaNotificationWithRelationsToNotificationResponse(
        createdNotification,
      );
    } catch (error) {
      throw error;
    }
  }

  async update(
    idNotifications: number,
    notification: NotificationModel,
  ): Promise<NotificationResponse | null> {
    try {
      const updatedNotification = await this.prismaService.notification.update({
        where: { id_notifications: idNotifications },
        data: {
          email: notification.getEmail(),
          phone: notification.getPhone(),
          subject: notification.getSubject(),
          message: notification.getMessage(),
          type_notification: {
            connect: {
              id_type_notification: notification
                .getTypeNotification()
                .getIdTypeNotification(),
            },
          },
          attempts: notification.getAttempts(),
          sent_at: notification.getSentAt(),
          process: {
            connect: {
              id_process: notification.getProcessCode(),
            },
          },
          priority: {
            connect: {
              id_priority: notification.getPriority().getIdPriority(),
            },
          },
        },
        include: {
          type_notification: true,
          priority: true,
        },
      });

      return PrismaNotificationAdapter.fromPrismaNotificationWithRelationsToNotificationResponse(
        updatedNotification,
      );
    } catch (error) {
      throw error;
    }
  }

  async findById(
    idNotifications: number,
  ): Promise<NotificationResponse | null> {
    try {
      const notification = await this.prismaService.notification.findUnique({
        where: { id_notifications: idNotifications },
        include: {
          type_notification: true,
          priority: true,
        },
      });

      if (!notification) {
        return null;
      }
      return PrismaNotificationAdapter.fromPrismaNotificationWithRelationsToNotificationResponse(
        notification,
      );
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<NotificationResponse[]> {
    try {
      const notification = await this.prismaService.notification.findMany({
        where: { email },
        include: {
          type_notification: true,
          priority: true,
        },
      });

      if (!notification) {
        return [];
      }

      return notification.map((notification) =>
        PrismaNotificationAdapter.fromPrismaNotificationWithRelationsToNotificationResponse(
          notification,
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<NotificationResponse[]> {
    try {
      const notifications = await this.prismaService.notification.findMany({
        include: {
          type_notification: true,
          priority: true,
        },
      });

      return notifications.map((notification) =>
        PrismaNotificationAdapter.fromPrismaNotificationWithRelationsToNotificationResponse(
          notification,
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  async delete(idNotifications: number): Promise<boolean> {
    try {
      const deleted = await this.prismaService.notification.delete({
        where: { id_notifications: idNotifications },
      });
      return !!deleted;
    } catch (error) {
      throw error;
    }
  }

  async existsById(idNotifications: number): Promise<boolean> {
    try {
      const notification = await this.prismaService.notification.findUnique({
        where: { id_notifications: idNotifications },
      });
      return !!notification;
    } catch (error) {
      throw error;
    }
  }
}
