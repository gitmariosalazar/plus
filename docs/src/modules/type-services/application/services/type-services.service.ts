import { Inject, Injectable } from '@nestjs/common';
import { InterfaceTypeServicesUseCase } from '../usecases/type-services.use-case.interface';
import { InterfaceTypeServicesRepository } from '../../domain/contracts/type-services.interface.repository';
import { TypeServicesResponse } from '../../domain/schemas/dto/response/type-services.response';
import { RpcException } from '@nestjs/microservices';
import { statusCode } from 'src/settings/environments/status-code';
import { CreateTypeServicesRequest } from '../../domain/schemas/dto/request/create.type-services.request';
import { validateFields } from 'src/shared/utils/validators/fields.validators';
import { TypeServiceMapper } from '../mappers/type-services.mapper';
import { TypeServicesModel } from '../../domain/schemas/model/type-services.model';
import { UpdateTypeServicesRequest } from '../../domain/schemas/dto/request/update.type-services.request';

@Injectable()
export class TypeServicesUseCaseService
  implements InterfaceTypeServicesUseCase
{
  constructor(
    @Inject('TypeServicesRepository')
    private readonly typeServicesRepository: InterfaceTypeServicesRepository,
  ) {}

  async findAll(): Promise<TypeServicesResponse[]> {
    try {
      const typeServices = await this.typeServicesRepository.findAll();
      if (!typeServices || typeServices.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No type services found',
        });
      }

      return typeServices;
    } catch (error) {
      throw error;
    }
  }

  async findById(idTypeService: number): Promise<TypeServicesResponse | null> {
    try {
      if (!idTypeService || idTypeService <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid type service ID or ID not provided',
        });
      }

      const typeService =
        await this.typeServicesRepository.findById(idTypeService);
      if (!typeService) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type service with id ${idTypeService} not found`,
        });
      }

      return typeService;
    } catch (error) {
      throw error;
    }
  }

  async create(
    typeService: CreateTypeServicesRequest,
  ): Promise<TypeServicesResponse> {
    try {
      const requiredFields: string[] = ['name', 'description'];
      const missingFieldsMessages: string[] = validateFields(
        typeService,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const typeServiceModel: TypeServicesModel =
        TypeServiceMapper.fromCreateTypeServiceRequestToModel(typeService);

      const createdTypeService =
        await this.typeServicesRepository.create(typeServiceModel);

      if (!createdTypeService) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to create type service',
        });
      }

      return createdTypeService;
    } catch (error) {
      throw error;
    }
  }

  async update(
    idTypeService: number,
    typeService: UpdateTypeServicesRequest,
  ): Promise<TypeServicesResponse | null> {
    try {
      if (!idTypeService || idTypeService <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid type service ID or ID not provided',
        });
      }

      const requiredFields: string[] = ['name', 'description'];
      const missingFieldsMessages: string[] = validateFields(
        typeService,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const typeServiceModel: TypeServicesModel =
        TypeServiceMapper.fromUpdateTypeServiceRequestToModel(typeService);

      const updatedTypeService = await this.typeServicesRepository.update(
        idTypeService,
        typeServiceModel,
      );

      return updatedTypeService;
    } catch (error) {
      throw error;
    }
  }

  async delete(idTypeService: number): Promise<boolean> {
    try {
      if (!idTypeService || idTypeService <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid type service ID or ID not provided',
        });
      }

      const deleted = await this.typeServicesRepository.delete(idTypeService);
      if (!deleted) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type service with id ${idTypeService} not found`,
        });
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  async findByName(name: string): Promise<TypeServicesResponse | null> {
    try {
      if (!name || name.trim() === '') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Name is required',
        });
      }

      const typeService = await this.typeServicesRepository.findByName(name);

      if (!typeService) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type service with name ${name} not found`,
        });
      }
      return typeService;
    } catch (error) {
      throw error;
    }
  }
}
