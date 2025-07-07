import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InterfaceTypePaymentRepository } from 'src/modules/type-payment/domain/contracts/type-payment.interface.repository';
import { TypePaymentResponse } from 'src/modules/type-payment/domain/schemas/dto/response/type-payment.response';
import { TypePaymentModel } from 'src/modules/type-payment/domain/schemas/model/type-payment.model';
import { statusCode } from 'src/settings/environments/status-code';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';

@Injectable()
export class TypePaymentPrismaImplementation
  implements InterfaceTypePaymentRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    typePayment: TypePaymentModel,
  ): Promise<TypePaymentResponse | null> {
    try {
      const createdTypePayment = await this.prismaService.payType.create({
        data: {
          name: typePayment.getName(),
          description: typePayment.getDescription(),
          created_at: typePayment.getCreatedAt(),
        },
      });

      if (!createdTypePayment) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to create type payment',
        });
      }

      return {
        idTypePayment: createdTypePayment.id_pay_type,
        name: createdTypePayment.name,
        description: createdTypePayment.description!,
        createdAt: createdTypePayment.created_at,
        updatedAt: createdTypePayment.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(
    idTypePayment: number,
    typePayment: TypePaymentModel,
  ): Promise<TypePaymentResponse | null> {
    try {
      const updatedTypePayment = await this.prismaService.payType.update({
        where: { id_pay_type: idTypePayment },
        data: {
          name: typePayment.getName(),
          description: typePayment.getDescription(),
          updated_at: new Date(),
        },
      });

      if (!updatedTypePayment) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type payment with ID ${idTypePayment} not found`,
        });
      }

      return {
        idTypePayment: updatedTypePayment.id_pay_type,
        name: updatedTypePayment.name,
        description: updatedTypePayment.description!,
        createdAt: updatedTypePayment.created_at,
        updatedAt: updatedTypePayment.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<TypePaymentResponse[]> {
    try {
      const typePayments = await this.prismaService.payType.findMany();

      if (!typePayments || typePayments.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No type payments found',
        });
      }

      return typePayments.map((typePayment) => ({
        idTypePayment: typePayment.id_pay_type,
        name: typePayment.name,
        description: typePayment.description!,
        createdAt: typePayment.created_at,
        updatedAt: typePayment.updated_at,
      }));
    } catch (error) {
      throw error;
    }
  }

  async findById(idTypePayment: number): Promise<TypePaymentResponse | null> {
    try {
      const typePayment = await this.prismaService.payType.findUnique({
        where: { id_pay_type: idTypePayment },
      });

      if (!typePayment) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type payment with ID ${idTypePayment} not found`,
        });
      }

      return {
        idTypePayment: typePayment.id_pay_type,
        name: typePayment.name,
        description: typePayment.description!,
        createdAt: typePayment.created_at,
        updatedAt: typePayment.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async findByName(name: string): Promise<TypePaymentResponse | null> {
    try {
      const typePayment = await this.prismaService.payType.findFirst({
        where: { name },
      });

      if (!typePayment) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type payment with name "${name}" not found`,
        });
      }

      return {
        idTypePayment: typePayment.id_pay_type,
        name: typePayment.name,
        description: typePayment.description!,
        createdAt: typePayment.created_at,
        updatedAt: typePayment.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(idTypePayment: number): Promise<boolean> {
    try {
      const deletedTypePayment = await this.prismaService.payType.delete({
        where: { id_pay_type: idTypePayment },
      });

      if (!deletedTypePayment) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type payment with ID ${idTypePayment} not found`,
        });
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  async existsById(idTypePayment: number): Promise<boolean> {
    try {
      const exists = await this.prismaService.payType.findUnique({
        where: { id_pay_type: idTypePayment },
      });
      return !!exists;
    } catch (error) {
      throw error;
    }
  }
}
