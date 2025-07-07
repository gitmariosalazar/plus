import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StatusUseCaseService } from '../../application/services/status.service';
import { CreateStatusRequest } from '../../domain/schemas/dto/request/create.status.request';

@Controller('status')
@ApiTags('Status')
export class StatusController {
  constructor(private readonly statusService: StatusUseCaseService) {}

  @Get('find-all')
  @ApiOperation({
    summary: 'Method GET - Find all status ✅',
    description: 'Retrieves a list of all status.',
  })
  @MessagePattern('status.find-all')
  async findAllStatus() {
    return await this.statusService.findAll();
  }

  @Get('find-by-id/:idStatus')
  @ApiOperation({
    summary: 'Method GET - Find status by ID ✅',
    description: 'Retrieves a status by its ID.',
  })
  @MessagePattern('status.find-by-id')
  async findStatusById(@Payload('idStatus') idStatus: number) {
    return await this.statusService.findById(idStatus);
  }

  @Get('find-by-name/:name')
  @ApiOperation({
    summary: 'Method GET - Find status by name ✅',
    description: 'Retrieves a status by its name.',
  })
  @MessagePattern('status.find-by-name')
  async findStatusByName(@Payload('name') name: string) {
    return await this.statusService.findByName(name);
  }

  @Post('create')
  @ApiOperation({
    summary: 'Method POST - Create a new status ✅',
    description: 'Creates a new status.',
  })
  @MessagePattern('status.create')
  async createStatus(@Payload() status: CreateStatusRequest) {
    return await this.statusService.create(status);
  }

  @Put('update/:idStatus')
  @ApiOperation({
    summary: 'Method PUT - Update a status ✅',
    description: 'Updates an existing status by its ID.',
  })
  @MessagePattern('status.update')
  async updateStatus(
    @Payload()
    payload: {
      idStatus: number;
      status: CreateStatusRequest;
    },
  ) {
    return await this.statusService.update(payload.idStatus, payload.status);
  }

  @Delete('delete/:idStatus')
  @ApiOperation({
    summary: 'Method DELETE - Delete a status ✅',
    description: 'Deletes a status by its ID.',
  })
  @MessagePattern('status.delete')
  async deleteStatus(@Payload('idStatus') idStatus: number) {
    return await this.statusService.delete(idStatus);
  }
}
