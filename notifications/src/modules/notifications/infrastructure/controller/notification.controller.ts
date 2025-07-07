import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NotificationUseCaseService } from '../../application/services/notification.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateNotificationRequest } from '../../domain/schemas/dto/request/create.notification.request';
import { UpdateNotificationRequest } from '../../domain/schemas/dto/request/update.notification.request';
import { CreateLogsNotificationsRequest } from '../../domain/schemas/dto/request/create.logs-notifications.request';
@Controller('notification')
@ApiTags('Notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationUseCaseService,
  ) {}

  @Post('send-and-create')
  @ApiOperation({
    summary: 'Method POST - Send and create a notification ✅',
    description:
      'This endpoint allows you to send a notification and create a log entry for it. It requires a complete notification object with all necessary details.',
  })
  @MessagePattern('notification.send-and-create')
  async sendAndCreateNotification(
    @Payload()
    notification: CreateLogsNotificationsRequest,
  ) {
    console.log(
      `'NotificationController - sendAndCreateNotification'`,
      notification,
    );
    return this.notificationService.sendAndCreateNotification(notification);
  }

  @Post('create')
  @ApiOperation({
    summary: 'Method POST - Create a new notification ✅',
    description:
      'This endpoint allows you to create a new notification with the required details.',
  })
  @MessagePattern('notification.create')
  async createNotification(
    @Payload()
    notification: CreateNotificationRequest,
  ) {
    console.log(`'NotificationController - createNotification'`, notification);
    return this.notificationService.create(notification);
  }

  @Put('update/:idNotifications')
  @ApiOperation({
    summary: 'Method PUT - Update an existing notification ✅',
    description:
      'This endpoint allows you to update an existing notification by providing the notification ID and the updated details.',
  })
  @MessagePattern('notification.update')
  async updateNotification(
    @Payload()
    data: {
      idNotifications: number;
      notification: UpdateNotificationRequest;
    },
  ) {
    const { idNotifications, notification } = data;
    return this.notificationService.update(idNotifications, notification);
  }

  @Get('find-all')
  @ApiOperation({
    summary: 'Method GET - Retrieve all notifications ✅',
    description:
      'This endpoint retrieves all notifications stored in the system.',
  })
  @MessagePattern('notification.find-all')
  async findAllNotifications() {
    return this.notificationService.findAll();
  }

  @Get('find-by-id/:idNotifications')
  @ApiOperation({
    summary: 'Method GET - Retrieve a notification by ID ✅',
    description: 'This endpoint retrieves a specific notification by its ID.',
  })
  @MessagePattern('notification.find-by-id')
  async findNotificationById(
    @Payload('idNotifications') idNotifications: number,
  ) {
    return this.notificationService.findById(idNotifications);
  }

  @Get('find-by-email/:email')
  @ApiOperation({
    summary: 'Method GET - Retrieve a notification by email ✅',
    description:
      'This endpoint retrieves a specific notification by the email associated with it.',
  })
  @MessagePattern('notification.find-by-email')
  async findNotificationByEmail(@Payload('email') email: string) {
    return this.notificationService.findByEmail(email);
  }

  @Delete('delete/:idNotifications')
  @ApiOperation({
    summary: 'Method DELETE - Delete a notification by ID ✅',
    description:
      'This endpoint deletes a specific notification by its ID. If the notification does not exist, it returns an error.',
  })
  @MessagePattern('notification.delete')
  async deleteNotification(
    @Payload('idNotifications') idNotifications: number,
  ) {
    return this.notificationService.delete(idNotifications);
  }
}
