import { Injectable, Logger } from '@nestjs/common';
import { SendNotificationUseCaseServiceInterface } from '../usecases/send-notification.use-case.service.interface';
import * as twilio from 'twilio';
import { environments } from 'src/settings/environments/environments';
import { delay } from 'src/shared/utils/delay/time.delay';
import { SendNotificationRequest } from '../../domain/schemas/dto/request/send-notification.request';

@Injectable()
export class SendSMSService implements SendNotificationUseCaseServiceInterface {
  private readonly twilioClient: twilio.Twilio;
  private readonly logger = new Logger(SendSMSService.name);
  constructor() {
    this.twilioClient = twilio(
      environments.twilioAccountSID,
      environments.twilioAuthToken,
    );
  }

  async sendNotification(
    sentNotificationRequest: SendNotificationRequest,
  ): Promise<string | null> {
    let attempt = 0;
    const maxAttempts = 3;
    const retryDelay = 3000;
    while (attempt < maxAttempts) {
      try {
        const message = await this.twilioClient.messages.create({
          body: sentNotificationRequest.message,
          to: sentNotificationRequest.phone,
          from: environments.twilioPhoneNumber,
        });
        if (message.sid) {
          this.logger.log(
            `Message sent by SMS successfully to: ${sentNotificationRequest.phone}`,
          );
          return `Message sent by SMS successfully to: ${sentNotificationRequest.phone}`;
        } else {
          this.logger.error(
            `Error sending message SMS to: ${sentNotificationRequest.phone}`,
          );
          return null;
        }
      } catch (error) {
        if (error.status === 429 && error.code === 63038) {
          this.logger.error('Twilio daily message limit reached. Retrying...');
          attempt++;
          if (attempt < maxAttempts) {
            await delay(retryDelay);
          } else {
            throw Error(
              `Notification was not sent. Twilio daily message limit reached, please try again later. (SMS)`,
            );
          }
        } else {
          this.logger.error(`Error sending message by SMS: ${error.message}`);
          return error;
        }
        return null;
      }
    }
    return null;
  }
}
