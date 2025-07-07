import { Inject, Injectable } from '@nestjs/common';
import { InterfaceProcessUseCase } from '../usecases/process.use-case.interface';
import { InterfaceProcessRepository } from '../../domain/contracts/process.interface.repository';
import { CreateProcessRequest } from '../../domain/schemas/dto/request/create.process.request';
import { ProcessResponse } from '../../domain/schemas/dto/response/process.response';
import { validateFields } from 'src/shared/utils/validators/fields.validators';
import { RpcException } from '@nestjs/microservices';
import { statusCode } from 'src/settings/environments/status-code';
import { UpdateProcessRequest } from '../../domain/schemas/dto/request/update.process.request';
import { EntityModel } from 'src/modules/enterprise/domain/schemas/model/entity.model';
import { ProcessMapper } from '../mappers/process.mapper';
import { InterfaceEntityRepository } from 'src/modules/enterprise/domain/contracts/entity.interface.repository';
import { InterfaceStatusRepository } from 'src/modules/status/domain/contracts/status.interface.repository';
import { StatusModel } from 'src/modules/status/domain/schemas/model/status.model';
import { TypeStatusModel } from 'src/modules/type-status/domain/schemas/model/type-status.model';
import { ProcessModel } from '../../domain/schemas/model/process.model';

@Injectable()
export class ProcessUseCaseService implements InterfaceProcessUseCase {
  constructor(
    @Inject('ProcessRepository')
    private readonly processRepository: InterfaceProcessRepository,
    @Inject('EntityRepository')
    private readonly entityRepository: InterfaceEntityRepository,
    @Inject('StatusRepository')
    private readonly statusRepository: InterfaceStatusRepository,
  ) {}

  async create(process: CreateProcessRequest): Promise<ProcessResponse | null> {
    try {
      const requiredFields: string[] = [
        'processNumber',
        'value',
        'category',
        'description',
        'timeExecution',
        'processObject',
        'emailManager',
        'fullNameManager',
        'phoneManager',
        'statusProcess',
        'isActive',
        'idEntity',
        'idStatus',
      ];
      const missingFieldsMessages: string[] = validateFields(
        process,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const entity = await this.entityRepository.findById(process.idEntity);
      if (!entity) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Entity with ID ${process.idEntity} not found`,
        });
      }

      const status = await this.statusRepository.findById(process.idStatus);
      if (!status) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Status with ID ${process.idStatus} not found`,
        });
      }

      const entityModel: EntityModel = new EntityModel(
        entity.idEntity,
        entity.ruc,
        entity.name,
        entity.email,
        entity.cellphone,
        entity.telephone,
        entity.address,
        entity.description,
      );

      const statusModel: StatusModel = new StatusModel(
        status.idStatus,
        status.name,
        status.description,
        new TypeStatusModel(
          status.typeStatus.idTypeStatus,
          status.typeStatus.name,
          status.typeStatus.description,
        ),
      );

      const processModel: ProcessModel =
        ProcessMapper.fromCreateProcessRequestToModel(
          process,
          entityModel,
          statusModel,
        );

      const processCreated = await this.processRepository.create(processModel);
      if (!processCreated) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Error creating process',
        });
      }

      return processCreated;
    } catch (error) {
      throw error;
    }
  }

  async update(
    idProcess: number,
    process: UpdateProcessRequest,
  ): Promise<ProcessResponse | null> {
    try {
      if (!idProcess || idProcess <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid process ID or not provided',
        });
      }

      const existsById = await this.processRepository.existsById(idProcess);
      if (!existsById) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Process with ID ${idProcess} not found`,
        });
      }

      const requiredFields: string[] = [
        'processNumber',
        'value',
        'category',
        'description',
        'timeExecution',
        'processObject',
        'emailManager',
        'fullNameManager',
        'phoneManager',
        'statusProcess',
        'isActive',
        'idEntity',
        'idStatus',
      ];
      const missingFieldsMessages: string[] = validateFields(
        process,
        requiredFields,
      );

      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const entity = await this.entityRepository.findById(process.idEntity);

      if (!entity) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Entity with ID ${process.idEntity} not found`,
        });
      }

      const status = await this.statusRepository.findById(process.idStatus);

      if (!status) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Status with ID ${process.idStatus} not found`,
        });
      }

      const entityModel: EntityModel = new EntityModel(
        entity.idEntity,
        entity.ruc,
        entity.name,
        entity.email,
        entity.cellphone,
        entity.telephone,
        entity.address,
        entity.description,
      );

      const statusModel: StatusModel = new StatusModel(
        status.idStatus,
        status.name,
        status.description,
        new TypeStatusModel(
          status.typeStatus.idTypeStatus,
          status.typeStatus.name,
          status.typeStatus.description,
        ),
      );

      const processModel: ProcessModel =
        ProcessMapper.fromUpdateProcessRequestToModel(
          idProcess,
          process,
          entityModel,
          statusModel,
        );

      const processUpdated = await this.processRepository.update(
        idProcess,
        processModel,
      );
      if (!processUpdated) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Error updating process',
        });
      }
      return processUpdated;
    } catch (error) {
      throw error;
    }
  }

  async existsById(idProcess: number): Promise<boolean> {
    return this.processRepository.existsById(idProcess);
  }

  async findByProcessNumber(
    processNumber: string,
  ): Promise<ProcessResponse | null> {
    try {
      if (!processNumber || processNumber.trim() === '') {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Process number is required',
        });
      }

      const process =
        await this.processRepository.findByProcessNumber(processNumber);
      if (!process) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Process with number ${processNumber} not found`,
        });
      }
      return process;
    } catch (error) {
      throw error;
    }
  }

  async existsByProcessNumber(processNumber: string): Promise<boolean> {
    return this.processRepository.existsByProcessNumber(processNumber);
  }

  async findAll(): Promise<ProcessResponse[]> {
    try {
      const processes = await this.processRepository.findAll();
      if (!processes || processes.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No processes found',
        });
      }
      return processes;
    } catch (error) {
      throw error;
    }
  }

  async findById(idProcess: number): Promise<ProcessResponse | null> {
    try {
      if (!idProcess || idProcess <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid process ID or not provided',
        });
      }

      const process = await this.processRepository.findById(idProcess);
      if (!process) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Process with ID ${idProcess} not found`,
        });
      }
      return process;
    } catch (error) {
      throw error;
    }
  }

  async delete(idProcess: number): Promise<boolean> {
    try {
      if (!idProcess || idProcess <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Invalid process ID or not provided',
        });
      }

      const existsById = await this.processRepository.existsById(idProcess);
      if (!existsById) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Process with ID ${idProcess} not found`,
        });
      }

      const deleted = await this.processRepository.delete(idProcess);
      if (!deleted) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Error deleting process',
        });
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}
