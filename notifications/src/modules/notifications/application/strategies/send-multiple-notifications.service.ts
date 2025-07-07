import { Injectable } from '@nestjs/common';
import { SendEmailService } from '../services/send-email.service';
import { SendSMSService } from '../services/send-sms.service';
import { SendTelegramService } from '../services/send-telegram.service';
import { SendWhatsappService } from '../services/send-whatsapp.service';
import { environments } from 'src/settings/environments/environments';
import { SendNotificationRequest } from '../../domain/schemas/dto/request/send-notification.request';
import { SendNotificationResponse } from '../../domain/schemas/dto/response/send-notification.response';

@Injectable()
export class SendNotificationsService {
  constructor(
    private readonly sendTelegramService: SendTelegramService,
    private readonly sendEmailService: SendEmailService,
    private readonly sendSMSService: SendSMSService,
    private readonly sendWhatsappService: SendWhatsappService,
  ) {}

  async sendNotificationToMultipleChannels(
    notificationRequest: SendNotificationRequest,
  ): Promise<SendNotificationResponse[]> {
    try {
      let msm: string;
      let result: SendNotificationResponse[] = [];
      const channelsString: string = environments.channels;
      const channels: string[] = channelsString
        .split(',')
        .map((channel) => channel.trim());
      console.log(channels);
      const promises = channels.map(async (element) => {
        try {
          let msm: string | null;
          switch (element) {
            case 'telegram':
              msm =
                await this.sendTelegramService.sendNotification(
                  notificationRequest,
                );
              console.log(msm);
              break;
            case 'email':
              msm =
                await this.sendEmailService.sendNotification(
                  notificationRequest,
                );
              break;
            case 'sms':
              msm =
                await this.sendSMSService.sendNotification(notificationRequest);
              break;
            case 'whatsapp':
              msm =
                await this.sendWhatsappService.sendNotification(
                  notificationRequest,
                );
              console.log(msm);
              break;
            default:
              throw new Error(`Channel ${element} is not supported`);
          }
          return {
            channel: element,
            type: 'success',
            message: msm,
          };
        } catch (error) {
          return {
            channel: element,
            type: 'error',
            message: `Error sending message to ${element}: ${error.message}`,
          };
        }
      });
      const results = await Promise.all(promises);
      result = [...results];
      return result;
    } catch (error) {
      throw error;
    }
  }
}
