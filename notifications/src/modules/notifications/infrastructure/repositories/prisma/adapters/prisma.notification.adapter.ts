import { LogsNotifications, Prisma } from '@prisma/client';
import { LogsNotificationsResponse } from 'src/modules/notifications/domain/schemas/dto/response/logs-notifications.response';
import { NotificationResponse } from 'src/modules/notifications/domain/schemas/dto/response/notification.response';
import { environments } from 'src/settings/environments/environments';

type NotificationWithRelations = Prisma.NotificationGetPayload<{
  include: {
    type_notification: true;
    priority: true;
  };
}>;

export class PrismaNotificationAdapter {
  static fromPrismaLogsNotificationsToLogsNotificationsResponse(
    notification: LogsNotifications,
  ): LogsNotificationsResponse {
    return {
      idLogsNotifications: notification.id_logs_notification,
      log: notification.log,
      message: notification.message,
      subject: notification.subject,
      phone: notification.phone || '+593994532438',
      email: notification.email || environments.emailUsername,
      module: notification.module,
      eventType: notification.event_type,
      userId: notification.user_id || undefined,
      userEmail: notification.user_email || undefined,
      ipAddress: notification.ip_address || undefined,
      userAgent: notification.user_agent || undefined,
      statusCode: notification.status_code || undefined,
      kafkaTopic: notification.kafka_topic || undefined,
      correlationId: notification.correlation_id || undefined,
      createdAt: notification.created_at || undefined,
      updatedAt: notification.updated_at || undefined,
    };
  }

  public static fromPrismaNotificationWithRelationsToNotificationResponse(
    notification: NotificationWithRelations,
  ): NotificationResponse {
    return {
      idNotifications: notification.id_notifications,
      email: notification.email!,
      phone: notification.phone!,
      subject: notification.subject!,
      message: notification.message,
      typeNotification: {
        idTypeNotification: notification.type_notification.id_type_notification,
        name: notification.type_notification.name,
        description: notification.type_notification.description!,
      },
      attempts: notification.attempts,
      sentAt: notification.sent_at || undefined,
      processCode: notification.process_code,
      priority: {
        idPriority: notification.priority.id_priority,
        name: notification.priority.name,
        description: notification.priority.description!,
      },
      idStatus: notification.id_status,
      createdAt: notification.created_at || undefined,
      updatedAt: notification.updated_at || undefined,
    };
  }
}
