import { TypeNotification } from '@prisma/client';
import { TypeNotificationResponse } from 'src/modules/type-notification/domain/schemas/dto/response/type-notification.response';

export class PrismaTypeNotificationAdapter {
  static fromPrismaTypeNotificationToTypeNotificationResponse(
    prismaTypeNotification: TypeNotification,
  ): TypeNotificationResponse {
    return {
      idTypeNotification: prismaTypeNotification.id_type_notification,
      name: prismaTypeNotification.name,
      description: prismaTypeNotification.description!,
      createdAt: prismaTypeNotification.created_at,
      updatedAt: prismaTypeNotification.updated_at,
    };
  }
}
