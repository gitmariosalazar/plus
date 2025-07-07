import { CreateTypeNotificationRequest } from '../../domain/schemas/dto/request/create.type-notification.request';
import { UpdateTypeNotificationRequest } from '../../domain/schemas/dto/request/update.type-notification.request';
import { TypeNotificationResponse } from '../../domain/schemas/dto/response/type-notification.response';
import { TypeNotificationModel } from '../../domain/schemas/model/type-notification.model';

export class TypeNotificationMapper {
  public static fromCreateTypeNotificationRequestToTypeNotificationModel(
    typeNotification: CreateTypeNotificationRequest,
  ): TypeNotificationModel {
    return new TypeNotificationModel(
      0,
      typeNotification.name,
      typeNotification.description,
      new Date(),
      new Date(),
    );
  }

  public static fromUpdateTypeNotificationRequestToTypeNotificationModel(
    typeNotification: UpdateTypeNotificationRequest,
  ): TypeNotificationModel {
    return new TypeNotificationModel(
      0,
      typeNotification.name,
      typeNotification.description,
      undefined,
      new Date(),
    );
  }

  public static fromTypeNotificationResponseToTypeNotificationModel(
    typeNotificationResponse: TypeNotificationResponse,
  ): TypeNotificationModel {
    return new TypeNotificationModel(
      typeNotificationResponse.idTypeNotification,
      typeNotificationResponse.name,
      typeNotificationResponse.description,
      typeNotificationResponse.createdAt || new Date(),
      typeNotificationResponse.updatedAt || new Date(),
    );
  }
}
