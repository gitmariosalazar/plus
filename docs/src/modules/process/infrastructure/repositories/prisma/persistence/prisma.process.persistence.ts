import { Injectable } from '@nestjs/common';
import { InterfaceProcessRepository } from 'src/modules/process/domain/contracts/process.interface.repository';
import { ProcessResponse } from 'src/modules/process/domain/schemas/dto/response/process.response';
import { ProcessModel } from 'src/modules/process/domain/schemas/model/process.model';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';

@Injectable()
export class ProcessPrismaImplementation implements InterfaceProcessRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(process: ProcessModel): Promise<ProcessResponse | null> {
    try {
      const createdProcess = await this.prismaService.process.create({
        data: {
          process_number: process.getProcessNumber(),
          value: process.getValue(),
          category: process.getCategory(),
          description: process.getDescription(),
          time_execution: process.getTimeExecution(),
          process_object: process.getProcessObject(),
          email_manager: process.getEmailManager(),
          full_name_manager: process.getFullNameManager(),
          phone_manager: process.getPhoneManager(),
          id_entity: process.getEntity().getIdEntity(),
          id_status: process.getStatus().getIdStatus(),
          is_active: process.getIsActive(),
          status_process: process.getStatusProcess(),
        },
        include: {
          entity: true,
          status: {
            include: {
              type_status: true,
            },
          },
        },
      });

      return {
        idProcess: createdProcess.id_process,
        processNumber: createdProcess.process_number,
        value:
          createdProcess.value !== null && createdProcess.value !== undefined
            ? Number(createdProcess.value)
            : 0,
        category: createdProcess.category,
        description: createdProcess.description!,
        timeExecution: createdProcess.time_execution,
        processObject: createdProcess.process_object,
        emailManager: createdProcess.email_manager!,
        fullNameManager: createdProcess.full_name_manager!,
        phoneManager: createdProcess.phone_manager!,
        statusProcess: createdProcess.status_process,
        isActive: createdProcess.is_active,
        entity: {
          idEntity: createdProcess.entity.id_entity,
          ruc: createdProcess.entity.ruc,
          name: createdProcess.entity.name,
          email: createdProcess.entity.email,
          cellphone: createdProcess.entity.cellphone,
          telephone: createdProcess.entity.telephone,
          address: createdProcess.entity.address,
          description: createdProcess.entity.description!,
        },
        status: {
          idStatus:
            createdProcess.status === null
              ? 0
              : createdProcess.status.id_status,
          name: createdProcess.status ? createdProcess.status.name : '',
          description:
            createdProcess.status === null
              ? ''
              : createdProcess.status.description!,
          typeStatus: {
            idTypeStatus:
              createdProcess.status?.type_status.id_type_status ?? 0,
            name: createdProcess.status?.type_status.name ?? '',
            description: createdProcess.status?.type_status.description ?? '',
          },
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async update(
    idProcess: number,
    process: ProcessModel,
  ): Promise<ProcessResponse | null> {
    try {
      const updatedProcess = await this.prismaService.process.update({
        where: { id_process: idProcess },
        data: {
          process_number: process.getProcessNumber(),
          value: process.getValue(),
          category: process.getCategory(),
          description: process.getDescription(),
          time_execution: process.getTimeExecution(),
          process_object: process.getProcessObject(),
          email_manager: process.getEmailManager(),
          full_name_manager: process.getFullNameManager(),
          phone_manager: process.getPhoneManager(),
          id_entity: process.getEntity().getIdEntity(),
          id_status: process.getStatus().getIdStatus(),
          is_active: process.getIsActive(),
          status_process: process.getStatusProcess(),
        },
        include: {
          entity: true,
          status: {
            include: {
              type_status: true,
            },
          },
        },
      });

      return {
        idProcess: updatedProcess.id_process,
        processNumber: updatedProcess.process_number,
        value:
          updatedProcess.value !== null && updatedProcess.value !== undefined
            ? Number(updatedProcess.value)
            : 0,
        category: updatedProcess.category,
        description: updatedProcess.description!,
        timeExecution: updatedProcess.time_execution,
        processObject: updatedProcess.process_object,
        emailManager: updatedProcess.email_manager!,
        fullNameManager: updatedProcess.full_name_manager!,
        phoneManager: updatedProcess.phone_manager!,
        statusProcess: updatedProcess.status_process,
        isActive: updatedProcess.is_active,
        entity: {
          idEntity: updatedProcess.entity.id_entity,
          ruc: updatedProcess.entity.ruc,
          name: updatedProcess.entity.name,
          email: updatedProcess.entity.email,
          cellphone: updatedProcess.entity.cellphone,
          telephone: updatedProcess.entity.telephone,
          address: updatedProcess.entity.address,
          description: updatedProcess.entity.description!,
        },
        status: {
          idStatus:
            updatedProcess.status === null
              ? 0
              : updatedProcess.status.id_status,
          name: updatedProcess.status ? updatedProcess.status.name : '',
          description:
            updatedProcess.status === null
              ? ''
              : updatedProcess.status.description!,
          typeStatus: {
            idTypeStatus:
              updatedProcess.status?.type_status.id_type_status ?? 0,
            name:
              updatedProcess.status?.type_status.name !== null
                ? String(updatedProcess.status?.type_status.name)
                : '',
            description:
              updatedProcess.status?.type_status.description !== null
                ? String(updatedProcess.status?.type_status.description)
                : '',
          },
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<ProcessResponse[]> {
    try {
      const processes = await this.prismaService.process.findMany({
        include: {
          entity: true,
          status: {
            include: {
              type_status: true,
            },
          },
        },
      });

      return processes.map((process) => ({
        idProcess: process.id_process,
        processNumber: process.process_number,
        value:
          process.value !== null && process.value !== undefined
            ? Number(process.value)
            : 0,
        category: process.category,
        description: process.description!,
        timeExecution: process.time_execution,
        processObject: process.process_object,
        emailManager: process.email_manager!,
        fullNameManager: process.full_name_manager!,
        phoneManager: process.phone_manager!,
        statusProcess: process.status_process,
        isActive: process.is_active,
        entity: {
          idEntity: process.entity.id_entity,
          ruc: process.entity.ruc,
          name: process.entity.name,
          email: process.entity.email,
          cellphone: process.entity.cellphone,
          telephone: process.entity.telephone,
          address: process.entity.address,
          description: process.entity.description!,
        },
        status: {
          idStatus: process.status === null ? 0 : process.status.id_status,
          name: process.status ? process.status.name : '',
          description:
            process.status === null ? '' : String(process.status.description!),
          typeStatus: {
            idTypeStatus: process.status?.type_status.id_type_status ?? 0,
            name: String(process.status?.type_status.name) ?? '',
            description: String(process.status?.type_status.description) ?? '',
          },
        },
      }));
    } catch (error) {
      throw error;
    }
  }

  async findById(idProcess: number): Promise<ProcessResponse | null> {
    try {
      const process = await this.prismaService.process.findUnique({
        where: { id_process: idProcess },
        include: {
          entity: true,
          status: {
            include: {
              type_status: true,
            },
          },
        },
      });

      if (!process) {
        return null;
      }

      return {
        idProcess: process.id_process,
        processNumber: process.process_number,
        value:
          process.value !== null && process.value !== undefined
            ? Number(process.value)
            : 0,
        category: process.category,
        description: process.description!,
        timeExecution: process.time_execution,
        processObject: process.process_object,
        emailManager: process.email_manager!,
        fullNameManager: process.full_name_manager!,
        phoneManager: process.phone_manager!,
        statusProcess: process.status_process,
        isActive: process.is_active,
        entity: {
          idEntity: process.entity.id_entity,
          ruc: process.entity.ruc,
          name: process.entity.name,
          email: process.entity.email,
          cellphone: process.entity.cellphone,
          telephone: process.entity.telephone,
          address: process.entity.address,
          description: process.entity.description!,
        },
        status: {
          idStatus: process.status === null ? 0 : process.status.id_status,
          name: process.status ? String(process.status.name) : '',
          description:
            process.status === null ? '' : String(process.status.description!),
          typeStatus: {
            idTypeStatus: process.status?.type_status.id_type_status ?? 0,
            name: String(process.status?.type_status.name) ?? '',
            description: String(process.status?.type_status.description) ?? '',
          },
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async findByProcessNumber(
    processNumber: string,
  ): Promise<ProcessResponse | null> {
    try {
      const process = await this.prismaService.process.findFirst({
        where: { process_number: processNumber },
        include: {
          entity: true,
          status: {
            include: {
              type_status: true,
            },
          },
        },
      });

      if (!process) {
        return null;
      }

      return {
        idProcess: process.id_process,
        processNumber: process.process_number,
        value:
          process.value !== null && process.value !== undefined
            ? Number(process.value)
            : 0,
        category: process.category,
        description: process.description!,
        timeExecution: process.time_execution,
        processObject: process.process_object,
        emailManager: process.email_manager!,
        fullNameManager: process.full_name_manager!,
        phoneManager: process.phone_manager!,
        statusProcess: process.status_process,
        isActive: process.is_active,
        entity: {
          idEntity: process.entity.id_entity,
          ruc: process.entity.ruc,
          name: process.entity.name,
          email: process.entity.email,
          cellphone: process.entity.cellphone,
          telephone: process.entity.telephone,
          address: process.entity.address,
          description: process.entity.description!,
        },
        status: {
          idStatus: process.status === null ? 0 : process.status.id_status,
          name: String(process.status ? process.status.name : ''),
          description: String(
            process.status === null ? '' : String(process.status.description!),
          ),
          typeStatus: {
            idTypeStatus:
              Number(process.status?.type_status.id_type_status) ?? 0,
            name: String(process.status?.type_status.name) ?? '',
            description: String(process.status?.type_status.description) ?? '',
          },
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(idProcess: number): Promise<boolean> {
    try {
      const deleted = await this.prismaService.process.delete({
        where: { id_process: idProcess },
      });

      return !!deleted;
    } catch (error) {
      throw error;
    }
  }

  async existsById(idProcess: number): Promise<boolean> {
    try {
      const process = await this.prismaService.process.findUnique({
        where: { id_process: idProcess },
      });

      return !!process;
    } catch (error) {
      throw error;
    }
  }

  async existsByProcessNumber(processNumber: string): Promise<boolean> {
    try {
      const process = await this.prismaService.process.findFirst({
        where: { process_number: processNumber },
      });

      return !!process;
    } catch (error) {
      throw error;
    }
  }
}
