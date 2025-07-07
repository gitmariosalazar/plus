import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PriorityUseCaseService } from '../../application/services/priority.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePriorityRequest } from '../../domain/schemas/dto/request/create.priority.request';
import { UpdatePriorityRequest } from '../../domain/schemas/dto/request/update.priority.request';

@Controller('priority')
@ApiTags('Priority')
export class PriorityController {
  constructor(private readonly priorityService: PriorityUseCaseService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Method POST - Create a new priority ✅',
    description: 'Creates a new priority in the system.',
  })
  @MessagePattern('priority.create')
  async createPriority(@Payload('priority') priority: CreatePriorityRequest) {
    return this.priorityService.create(priority);
  }

  @Put('update/:idPriority')
  @ApiOperation({
    summary: 'Method PUT - Update an existing priority ✅',
    description: 'Updates an existing priority in the system.',
  })
  @MessagePattern('priority.update')
  async updatePriority(
    @Payload()
    payload: {
      idPriority: number;
      priority: UpdatePriorityRequest;
    },
  ) {
    const { idPriority, priority } = payload;
    return this.priorityService.update(idPriority, priority);
  }

  @Get('find-all')
  @ApiOperation({
    summary: 'Method GET - Retrieve all priorities ✅',
    description: 'Fetches all priorities from the system.',
  })
  @MessagePattern('priority.find-all')
  async findAllPriorities() {
    return this.priorityService.findAll();
  }

  @Get('find-by-id/:idPriority')
  @ApiOperation({
    summary: 'Method GET - Retrieve a priority by ID ✅',
    description: 'Fetches a priority by its ID from the system.',
  })
  @MessagePattern('priority.find-by-id')
  async findPriorityById(@Payload('idPriority') idPriority: number) {
    return this.priorityService.findById(idPriority);
  }

  @Get('find-by-name/:name')
  @ApiOperation({
    summary: 'Method GET - Retrieve a priority by name ✅',
    description: 'Fetches a priority by its name from the system.',
  })
  @MessagePattern('priority.find-by-name')
  async findPriorityByName(@Payload('name') name: string) {
    return this.priorityService.findByName(name);
  }

  @Delete('delete/:idPriority')
  @ApiOperation({
    summary: 'Method DELETE - Delete a priority by ID ✅',
    description: 'Deletes a priority by its ID from the system.',
  })
  @MessagePattern('priority.delete')
  async deletePriority(@Payload('idPriority') idPriority: number) {
    return this.priorityService.delete(idPriority);
  }
}
