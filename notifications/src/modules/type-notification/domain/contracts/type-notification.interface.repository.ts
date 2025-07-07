import { TypeNotificationResponse } from '../schemas/dto/response/type-notification.response';
import { TypeNotificationModel } from '../schemas/model/type-notification.model';

export interface InterfaceTypeNotificationRepository {
  findAll(): Promise<TypeNotificationResponse[]>;

  findById(
    idTypeNotification: number,
  ): Promise<TypeNotificationResponse | null>;

  findByName(name: string): Promise<TypeNotificationResponse | null>;

  create(
    typeNotification: TypeNotificationModel,
  ): Promise<TypeNotificationResponse>;

  update(
    idTypeNotification: number,
    typeNotification: TypeNotificationModel,
  ): Promise<TypeNotificationResponse | null>;

  delete(idTypeNotification: number): Promise<boolean>;

  existsById(idTypeNotification: number): Promise<boolean>;
  existsByName(name: string): Promise<boolean>;
}
