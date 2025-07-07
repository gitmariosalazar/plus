import { Inject, Injectable } from '@nestjs/common';
import { InterfaceTypePaymentUseCase } from '../usecases/type-payment.use-case.interface';
import { InterfaceTypePaymentRepository } from '../../domain/contracts/type-payment.interface.repository';
import { TypePaymentResponse } from '../../domain/schemas/dto/response/type-payment.response';
import { RpcException } from '@nestjs/microservices';
import { statusCode } from 'src/settings/environments/status-code';
import { CreateTypePaymentRequest } from '../../domain/schemas/dto/request/create.type-payment.request';
import { TypePaymentModel } from '../../domain/schemas/model/type-payment.model';
import { TypePaymentMapper } from '../mappers/type-payment.mapper';
import { validateFields } from 'src/shared/utils/validators/fields.validators';
import { UpdateTypePaymentRequest } from '../../domain/schemas/dto/request/update.type-payment.request';

@Injectable()
export class TypePaymentUseCaseService implements InterfaceTypePaymentUseCase {
  constructor(
    @Inject('TypePaymentRepository')
    private readonly typePaymentRepository: InterfaceTypePaymentRepository,
  ) {}

  async findAll(): Promise<TypePaymentResponse[]> {
    try {
      const typePayments = await this.typePaymentRepository.findAll();
      if (!typePayments || typePayments.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No type payments found',
        });
      }
      return typePayments;
    } catch (error) {
      throw error;
    }
  }

  async findById(idTypePayment: number): Promise<TypePaymentResponse | null> {
    try {
      if (!idTypePayment || isNaN(idTypePayment)) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid ID provided or ID not provided',
        });
      }

      const existsById =
        await this.typePaymentRepository.existsById(idTypePayment);
      if (!existsById) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type payment with ID ${idTypePayment} not found`,
        });
      }
      const typePayment =
        await this.typePaymentRepository.findById(idTypePayment);

      return typePayment;
    } catch (error) {
      throw error;
    }
  }

  async findByName(name: string): Promise<TypePaymentResponse | null> {
    try {
      if (!name || typeof name !== 'string') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid name provided or name not provided',
        });
      }

      const typePayment = await this.typePaymentRepository.findByName(name);
      if (!typePayment) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type payment with name ${name} not found`,
        });
      }
      return typePayment;
    } catch (error) {
      throw error;
    }
  }

  async create(
    typePayment: CreateTypePaymentRequest,
  ): Promise<TypePaymentResponse | null> {
    try {
      const requiredFields: string[] = ['name', 'description'];

      const missingFieldsMessages: string[] = validateFields(
        typePayment,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const typePaymentModel: TypePaymentModel =
        TypePaymentMapper.fromCreateTypePaymentRequestToTypePaymentModel(
          typePayment,
        );

      const createdTypePayment =
        await this.typePaymentRepository.create(typePaymentModel);
      if (!createdTypePayment) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to create type payment',
        });
      }
      return createdTypePayment;
    } catch (error) {
      throw error;
    }
  }

  async update(
    idTypePayment: number,
    typePayment: UpdateTypePaymentRequest,
  ): Promise<TypePaymentResponse | null> {
    try {
      if (!idTypePayment || isNaN(idTypePayment)) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid ID provided or ID not provided',
        });
      }

      const existsById =
        await this.typePaymentRepository.existsById(idTypePayment);
      if (!existsById) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type payment with ID ${idTypePayment} not found`,
        });
      }

      const requiredFields: string[] = ['name', 'description'];

      const missingFieldsMessages: string[] = validateFields(
        typePayment,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const typePaymentModel: TypePaymentModel =
        TypePaymentMapper.fromUpdateTypePaymentRequestToTypePaymentModel(
          typePayment,
        );

      const updatedTypePayment = await this.typePaymentRepository.update(
        idTypePayment,
        typePaymentModel,
      );
      if (!updatedTypePayment) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to update type payment',
        });
      }
      return updatedTypePayment;
    } catch (error) {
      throw error;
    }
  }

  async delete(idTypePayment: number): Promise<boolean> {
    try {
      if (!idTypePayment || isNaN(idTypePayment)) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid ID provided or ID not provided',
        });
      }

      const existsById =
        await this.typePaymentRepository.existsById(idTypePayment);
      if (!existsById) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type payment with ID ${idTypePayment} not found`,
        });
      }

      const deleted = await this.typePaymentRepository.delete(idTypePayment);
      if (!deleted) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to delete type payment',
        });
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async existsById(idTypePayment: number): Promise<boolean> {
    return await this.typePaymentRepository.existsById(idTypePayment);
  }
}
