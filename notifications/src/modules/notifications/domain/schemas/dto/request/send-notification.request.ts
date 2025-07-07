import { ApiProperty } from '@nestjs/swagger';
import { NotificationChannel } from 'src/shared/utils/types/notification-channels';

export class SendNotificationRequest {
  @ApiProperty({
    required: true,
    type: String,
    example: 'mariosalazar.ms.10@gmail.com',
    description: 'Email of the user that will receive the notification',
    format: 'email',
  })
  email: string;
  @ApiProperty({
    required: true,
    example: 'Subject of the notification',
    description: 'Subject of the notification',
    type: String,
  })
  subject: string;
  @ApiProperty({
    required: true,
    example: 'Message of the notification',
    description: 'Message of the notification',
    type: String,
  })
  message: string;
  @ApiProperty({
    required: true,
    example: '0994532438',
    description: 'Phone of the user that will receive the notification',
    type: String,
  })
  phone: string;
  /*
  @ApiProperty({
    required: true,
    example: ['email', 'sms', 'watsapp', 'telegram'],
    description: 'Module where the notification is generated',
    type: String,
  })
  channesls: NotificationChannel[] | null;
  */
}
