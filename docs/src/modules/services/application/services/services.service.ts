import { Inject, Injectable } from '@nestjs/common';
import { InterfaceServicesUseCase } from '../usecases/services.use-case.interface';
import { InterfaceTypeServicesRepository } from 'src/modules/type-services/domain/contracts/type-services.interface.repository';
import { InterfaceServiceRepository } from '../../domain/contracts/services.interface.repository';
import { CreateServiceRequest } from '../../domain/schemas/dto/request/create.services.request';
import { ServiceResponse } from '../../domain/schemas/dto/response/services.response';
import { validateFields } from 'src/shared/utils/validators/fields.validators';
import { RpcException } from '@nestjs/microservices';
import { statusCode } from 'src/settings/environments/status-code';
import { ServicesMapper } from '../mappers/services.mapper';
import { TypeServicesModel } from 'src/modules/type-services/domain/schemas/model/type-services.model';
import { UpdateServiceRequest } from '../../domain/schemas/dto/request/update.services.request';

@Injectable()
export class ServicesUseCaseService implements InterfaceServicesUseCase {
  constructor(
    @Inject('ServicesRepository')
    private readonly servicesRepository: InterfaceServiceRepository,
    @Inject('TypeServicesRepository')
    private readonly typeServicesRepository: InterfaceTypeServicesRepository,
  ) {}

  async create(service: CreateServiceRequest): Promise<ServiceResponse> {
    try {
      const requiredFields: string[] = ['name', 'description', 'idTypeService'];
      const missingFieldsMessages: string[] = validateFields(
        service,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const typeService = await this.typeServicesRepository.findById(
        service.idTypeService,
      );

      if (!typeService) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type service with ID ${service.idTypeService} not found.`,
        });
      }

      const typeServiceModel: TypeServicesModel = new TypeServicesModel(
        typeService.idTypeService,
        typeService.name,
        typeService.description,
      );

      const serviceModel = ServicesMapper.fromCreateServiceRequestToModel(
        service,
        typeServiceModel,
      );

      return this.servicesRepository.create(serviceModel);
    } catch (error) {
      throw error;
    }
  }

  async update(
    idService: number,
    service: UpdateServiceRequest,
  ): Promise<ServiceResponse | null> {
    try {
      if (!idService || typeof idService !== 'number') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'ID must be a valid number',
        });
      }

      const existsById = await this.servicesRepository.existsById(idService);
      if (!existsById) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Service with ID ${idService} not found.`,
        });
      }

      const requiredFields: string[] = ['name', 'description', 'idTypeService'];
      const missingFieldsMessages: string[] = validateFields(
        service,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const typeService = await this.typeServicesRepository.findById(
        service.idTypeService,
      );

      if (!typeService) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Type service with ID ${service.idTypeService} not found.`,
        });
      }

      const typeServiceModel: TypeServicesModel = new TypeServicesModel(
        typeService.idTypeService,
        typeService.name,
        typeService.description,
      );

      const serviceModel = ServicesMapper.fromUpdateServiceRequestToModel(
        idService,
        service,
        typeServiceModel,
      );

      return this.servicesRepository.update(idService, serviceModel);
    } catch (error) {
      throw error;
    }
  }

  async existsById(idService: number): Promise<boolean> {
    return this.servicesRepository.existsById(idService);
  }

  async findAll(): Promise<ServiceResponse[]> {
    try {
      const services = await this.servicesRepository.findAll();
      if (!services || services.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No services found',
        });
      }
      return services;
    } catch (error) {
      throw error;
    }
  }

  async findById(idService: number): Promise<ServiceResponse | null> {
    try {
      if (!idService || typeof idService !== 'number') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'ID must be a valid number',
        });
      }

      const existsById = await this.servicesRepository.existsById(idService);

      if (!existsById) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Service with ID ${idService} not found.`,
        });
      }

      return await this.servicesRepository.findById(idService);
    } catch (error) {
      throw error;
    }
  }

  async findByName(name: string): Promise<ServiceResponse | null> {
    try {
      if (!name || typeof name !== 'string') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Name must be a valid string',
        });
      }

      const service = await this.servicesRepository.findByName(name);
      if (!service) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Service with name ${name} not found.`,
        });
      }
      return service;
    } catch (error) {
      throw error;
    }
  }

  async delete(idService: number): Promise<boolean> {
    try {
      if (!idService || typeof idService !== 'number') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'ID must be a valid number',
        });
      }

      const existsById = await this.servicesRepository.existsById(idService);
      if (!existsById) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Service with ID ${idService} not found.`,
        });
      }

      return await this.servicesRepository.delete(idService);
    } catch (error) {
      throw error;
    }
  }
}
