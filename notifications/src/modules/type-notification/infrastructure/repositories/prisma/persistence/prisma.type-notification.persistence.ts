import { Injectable } from '@nestjs/common';
import { InterfaceTypeNotificationRepository } from 'src/modules/type-notification/domain/contracts/type-notification.interface.repository';
import { TypeNotificationResponse } from 'src/modules/type-notification/domain/schemas/dto/response/type-notification.response';
import { TypeNotificationModel } from 'src/modules/type-notification/domain/schemas/model/type-notification.model';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { PrismaTypeNotificationAdapter } from '../adapters/prisma.type-notification.adapter';

@Injectable()
export class PrismaTypeNotificationPersistence
  implements InterfaceTypeNotificationRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    typeNotification: TypeNotificationModel,
  ): Promise<TypeNotificationResponse> {
    try {
      const createdTypeNotification =
        await this.prismaService.typeNotification.create({
          data: {
            name: typeNotification.getName(),
            description: typeNotification.getDescription(),
          },
        });

      return PrismaTypeNotificationAdapter.fromPrismaTypeNotificationToTypeNotificationResponse(
        createdTypeNotification,
      );
    } catch (error) {
      throw error;
    }
  }

  async update(
    idTypeNotification: number,
    typeNotification: TypeNotificationModel,
  ): Promise<TypeNotificationResponse | null> {
    try {
      const updatedTypeNotification =
        await this.prismaService.typeNotification.update({
          where: { id_type_notification: idTypeNotification },
          data: {
            name: typeNotification.getName(),
            description: typeNotification.getDescription(),
          },
        });

      return PrismaTypeNotificationAdapter.fromPrismaTypeNotificationToTypeNotificationResponse(
        updatedTypeNotification,
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<TypeNotificationResponse[]> {
    try {
      const typeNotifications =
        await this.prismaService.typeNotification.findMany();

      return typeNotifications.map((typeNotification) =>
        PrismaTypeNotificationAdapter.fromPrismaTypeNotificationToTypeNotificationResponse(
          typeNotification,
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  async findById(
    idTypeNotification: number,
  ): Promise<TypeNotificationResponse | null> {
    try {
      const typeNotification =
        await this.prismaService.typeNotification.findUnique({
          where: { id_type_notification: idTypeNotification },
        });

      if (!typeNotification) {
        return null;
      }

      return PrismaTypeNotificationAdapter.fromPrismaTypeNotificationToTypeNotificationResponse(
        typeNotification,
      );
    } catch (error) {
      throw error;
    }
  }

  async findByName(name: string): Promise<TypeNotificationResponse | null> {
    try {
      const typeNotification =
        await this.prismaService.typeNotification.findFirst({
          where: { name },
        });

      if (!typeNotification) {
        return null;
      }

      return PrismaTypeNotificationAdapter.fromPrismaTypeNotificationToTypeNotificationResponse(
        typeNotification,
      );
    } catch (error) {
      throw error;
    }
  }

  async delete(idTypeNotification: number): Promise<boolean> {
    try {
      const deletedTypeNotification =
        await this.prismaService.typeNotification.delete({
          where: { id_type_notification: idTypeNotification },
        });

      return !!deletedTypeNotification;
    } catch (error) {
      throw error;
    }
  }

  async existsById(idTypeNotification: number): Promise<boolean> {
    try {
      const typeNotification =
        await this.prismaService.typeNotification.findUnique({
          where: { id_type_notification: idTypeNotification },
        });

      return !!typeNotification;
    } catch (error) {
      throw error;
    }
  }

  async existsByName(name: string): Promise<boolean> {
    try {
      const typeNotification =
        await this.prismaService.typeNotification.findFirst({
          where: { name },
        });

      return !!typeNotification;
    } catch (error) {
      throw error;
    }
  }
}
