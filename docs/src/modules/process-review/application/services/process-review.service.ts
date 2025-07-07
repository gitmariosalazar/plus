import { Inject, Injectable } from '@nestjs/common';
import { InterfaceProcessReviewUseCase } from '../usecases/process-review.use-case.interface';
import { InterfaceProcessReviewRepository } from '../../domain/contracts/process-review.interface.repository';
import { InterfaceProcessRepository } from 'src/modules/process/domain/contracts/process.interface.repository';
import { CreateProcessReviewRequest } from '../../domain/schemas/dto/request/create.process-review.request';
import { ProcessReviewResponse } from '../../domain/schemas/dto/response/process-review.response';
import { validateFields } from 'src/shared/utils/validators/fields.validators';
import { RpcException } from '@nestjs/microservices';
import { statusCode } from 'src/settings/environments/status-code';
import { ProcessModel } from 'src/modules/process/domain/schemas/model/process.model';
import { EntityModel } from 'src/modules/enterprise/domain/schemas/model/entity.model';
import { StatusModel } from 'src/modules/status/domain/schemas/model/status.model';
import { TypeStatusModel } from 'src/modules/type-status/domain/schemas/model/type-status.model';
import { ProcessReviewMapper } from '../mappers/process-review.mapper';
import { UpdateProcessReviewRequest } from '../../domain/schemas/dto/request/update.process-review.request';

@Injectable()
export class ProcessReviewService implements InterfaceProcessReviewUseCase {
  constructor(
    @Inject('ProcessReviewRepository')
    private readonly processReviewRepository: InterfaceProcessReviewRepository,
    @Inject('ProcessRepository')
    private readonly processRepository: InterfaceProcessRepository,
  ) {}

