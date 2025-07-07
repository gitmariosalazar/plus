import { Injectable, Logger } from '@nestjs/common';
import { SendNotificationUseCaseServiceInterface } from '../usecases/send-notification.use-case.service.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { environments } from 'src/settings/environments/environments';
import { SendNotificationRequest } from '../../domain/schemas/dto/request/send-notification.request';
import { SendNotificationResponse } from '../../domain/schemas/dto/response/send-notification.response';

@Injectable()
export class SendEmailService
  implements SendNotificationUseCaseServiceInterface
{
  private readonly logger = new Logger(SendEmailService.name);
  constructor(private readonly mailerService: MailerService) {}

  async sendNotification(
    sentNotificationRequest: SendNotificationRequest,
  ): Promise<string | null> {
    try {
      const mailOptions = {
        from: `"No Reply" <${environments.emailUsername}>`,
        to: sentNotificationRequest.email,
        subject: sentNotificationRequest.subject,
        text: sentNotificationRequest.message,
        html: `<b>${sentNotificationRequest.message}</b>`,
      };
      await this.mailerService.sendMail(mailOptions);
      this.logger.log(
        `Send email to: ${sentNotificationRequest.email} was successful`,
      );
      return `Send email to: ${sentNotificationRequest.email} was successful`;
    } catch (error) {
      if (
        (error.response && error.response.includes('Invalid email')) ||
        error.response.includes('Quota exceeded')
      ) {
        this.logger.error(
          `Email or Quota exceeded error sending email to: ${sentNotificationRequest.email}`,
        );
        return `Email or Quota exceeded error sending email to: ${sentNotificationRequest.email}`;
      } else if (
        error.response &&
        error.response.includes('Service  unavailable')
      ) {
        this.logger.error(
          `Service not available error sending email to: ${sentNotificationRequest.email}`,
        );
        throw Error(
          `Service not available error sending email to: ${sentNotificationRequest.email}`,
        );
      } else {
        this.logger.error(
          `Error sending email to: ${sentNotificationRequest.email}`,
          5,
        );
        throw error;
      }
    }
  }
}
