import { TypeNotificationModel } from 'src/modules/type-notification/domain/schemas/model/type-notification.model';
import { CreateNotificationRequest } from '../../domain/schemas/dto/request/create.notification.request';
import { NotificationModel } from '../../domain/schemas/model/notification.model';
import { PriorityModel } from 'src/modules/priority/domain/schemas/model/priority.model';
import { UpdateNotificationRequest } from '../../domain/schemas/dto/request/update.notification.request';
import { NotificationResponse } from '../../domain/schemas/dto/response/notification.response';
import { CreateLogsNotificationsRequest } from '../../domain/schemas/dto/request/create.logs-notifications.request';
import { LogsNotificationsModel } from '../../domain/schemas/model/logs-notifications.model';

export class NotificationMapper {
  static fromCreateLogsNotificationsRequestToModel(
    notificationRequest: CreateLogsNotificationsRequest,
  ): LogsNotificationsModel {
    return new LogsNotificationsModel(
      0,
      notificationRequest.log,
      notificationRequest.message,
      notificationRequest.subject,
      notificationRequest.phone,
      notificationRequest.email,
      notificationRequest.module,
      notificationRequest.eventType,
      notificationRequest.userId,
      notificationRequest.userEmail,
      notificationRequest.ipAddress,
      notificationRequest.userAgent,
      notificationRequest.statusCode,
      notificationRequest.kafkaTopic,
      notificationRequest.correlationId,
      new Date(), // createdAt is set to current date
      new Date(), // updatedAt is set to current date
    );
  }

  static fromCreateNotificationRequestToModel(
    notificationRequest: CreateNotificationRequest,
    typeNotification: TypeNotificationModel,
    priority: PriorityModel,
  ): NotificationModel {
    return new NotificationModel(
      0, // idNotification is not set during creation
      notificationRequest.email,
      notificationRequest.phone,
      notificationRequest.subject,
      notificationRequest.message,
      typeNotification,
      0, // attempts start at 0
      new Date(), // sentAt is null initially
      notificationRequest.processCode, // processCode is not set during creation
      priority,
      notificationRequest.idStatus, // default status ID (e.g., 'Pending')
    );
  }

  static fromUpdateNotificationRequestToModel(
    idNotification: number,
    notificationRequest: UpdateNotificationRequest,
    typeNotification: TypeNotificationModel,
    priority: PriorityModel,
  ): NotificationModel {
    return new NotificationModel(
      idNotification,
      notificationRequest.email,
      notificationRequest.phone,
      notificationRequest.subject,
      notificationRequest.message,
      typeNotification,
      notificationRequest.attempts || 0, // attempts can be updated
      notificationRequest.sentAt || new Date(), // sentAt can be updated
      notificationRequest.processCode, // processCode can be updated
      priority,
      notificationRequest.idStatus, // status can be updated
    );
  }

  static fromNotificationResponseToModel(
    notificationResponse: NotificationResponse,
  ): NotificationModel {
    return new NotificationModel(
      notificationResponse.idNotifications,
      notificationResponse.email,
      notificationResponse.phone,
      notificationResponse.subject,
      notificationResponse.message,
      new TypeNotificationModel(
        notificationResponse.typeNotification.idTypeNotification,
        notificationResponse.typeNotification.name,
        notificationResponse.typeNotification.description,
        notificationResponse.typeNotification.createdAt || new Date(),
        notificationResponse.typeNotification.updatedAt || new Date(),
      ),
      notificationResponse.attempts || 0,
      notificationResponse.sentAt || new Date(),
      notificationResponse.processCode,
      new PriorityModel(
        notificationResponse.priority.idPriority,
        notificationResponse.priority.name,
        notificationResponse.priority.description,
        notificationResponse.priority.createdAt || new Date(),
        notificationResponse.priority.updatedAt || new Date(),
      ),
      notificationResponse.idStatus,
      notificationResponse.createdAt || new Date(),
      notificationResponse.updatedAt || new Date(),
    );
  }
}
