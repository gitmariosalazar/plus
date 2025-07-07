import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TypeStatusUseCaseService } from '../../application/services/type-status.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTypeStatusRequest } from '../../domain/schemas/dto/request/create.type-status.request';
import { UpdateTypeStatusRequest } from '../../domain/schemas/dto/request/update.type-status.request';

@Controller('type-status')
@ApiTags('Type Status')
export class TypeStatusController {
  constructor(private readonly typeStatusService: TypeStatusUseCaseService) {}

  @Get('find-all')
  @ApiOperation({
    summary: 'Method GET - Find all type statuses ✅',
    description: 'Retrieve a list of all type statuses.',
  })
  @MessagePattern('typeStatus.find-all')
  async findAllTypeStatuses() {
    return this.typeStatusService.findAllTypeStatus();
  }

  @Get('find-by-id/:idTypeStatus')
  @ApiOperation({
    summary: 'Method GET - Find type status by ID ✅',
    description: 'Retrieve a type status by its ID.',
  })
  @MessagePattern('typeStatus.find-by-id')
  async findTypeStatusById(@Payload('idTypeStatus') idTypeStatus: number) {
    return this.typeStatusService.findTypeStatusById(idTypeStatus);
  }

  @Get('find-by-name/:name')
  @ApiOperation({
    summary: 'Method GET - Find type status by name ✅',
    description: 'Retrieve a type status by its name.',
  })
  @MessagePattern('typeStatus.find-by-name')
  async findTypeStatusByName(@Payload('name') name: string) {
    return this.typeStatusService.findTypeStatusByName(name);
  }

  @Post('create')
  @ApiOperation({
    summary: 'Method POST - Create a new type status ✅',
    description: 'Create a new type status in the system.',
  })
  @MessagePattern('typeStatus.create')
  async createTypeStatus(
    @Payload() typeStatusRequest: CreateTypeStatusRequest,
  ) {
    return this.typeStatusService.createTypeStatus(typeStatusRequest);
  }

  @Put('update/:idTypeStatus')
  @ApiOperation({
    summary: 'Method PUT - Update type status by ID ✅',
    description: 'Update an existing type status by its ID.',
  })
  @MessagePattern('typeStatus.update')
  async updateTypeStatus(
    @Payload()
    payload: {
      idTypeStatus: number;
      typeStatusRequest: UpdateTypeStatusRequest;
    },
  ) {
    const { idTypeStatus, typeStatusRequest } = payload;
    return this.typeStatusService.updateTypeStatus(
      idTypeStatus,
      typeStatusRequest,
    );
  }

  @Delete('delete/:idTypeStatus')
  @ApiOperation({
    summary: 'Method DELETE - Delete type status by ID ✅',
    description: 'Delete a type status by its ID.',
  })
  @MessagePattern('typeStatus.delete')
  async deleteTypeStatus(@Payload('idTypeStatus') idTypeStatus: number) {
    return this.typeStatusService.deleteTypeStatus(idTypeStatus);
  }
}
