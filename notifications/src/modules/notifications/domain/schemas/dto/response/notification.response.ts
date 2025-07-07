import { PriorityResponse } from 'src/modules/priority/domain/schemas/dto/response/priority.response';
import { TypeNotificationResponse } from 'src/modules/type-notification/domain/schemas/dto/response/type-notification.response';

export interface NotificationResponse {
  idNotifications: number;
  email: string;
  phone: string;
  subject: string;
  message: string;
  typeNotification: TypeNotificationResponse;
  attempts?: number;
  sentAt?: Date;
  processCode: number;
  priority: PriorityResponse;
  idStatus: number;
  logs_notification?: any;
  createdAt?: Date;
  updatedAt?: Date;
}
