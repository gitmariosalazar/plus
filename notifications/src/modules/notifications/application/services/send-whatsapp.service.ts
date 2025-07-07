import { Injectable, Logger } from '@nestjs/common';
import { SendNotificationUseCaseServiceInterface } from '../usecases/send-notification.use-case.service.interface';
import * as twilio from 'twilio';
import { environments } from 'src/settings/environments/environments';
import { SendNotificationRequest } from '../../domain/schemas/dto/request/send-notification.request';

@Injectable()
export class SendWhatsappService
  implements SendNotificationUseCaseServiceInterface
{
  private readonly twilioClient: twilio.Twilio;
  private readonly logger = new Logger(SendWhatsappService.name);

  constructor() {
    this.twilioClient = twilio(
      environments.twilioAccountSID,
      environments.twilioAuthToken,
    );
  }

  async sendNotification(
    sentNotificationRequest: SendNotificationRequest,
  ): Promise<string | null> {
    if (!sentNotificationRequest?.message || !sentNotificationRequest?.phone) {
      this.logger.error('Error: The message or phone number is invalid');
      return 'Error: The message or phone number is invalid';
    }

    let attempt = 0;
    const maxAttempts = 3;
    const retryDelay = 3000;

    while (attempt < maxAttempts) {
      try {
        const message = await this.twilioClient.messages.create({
          from: `whatsapp:${environments.twilioWhatsappNumber}`,
          body: sentNotificationRequest.message,
          to: `whatsapp:${sentNotificationRequest.phone}`,
        });

        if (message.status === 'queued' || message.status === 'sent') {
          this.logger.log(
            `Message sent by WhatsApp to: ${sentNotificationRequest.phone}, status: ${message.status}`,
          );
          return `Message sent by WhatsApp to: ${sentNotificationRequest.phone}, status: ${message.status}`;
        } else {
          this.logger.error(
            `Error sending message by WhatsApp to: ${sentNotificationRequest.phone}, status: ${message.status}`,
          );
          return `Error sending message by WhatsApp to: ${sentNotificationRequest.phone}, status: ${message.status}`;
        }
      } catch (error) {
        attempt++;
        if (error.status === 429 && error.code === 63038) {
          this.logger.warn(
            `Twilio daily message limit reached. Attempt ${attempt} of ${maxAttempts}. Retrying in ${retryDelay}ms...`,
          );
          if (attempt < maxAttempts) {
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
            continue;
          } else {
            this.logger.error(
              'Twilio daily message limit reached, please try again later.',
            );
            return `Error: Twilio daily message limit reached, please try again later. (WhatsApp)`;
          }
        } else {
          this.logger.error(
            `Error sending message by WhatsApp: ${error.message}`,
          );
          return `Error sending message by WhatsApp: ${error.message}`;
        }
      }
    }

    this.logger.error(
      'Failed to send WhatsApp message after maximum attempts.',
    );
    return 'Error: Failed to send WhatsApp message after maximum attempts.';
  }
}
