import { SendNotificationRequest } from '../../domain/schemas/dto/request/send-notification.request';

export interface SendNotificationUseCaseServiceInterface {
  sendNotification(
    sentNotificationRequest: SendNotificationRequest,
  ): Promise<string | null>;
}
