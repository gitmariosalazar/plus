import { Injectable } from '@nestjs/common';
import { InterfaceProcessReviewRepository } from 'src/modules/process-review/domain/contracts/process-review.interface.repository';
import { ProcessReviewResponse } from 'src/modules/process-review/domain/schemas/dto/response/process-review.response';
import { ProcessReviewModel } from 'src/modules/process-review/domain/schemas/model/process-review.model';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';

@Injectable()
export class ProcessReviewPrismaImplementation
  implements InterfaceProcessReviewRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    processReview: ProcessReviewModel,
  ): Promise<ProcessReviewResponse | null> {
    try {
      const createdProcessReview =
        await this.prismaService.processReview.create({
          data: {
            is_active: processReview.isActiveProcessReview(),
            is_selected: processReview.getIsSelected(),
            process_code: processReview.getProcess().getIdProcess(),
          },
          include: {
            process: {
              include: {
                entity: true,
                status: {
                  include: {
                    type_status: true,
                  },
                },
              },
            },
          },
        });
      return {
        idProcessReview: createdProcessReview.id_process_review,
        process: {
          idProcess: createdProcessReview.process.id_process,
          processNumber: createdProcessReview.process.process_number,
          value: Number(createdProcessReview.process.value),
          category: createdProcessReview.process.category,
          description: createdProcessReview.process.description!,
          timeExecution: createdProcessReview.process.time_execution,
          processObject: createdProcessReview.process.process_object,
          emailManager: createdProcessReview.process.email_manager!,
          fullNameManager: createdProcessReview.process.full_name_manager!,
          phoneManager: createdProcessReview.process.phone_manager!,
          statusProcess: createdProcessReview.process.status_process,
          isActive: createdProcessReview.process.is_active,
          entity: {
            idEntity: createdProcessReview.process.entity.id_entity,
            ruc: createdProcessReview.process.entity.ruc,
            name: createdProcessReview.process.entity.name,
            email: createdProcessReview.process.entity.email,
            cellphone: createdProcessReview.process.entity.cellphone,
            telephone: createdProcessReview.process.entity.telephone,
            address: createdProcessReview.process.entity.address,
            description: createdProcessReview.process.entity.description!,
            createdAt: createdProcessReview.process.entity.created_at,
            updatedAt: createdProcessReview.process.entity.updated_at,
          },
          status: {
            idStatus: createdProcessReview.process.status?.id_status!,
            name: createdProcessReview.process.status?.name!,
            description: createdProcessReview.process.status?.description!,
            typeStatus: {
              idTypeStatus:
                createdProcessReview.process.status?.type_status
                  .id_type_status!,
              name: createdProcessReview.process.status?.type_status.name!,
              description:
                createdProcessReview.process.status?.type_status.description!,
            },
          },
        },
        isActive: createdProcessReview.is_active,
        isSelected: createdProcessReview.is_selected,
        createdAt: createdProcessReview.created_at,
        updatedAt: createdProcessReview.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(
    idProcessReview: number,
    processReview: ProcessReviewModel,
  ): Promise<ProcessReviewResponse | null> {
    try {
      const updatedProcessReview =
        await this.prismaService.processReview.update({
          where: { id_process_review: idProcessReview },
          data: {
            is_active: processReview.isActiveProcessReview(),
            is_selected: processReview.getIsSelected(),
            process_code: processReview.getProcess().getIdProcess(),
          },
          include: {
            process: {
              include: {
                entity: true,
                status: {
                  include: {
                    type_status: true,
                  },
                },
              },
            },
          },
        });
      return {
        idProcessReview: updatedProcessReview.id_process_review,
        process: {
          idProcess: updatedProcessReview.process.id_process,
          processNumber: updatedProcessReview.process.process_number,
          value: Number(updatedProcessReview.process.value),
          category: updatedProcessReview.process.category,
          description: updatedProcessReview.process.description!,
          timeExecution: updatedProcessReview.process.time_execution,
          processObject: updatedProcessReview.process.process_object,
          emailManager: updatedProcessReview.process.email_manager!,
          fullNameManager: updatedProcessReview.process.full_name_manager!,
          phoneManager: updatedProcessReview.process.phone_manager!,
          statusProcess: updatedProcessReview.process.status_process,
          isActive: updatedProcessReview.process.is_active,
          entity: {
            idEntity: updatedProcessReview.process.entity.id_entity,
            ruc: updatedProcessReview.process.entity.ruc,
            name: updatedProcessReview.process.entity.name,
            email: updatedProcessReview.process.entity.email,
            cellphone: updatedProcessReview.process.entity.cellphone,
            telephone: updatedProcessReview.process.entity.telephone,
            address: updatedProcessReview.process.entity.address,
            description: updatedProcessReview.process.entity.description!,
            createdAt: updatedProcessReview.process.entity.created_at,
            updatedAt: updatedProcessReview.process.entity.updated_at,
          },
          status: {
            idStatus: updatedProcessReview.process.status?.id_status!,
            name: updatedProcessReview.process.status?.name!,
            description: updatedProcessReview.process.status?.description!,
            typeStatus: {
              idTypeStatus:
                updatedProcessReview.process.status?.type_status
                  .id_type_status!,
              name: updatedProcessReview.process.status?.type_status.name!,
              description:
                updatedProcessReview.process.status?.type_status.description!,
            },
          },
        },
        isActive: updatedProcessReview.is_active,
        isSelected: updatedProcessReview.is_selected,
        createdAt: updatedProcessReview.created_at,
        updatedAt: updatedProcessReview.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<ProcessReviewResponse[] | null> {
    try {
      const processReviews = await this.prismaService.processReview.findMany({
        include: {
          process: {
            include: {
              entity: true,
              status: {
                include: {
                  type_status: true,
                },
              },
            },
          },
        },
      });

      return processReviews.map((processReview) => ({
        idProcessReview: processReview.id_process_review,
        process: {
          idProcess: processReview.process.id_process,
          processNumber: processReview.process.process_number,
          value: Number(processReview.process.value),
          category: processReview.process.category,
          description: processReview.process.description!,
          timeExecution: processReview.process.time_execution,
          processObject: processReview.process.process_object,
          emailManager: processReview.process.email_manager!,
          fullNameManager: processReview.process.full_name_manager!,
          phoneManager: processReview.process.phone_manager!,
          statusProcess: processReview.process.status_process,
          isActive: processReview.process.is_active,
          entity: {
            idEntity: processReview.process.entity.id_entity,
            ruc: processReview.process.entity.ruc,
            name: processReview.process.entity.name,
            email: processReview.process.entity.email,
            cellphone: processReview.process.entity.cellphone,
            telephone: processReview.process.entity.telephone,
            address: processReview.process.entity.address,
            description: processReview.process.entity.description!,
            createdAt: processReview.process.entity.created_at,
            updatedAt: processReview.process.entity.updated_at,
          },
          status: {
            idStatus: processReview.process.status?.id_status!,
            name: processReview.process.status?.name!,
            description: processReview.process.status?.description!,
            typeStatus: {
              idTypeStatus:
                processReview.process.status?.type_status.id_type_status!,
              name: processReview.process.status?.type_status.name!,
              description:
                processReview.process.status?.type_status.description!,
            },
          },
        },
        isActive: processReview.is_active,
        isSelected: processReview.is_selected,
        createdAt: processReview.created_at,
        updatedAt: processReview.updated_at,
      }));
    } catch (error) {
      throw error;
    }
  }

  async findById(
    idProcessReview: number,
  ): Promise<ProcessReviewResponse | null> {
    try {
      const processReview = await this.prismaService.processReview.findUnique({
        where: { id_process_review: idProcessReview },
        include: {
          process: {
            include: {
              entity: true,
              status: {
                include: {
                  type_status: true,
                },
              },
            },
          },
        },
      });

      if (!processReview) return null;

      return {
        idProcessReview: processReview.id_process_review,
        process: {
          idProcess: processReview.process.id_process,
          processNumber: processReview.process.process_number,
          value: Number(processReview.process.value),
          category: processReview.process.category,
          description: processReview.process.description!,
          timeExecution: processReview.process.time_execution,
          processObject: processReview.process.process_object,
          emailManager: processReview.process.email_manager!,
          fullNameManager: processReview.process.full_name_manager!,
          phoneManager: processReview.process.phone_manager!,
          statusProcess: processReview.process.status_process,
          isActive: processReview.process.is_active,
          entity: {
            idEntity: processReview.process.entity.id_entity,
            ruc: processReview.process.entity.ruc,
            name: processReview.process.entity.name,
            email: processReview.process.entity.email,
            cellphone: processReview.process.entity.cellphone,
            telephone: processReview.process.entity.telephone,
            address: processReview.process.entity.address,
            description: processReview.process.entity.description!,
            createdAt: processReview.process.entity.created_at,
            updatedAt: processReview.process.entity.updated_at,
          },
          status: {
            idStatus: processReview.process.status?.id_status!,
            name: processReview.process.status?.name!,
            description: processReview.process.status?.description!,
            typeStatus: {
              idTypeStatus:
                processReview.process.status?.type_status.id_type_status!,
              name: processReview.process.status?.type_status.name!,
              description:
                processReview.process.status?.type_status.description!,
            },
          },
        },
        isActive: processReview.is_active,
        isSelected: processReview.is_selected,
        createdAt: processReview.created_at,
        updatedAt: processReview.updated_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async findByProcessId(
    idProcess: number,
  ): Promise<ProcessReviewResponse[] | null> {
    try {
      const processReviews = await this.prismaService.processReview.findMany({
        where: { process_code: idProcess },
        include: {
          process: {
            include: {
              entity: true,
              status: {
                include: {
                  type_status: true,
                },
              },
            },
          },
        },
      });

      return processReviews.map((processReview) => ({
        idProcessReview: processReview.id_process_review,
        process: {
          idProcess: processReview.process.id_process,
          processNumber: processReview.process.process_number,
          value: Number(processReview.process.value),
          category: processReview.process.category,
          description: processReview.process.description!,
          timeExecution: processReview.process.time_execution,
          processObject: processReview.process.process_object,
          emailManager: processReview.process.email_manager!,
          fullNameManager: processReview.process.full_name_manager!,
          phoneManager: processReview.process.phone_manager!,
          statusProcess: processReview.process.status_process,
          isActive: processReview.process.is_active,
          entity: {
            idEntity: processReview.process.entity.id_entity,
            ruc: processReview.process.entity.ruc,
            name: processReview.process.entity.name,
            email: processReview.process.entity.email,
            cellphone: processReview.process.entity.cellphone,
            telephone: processReview.process.entity.telephone,
            address: processReview.process.entity.address,
            description: processReview.process.entity.description!,
            createdAt: processReview.process.entity.created_at,
            updatedAt: processReview.process.entity.updated_at,
          },
          status: {
            idStatus: processReview.process.status?.id_status!,
            name: processReview.process.status?.name!,
            description: processReview.process.status?.description!,
            typeStatus: {
              idTypeStatus:
                processReview.process.status?.type_status.id_type_status!,
              name: processReview.process.status?.type_status.name!,
              description:
                processReview.process.status?.type_status.description!,
            },
          },
        },
        isActive: processReview.is_active,
        isSelected: processReview.is_selected,
        createdAt: processReview.created_at,
        updatedAt: processReview.updated_at,
      }));
    } catch (error) {
      throw error;
    }
  }

  async existsById(idProcessReview: number): Promise<boolean> {
    try {
      const processReview = await this.prismaService.processReview.findUnique({
        where: { id_process_review: idProcessReview },
      });
      return !!processReview;
    } catch (error) {
      throw error;
    }
  }

  async delete(idProcessReview: number): Promise<boolean> {
    try {
      const deletedProcessReview =
        await this.prismaService.processReview.delete({
          where: { id_process_review: idProcessReview },
        });
      return !!deletedProcessReview;
    } catch (error) {
      throw error;
    }
  }
}
