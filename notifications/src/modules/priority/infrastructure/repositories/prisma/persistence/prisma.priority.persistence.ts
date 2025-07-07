import { Injectable } from '@nestjs/common';
import { InterfacePriorityRepository } from 'src/modules/priority/domain/contracts/priority.interface.repository';
import { PriorityResponse } from 'src/modules/priority/domain/schemas/dto/response/priority.response';
import { PriorityModel } from 'src/modules/priority/domain/schemas/model/priority.model';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { PrismaPriorityAdapter } from '../adapters/prisma.priority.adapter';

@Injectable()
export class PrismaPriorityPersistence implements InterfacePriorityRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(priority: PriorityModel): Promise<PriorityResponse | null> {
    try {
      const createdPriority = await this.prismaService.priority.create({
        data: {
          name: priority.getName(),
          description: priority.getDescription(),
        },
      });

      if (!createdPriority) {
        return null;
      }

      return PrismaPriorityAdapter.fromPrismaPriorityToResponse(
        createdPriority,
      );
    } catch (error) {
      throw error;
    }
  }

  async update(
    idPriority: number,
    priority: PriorityModel,
  ): Promise<PriorityResponse | null> {
    try {
      const updatedPriority = await this.prismaService.priority.update({
        where: { id_priority: idPriority },
        data: {
          name: priority.getName(),
          description: priority.getDescription(),
        },
      });

      if (!updatedPriority) {
        return null;
      }

      return PrismaPriorityAdapter.fromPrismaPriorityToResponse(
        updatedPriority,
      );
    } catch (error) {
      throw error;
    }
  }

  async delete(idPriority: number): Promise<boolean> {
    try {
      const deletedPriority = await this.prismaService.priority.delete({
        where: { id_priority: idPriority },
      });

      return !!deletedPriority;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<PriorityResponse[]> {
    try {
      const priorities = await this.prismaService.priority.findMany();
      return priorities.map(PrismaPriorityAdapter.fromPrismaPriorityToResponse);
    } catch (error) {
      throw error;
    }
  }

  async findById(idPriority: number): Promise<PriorityResponse | null> {
    try {
      const priority = await this.prismaService.priority.findUnique({
        where: { id_priority: idPriority },
      });

      if (!priority) {
        return null;
      }

      return PrismaPriorityAdapter.fromPrismaPriorityToResponse(priority);
    } catch (error) {
      throw error;
    }
  }

  async findByName(name: string): Promise<PriorityResponse | null> {
    try {
      const priority = await this.prismaService.priority.findFirst({
        where: { name },
      });

      if (!priority) {
        return null;
      }

      return PrismaPriorityAdapter.fromPrismaPriorityToResponse(priority);
    } catch (error) {
      throw error;
    }
  }

  async existsById(idPriority: number): Promise<boolean> {
    try {
      const count = await this.prismaService.priority.findUnique({
        where: { id_priority: idPriority },
      });
      return !!count;
    } catch (error) {
      throw error;
    }
  }

  async existsByName(name: string): Promise<boolean> {
    try {
      const count = await this.prismaService.priority.findFirst({
        where: { name },
      });
      return !!count;
    } catch (error) {
      throw error;
    }
  }
}
