import { Controller, Post, Body, Inject } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { SendTelegramService } from '../../application/services/send-telegram.service';

@Controller('webhook')
export class TelegramController {
  constructor(private readonly telegramService: SendTelegramService) {}

  @Post()
  async handleWebhook(@Body() update: TelegramBot.Update) {
    this.telegramService['bot'].processUpdate(update);
    return { ok: true };
  }
}
