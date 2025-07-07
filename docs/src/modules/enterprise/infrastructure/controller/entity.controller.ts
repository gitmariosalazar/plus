import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EntityUseCaseService } from '../../application/services/entity.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateEntityRequest } from '../../domain/schemas/dto/request/create.entity.request';

@Controller('entity')
@ApiTags('Entity')
export class EntityController {
  constructor(private readonly entityService: EntityUseCaseService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Method POST - Create a new Entity ✅',
    description: 'Creates a new Entity.',
  })
  @MessagePattern('entity.create')
  async createEntity(@Payload() entity: CreateEntityRequest) {
    return await this.entityService.create(entity);
  }

  @Put('update/:idEntity')
  @ApiOperation({
    summary: 'Method PUT - Update an Entity ✅',
    description: 'Updates an existing Entity by its ID.',
  })
  @MessagePattern('entity.update')
  async updateEntity(
    @Payload()
    payload: {
      idEntity: number;
      entity: CreateEntityRequest;
    },
  ) {
    return await this.entityService.update(payload.idEntity, payload.entity);
  }

  @Get('find-by-id/:idEntity')
  @ApiOperation({
    summary: 'Method GET - Find Entity by ID ✅',
    description: 'Retrieves an Entity by its ID.',
  })
  @MessagePattern('entity.find-by-id')
  async findEntityById(@Payload('idEntity') idEntity: number) {
    return await this.entityService.findById(idEntity);
  }

  @Get('find-by-ruc/:ruc')
  @ApiOperation({
    summary: 'Method GET - Find Entity by RUC ✅',
    description: 'Retrieves an Entity by its RUC.',
  })
  @MessagePattern('entity.find-by-ruc')
  async findEntityByRuc(@Payload('ruc') ruc: string) {
    return await this.entityService.findByRuc(ruc);
  }

  @Get('find-all')
  @ApiOperation({
    summary: 'Method GET - Find all Entities ✅',
    description: 'Retrieves a list of all Entities.',
  })
  @MessagePattern('entity.find-all')
  async findAllEntities() {
    return await this.entityService.findAll();
  }

  @Delete('delete/:idEntity')
  @ApiOperation({
    summary: 'Method DELETE - Delete an Entity ✅',
    description: 'Deletes an Entity by its ID.',
  })
  @MessagePattern('entity.delete')
  async deleteEntity(@Payload('idEntity') idEntity: number) {
    return await this.entityService.delete(idEntity);
  }
}
