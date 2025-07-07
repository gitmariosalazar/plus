import { CreateTypeNotificationRequest } from '../../domain/schemas/dto/request/create.type-notification.request';
import { UpdateTypeNotificationRequest } from '../../domain/schemas/dto/request/update.type-notification.request';
import { TypeNotificationResponse } from '../../domain/schemas/dto/response/type-notification.response';

export interface InterfaceTypeNotificationUseCase {
  findAll(): Promise<TypeNotificationResponse[]>;

  findById(
    idTypeNotification: number,
  ): Promise<TypeNotificationResponse | null>;

  findByName(name: string): Promise<TypeNotificationResponse | null>;

  create(
    typeNotification: CreateTypeNotificationRequest,
  ): Promise<TypeNotificationResponse>;

  update(
    idTypeNotification: number,
    typeNotification: UpdateTypeNotificationRequest,
  ): Promise<TypeNotificationResponse | null>;

  delete(idTypeNotification: number): Promise<boolean>;
  existsById(idTypeNotification: number): Promise<boolean>;
  existsByName(name: string): Promise<boolean>;
}
