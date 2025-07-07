import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { SendNotificationUseCaseServiceInterface } from '../usecases/send-notification.use-case.service.interface';
import * as TelegramBot from 'node-telegram-bot-api';
import { environments } from 'src/settings/environments/environments';
import { delay } from 'src/shared/utils/delay/time.delay';
import { SendNotificationRequest } from '../../domain/schemas/dto/request/send-notification.request';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';

@Injectable()
export class SendTelegramService
  implements
    SendNotificationUseCaseServiceInterface,
    OnModuleInit,
    OnModuleDestroy
{
  private readonly bot: TelegramBot;
  private readonly logger = new Logger(SendTelegramService.name);

  constructor(private readonly prismaService: PrismaService) {
    this.bot = new TelegramBot(environments.telegramBotToken, {
      polling: true,
    });
  }

  async onModuleInit() {
    this.logger.log('Starting bot de Telegram...');
    try {
      await this.bot.deleteWebHook();
      this.logger.log('Webhook previously set has been deleted');
      this.setupBotHandlers();
      await this.bot.startPolling({ restart: true });
      this.logger.log('Polling started successfully');
    } catch (error) {
      this.logger.error(
        `Error starting Telegram bot: ${error.message}`,
        error.stack,
      );
    }
  }

  async onModuleDestroy() {
    this.logger.log(`Stopping Telegram bot...`);
    try {
      await this.bot.stopPolling();
      this.logger.log('Polling stopped successfully');
      await this.bot.deleteWebHook();
      this.logger.log('Webhook deleted successfully');
    } catch (error) {
      this.logger.error(
        `Error stopping Telegram bot: ${error.message}`,
        error.stack,
      );
    }
  }

  private setupBotHandlers() {
    this.bot.onText(/\/start/, async (msg) => {
      const chatId = msg.chat.id.toString();
      this.logger.log(`Received /start command from chat ID: ${chatId}`);

      try {
        const existingChat = await this.prismaService.telegramChat.findFirst({
          where: { chat_id: chatId },
        });

        if (existingChat) {
          await this.bot.sendMessage(
            chatId,
            `Welcome back! Your chat ID ${chatId} is already registered for the phone number ${existingChat.phone}.`,
          );
          this.logger.log(
            `Chat ID ${chatId} already registered for phone ${existingChat.phone}`,
          );
          return;
        }
        await this.bot.sendMessage(
          chatId,
          'Please share your contact so we can register your chat ID.',
          {
            reply_markup: {
              keyboard: [[{ text: 'Share Contact', request_contact: true }]],
              one_time_keyboard: true,
            },
          },
        );
        this.logger.log(`Requested contact from chat ID: ${chatId}`);
      } catch (error) {
        this.logger.error(
          `Error handling /start for chat ID ${chatId}: ${error.message}`,
          error.stack,
        );
        await this.bot.sendMessage(
          chatId,
          `Error processing your request: ${error.message}. Please try again later or contact support.`,
        );
      }
    });

    this.bot.on('contact', async (msg) => {
      const chatId = msg.chat.id.toString();
      const phone = msg.contact?.phone_number;

      if (!phone) {
        this.logger.warn(
          `No phone number provided in contact message from chat ID: ${chatId}`,
        );
        await this.bot.sendMessage(
          chatId,
          `No phone number provided or contact sharing failed. Please try again.`,
        );
        return;
      }

      const normalizedPhone = phone.replace(/\s/g, '').startsWith('+')
        ? phone.replace(/\s/g, '')
        : `+${phone.replace(/\s/g, '')}`;

      try {
        const existingChat = await this.prismaService.telegramChat.findFirst({
          where: { chat_id: chatId },
        });

        if (existingChat) {
          await this.bot.sendMessage(
            chatId,
            `Your chat ID ${chatId} is already registered for the phone number ${existingChat.phone}.`,
          );
          this.logger.log(
            `Chat ID ${chatId} already registered for phone ${existingChat.phone}`,
          );
          return;
        }

        await this.prismaService.telegramChat.create({
          data: {
            chat_id: chatId,
            phone: normalizedPhone,
          },
        });
        this.logger.log(
          `Stored chat ID ${chatId} for phone ${normalizedPhone}`,
        );
        await this.bot.sendMessage(
          chatId,
          `Your chat ID ${chatId} has been successfully registered for the phone number ${normalizedPhone}.`,
        );
      } catch (error) {
        this.logger.error(
          `Error storing chat ID for phone ${normalizedPhone}: ${error.message}`,
          error.stack,
        );
        await this.bot.sendMessage(
          chatId,
          `Error storing your chat ID: ${error.message}. Please try again later or contact support.`,
        );
      }
    });

    this.bot.onText(/\/getchatid/, async (msg) => {
      const chatId = msg.chat.id.toString();
      try {
        const chatTelegram = await this.prismaService.telegramChat.findFirst({
          where: { chat_id: chatId },
        });
        if (chatTelegram) {
          await this.bot.sendMessage(
            chatId,
            `Your chat ID is: ${chatId}. It is registered for the phone number: ${chatTelegram.phone}.`,
          );
        } else {
          await this.bot.sendMessage(
            chatId,
            `No chat ID found for your account. Please start the bot with /start to register your chat ID.`,
          );
        }
      } catch (error) {
        this.logger.error(
          `Error retrieving chat ID for chat ID ${chatId}: ${error.message}`,
          error.stack,
        );
        await this.bot.sendMessage(
          chatId,
          `Error retrieving your chat ID: ${error.message}. Please try again later or contact support.`,
        );
      }
    });

    this.bot.on('polling_error', (error) => {
      this.logger.error(`Polling error: ${error.message}`);
    });
  }

  async sendNotification(
    sentNotificationRequest: SendNotificationRequest,
  ): Promise<string | null> {
    let attempt = 0;
    const maxAttempts = 3;
    const retryDelay = 3000;

    const phone = sentNotificationRequest.phone;
    const chatTelegram = await this.prismaService.telegramChat.findFirst({
      where: { phone },
    });

    if (!chatTelegram || !chatTelegram.chat_id) {
      this.logger.error(`No Telegram chat ID found for phone ${phone}`);
      throw new Error(
        `No Telegram chat ID registered for phone ${phone}. User must start the bot.`,
      );
    }

    const chatId = chatTelegram.chat_id;

    while (attempt < maxAttempts) {
      try {
        this.logger.log(`Sending Telegram message to chat ID ${chatId}`);
        const message = await this.bot.sendMessage(
          chatId,
          sentNotificationRequest.message,
        );
        if (message.message_id) {
          this.logger.log(`Message sent successfully to chat ID ${chatId}`);
          return `Message sent by Telegram successfully to ${chatId}`;
        } else {
          this.logger.error(`Error sending message to ${chatId}`);
          return null;
        }
      } catch (error) {
        if (error.response?.body?.error_code === 401) {
          this.logger.error(
            'Authentication error. Please check the bot token.',
          );
          throw new Error(
            'Authentication failed. Please verify your bot token.',
          );
        }
        if (error.response?.body?.error_code === 429) {
          this.logger.error('Telegram rate limit reached. Retrying...');
          attempt++;
          if (attempt < maxAttempts) {
            await delay(retryDelay);
            continue;
          } else {
            throw new Error(
              'Telegram rate limit reached, please try again later.',
            );
          }
        }
        if (error.response?.body?.error_code === 403) {
          this.logger.error(
            `Bot is not authorized to send messages to ${chatId}`,
          );
          throw new Error(
            `Cannot send message to ${phone}. User must start the bot with /start.`,
          );
        }
        this.logger.error(
          `Error sending message by Telegram: ${error.message}`,
          error.stack,
        );
        throw error;
      }
    }
    return null;
  }
}
