import { Inject, Injectable } from '@nestjs/common';
import { InterfacePriorityUseCase } from '../usecases/priority.use-case.interface';
import { InterfacePriorityRepository } from '../../domain/contracts/priority.interface.repository';
import { CreatePriorityRequest } from '../../domain/schemas/dto/request/create.priority.request';
import { PriorityResponse } from '../../domain/schemas/dto/response/priority.response';
import { validateFields } from 'src/shared/utils/validators/fields.validators';
import { RpcException } from '@nestjs/microservices';
import { statusCode } from 'src/settings/environments/status-code';
import { PriorityMapper } from '../mappers/priority.mapper';
import { UpdatePriorityRequest } from '../../domain/schemas/dto/request/update.priority.request';

@Injectable()
export class PriorityUseCaseService implements InterfacePriorityUseCase {
  constructor(
    @Inject('PriorityRepository')
    private readonly priorityRepository: InterfacePriorityRepository,
  ) {}

  async create(
    priority: CreatePriorityRequest,
  ): Promise<PriorityResponse | null> {
    try {
      const requiredFields: string[] = ['name', 'description'];
      const missingFieldsMessages: string[] = validateFields(
        priority,
        requiredFields,
      );
      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const existsByName = await this.priorityRepository.existsByName(
        priority.name,
      );
      if (existsByName) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: `Priority with name ${priority.name} already exists.`,
        });
      }

      const priorityModel =
        PriorityMapper.fromCreatePriorityRequestToPrioriryModel(priority);
      const createdPriority =
        await this.priorityRepository.create(priorityModel);
      if (!createdPriority) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to create priority.',
        });
      }
      return createdPriority;
    } catch (error) {
      throw error;
    }
  }

  async update(
    idPriority: number,
    priority: UpdatePriorityRequest,
  ): Promise<PriorityResponse | null> {
    try {
      if (!idPriority || idPriority <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid priority ID or ID not provided.',
        });
      }

      const requiredFields: string[] = ['name', 'description'];
      const missingFieldsMessages: string[] = validateFields(
        priority,
        requiredFields,
      );
      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const existsById = await this.priorityRepository.existsById(idPriority);
      if (!existsById) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Priority with ID ${idPriority} does not exist.`,
        });
      }

      const existsByName = await this.priorityRepository.existsByName(
        priority.name,
      );
      if (existsByName) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: `Priority with name ${priority.name} already exists.`,
        });
      }

      const priorityModel =
        PriorityMapper.fromUpdatePriorityRequestToPriorityModel(
          idPriority,
          priority,
        );
      const updatedPriority = await this.priorityRepository.update(
        idPriority,
        priorityModel,
      );
      if (!updatedPriority) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to update priority.',
        });
      }
      return updatedPriority;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<PriorityResponse[]> {
    try {
      const priorities = await this.priorityRepository.findAll();
      if (!priorities || priorities.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No priorities found.',
        });
      }
      return priorities;
    } catch (error) {
      throw error;
    }
  }

  async findById(idPriority: number): Promise<PriorityResponse | null> {
    try {
      if (!idPriority || idPriority <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid priority ID or ID not provided.',
        });
      }

      const existsById = await this.priorityRepository.existsById(idPriority);
      if (!existsById) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Priority with ID ${idPriority} does not exist.`,
        });
      }

      const priority = await this.priorityRepository.findById(idPriority);
      if (!priority) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Priority with ID ${idPriority} does not exist.`,
        });
      }
      return priority;
    } catch (error) {
      throw error;
    }
  }

  async findByName(name: string): Promise<PriorityResponse | null> {
    try {
      if (!name || name.trim() === '') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Priority name is required.',
        });
      }

      const existsByName = await this.priorityRepository.existsByName(name);
      if (!existsByName) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Priority with name ${name} does not exist.`,
        });
      }

      const priority = await this.priorityRepository.findByName(name);
      if (!priority) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Priority with name ${name} does not exist.`,
        });
      }
      return priority;
    } catch (error) {
      throw error;
    }
  }

  async delete(idPriority: number): Promise<boolean> {
    try {
      if (!idPriority || idPriority <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid priority ID or ID not provided.',
        });
      }

      const existsById = await this.priorityRepository.existsById(idPriority);
      if (!existsById) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Priority with ID ${idPriority} does not exist.`,
        });
      }

      const deleted = await this.priorityRepository.delete(idPriority);
      if (!deleted) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to delete priority.',
        });
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async existsById(idPriority: number): Promise<boolean> {
    return this.priorityRepository.existsById(idPriority);
  }

  async existsByName(name: string): Promise<boolean> {
    return this.priorityRepository.existsByName(name);
  }
}