  async create(
    processReview: CreateProcessReviewRequest,
  ): Promise<ProcessReviewResponse | null> {
    try {
      const requiredFields: string[] = ['idProcess', 'isSelected', 'isActive'];
      console.log(processReview, requiredFields);

      const missingFieldsMessages: string[] = validateFields(
        processReview,
        requiredFields,
      );
      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const existProcess = await this.processRepository.findById(
        processReview.idProcess,
      );
      if (!existProcess) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Process with ID ${processReview.idProcess} not found.`,
        });
      }

      const processModel: ProcessModel = new ProcessModel(
        existProcess.idProcess,
        existProcess.processNumber,
        existProcess.value,
        existProcess.category,
        existProcess.description,
        existProcess.timeExecution,
        existProcess.processObject,
        existProcess.emailManager,
        existProcess.fullNameManager,
        existProcess.phoneManager,
        existProcess.statusProcess,
        existProcess.isActive,
        new EntityModel(
          existProcess.entity.idEntity,
          existProcess.entity.ruc,
          existProcess.entity.name,
          existProcess.entity.email,
          existProcess.entity.cellphone,
          existProcess.entity.telephone,
          existProcess.entity.address,
          existProcess.entity.description,
        ),
        new StatusModel(
          existProcess.status.idStatus,
          existProcess.status.name,
          existProcess.status.description,
          new TypeStatusModel(
            existProcess.status.typeStatus.idTypeStatus,
            existProcess.status.typeStatus.name,
            existProcess.status.typeStatus.description,
          ),
        ),
        existProcess.createdAt!,
        existProcess.updatedAt!,
      );

      const processReviewModel =
        ProcessReviewMapper.fromCreateProcessReviewRequestToModel(
          processReview,
          processModel,
        );
      const createdProcessReview =
        await this.processReviewRepository.create(processReviewModel);
      if (!createdProcessReview) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to create process review.',
        });
      }
      return createdProcessReview;
    } catch (error) {
      throw error;
    }
  }

  async update(
    idProcessReview: number,
    processReview: UpdateProcessReviewRequest,
  ): Promise<ProcessReviewResponse | null> {
    try {
      if (!idProcessReview || idProcessReview <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Process review ID is required.',
        });
      }

      const requiredFields: string[] = ['idProcess', 'isActive', 'isSelected'];

      const missingFieldsMessages: string[] = validateFields(
        processReview,
        requiredFields,
      );
      if (missingFieldsMessages.length > 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: missingFieldsMessages,
        });
      }

      const existProcessReview =
        await this.processReviewRepository.findById(idProcessReview);
      if (!existProcessReview) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Process review with ID ${idProcessReview} not found.`,
        });
      }

      const existProcess = await this.processRepository.findById(
        processReview.idProcess,
      );
      if (!existProcess) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Process with ID ${processReview.idProcess} not found.`,
        });
      }

      const processModel: ProcessModel = new ProcessModel(
        existProcess.idProcess,
        existProcess.processNumber,
        existProcess.value,
        existProcess.category,
        existProcess.description,
        existProcess.timeExecution,
        existProcess.processObject,
        existProcess.emailManager,
        existProcess.fullNameManager,
        existProcess.phoneManager,
        existProcess.statusProcess,
        existProcess.isActive,
        new EntityModel(
          existProcess.entity.idEntity,
          existProcess.entity.ruc,
          existProcess.entity.name,
          existProcess.entity.email,
          existProcess.entity.cellphone,
          existProcess.entity.telephone,
          existProcess.entity.address,
          existProcess.entity.description,
        ),
        new StatusModel(
          existProcess.status.idStatus,
          existProcess.status.name,
          existProcess.status.description,
          new TypeStatusModel(
            existProcess.status.typeStatus.idTypeStatus,
            existProcess.status.typeStatus.name,
            existProcess.status.typeStatus.description,
          ),
        ),
        existProcess.createdAt!,
        existProcess.updatedAt!,
      );

      const processReviewModel =
        ProcessReviewMapper.fromUpdateProcessReviewRequestToModel(
          idProcessReview,
          processReview,
          processModel,
        );

      const updatedProcessReview = await this.processReviewRepository.update(
        idProcessReview,
        processReviewModel,
      );

      if (!updatedProcessReview) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to update process review.',
        });
      }
      return updatedProcessReview;
    } catch (error) {
      console.error('Error updating process review:', error);
      throw error;
    }
  }

  async delete(idProcessReview: number): Promise<boolean> {
    try {
      if (!idProcessReview || idProcessReview <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Process review ID is required.',
        });
      }

      const existProcessReview =
        await this.processReviewRepository.existsById(idProcessReview);
      if (!existProcessReview) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Process review with ID ${idProcessReview} not found.`,
        });
      }

      const deleted =
        await this.processReviewRepository.delete(idProcessReview);
      if (!deleted) {
        throw new RpcException({
          statusCode: statusCode.INTERNAL_SERVER_ERROR,
          message: 'Failed to delete process review.',
        });
      }
      return true;
    } catch (error) {
      console.error('Error deleting process review:', error);
      throw error;
    }
  }

  async findAll(): Promise<ProcessReviewResponse[] | null> {
    try {
      const processReviews = await this.processReviewRepository.findAll();
      if (!processReviews || processReviews.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: 'No process reviews found.',
        });
      }
      return processReviews;
    } catch (error) {
      console.error('Error finding all process reviews:', error);
      throw error;
    }
  }

  async findById(
    idProcessReview: number,
  ): Promise<ProcessReviewResponse | null> {
    try {
      if (!idProcessReview || idProcessReview <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Process review ID is required.',
        });
      }

      const processReview =
        await this.processReviewRepository.findById(idProcessReview);
      if (!processReview) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `Process review with ID ${idProcessReview} not found.`,
        });
      }
      return processReview;
    } catch (error) {
      console.error('Error finding process review by ID:', error);
      throw error;
    }
  }

  async findByProcessId(
    idProcess: number,
  ): Promise<ProcessReviewResponse[] | null> {
    try {
      if (!idProcess || idProcess <= 0) {
        throw new RpcException({
          statusCode: statusCode.BAD_REQUEST,
          message: 'Process ID is required.',
        });
      }

      const processReviews =
        await this.processReviewRepository.findByProcessId(idProcess);
      if (!processReviews || processReviews.length === 0) {
        throw new RpcException({
          statusCode: statusCode.NOT_FOUND,
          message: `No process reviews found for process ID ${idProcess}.`,
        });
      }
      return processReviews;
    } catch (error) {
      console.error('Error finding process reviews by process ID:', error);
      throw error;
    }
  }

  async existsById(idProcessReview: number): Promise<boolean> {
    return this.processReviewRepository.existsById(idProcessReview);
  }
}
