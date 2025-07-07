import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TypeServicesUseCaseService } from '../../application/services/type-services.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTypeServicesRequest } from '../../domain/schemas/dto/request/create.type-services.request';
import { UpdateTypeServicesRequest } from '../../domain/schemas/dto/request/update.type-services.request';

@Controller('type-services')
@ApiTags('Type Services')
export class TypeServicesController {
  constructor(
    private readonly typeServicesService: TypeServicesUseCaseService,
  ) {}

  @Get('find-all')
  @ApiOperation({
    summary: 'Method GET - Find all type services ✅',
    description: 'This method retrieves all type services from the database.',
  })
  @MessagePattern('type-services.find-all')
  async findAll() {
    return this.typeServicesService.findAll();
  }

  @Get('find-by-id/:idTypeService')
  @ApiOperation({
    summary: 'Method GET - Find type service by ID ✅',
    description: 'This method retrieves a type service by its ID.',
  })
  @MessagePattern('type-services.find-by-id')
  async findById(@Payload('idTypeService') idTypeService: number) {
    return this.typeServicesService.findById(idTypeService);
  }

  @Get('find-by-name/:name')
  @ApiOperation({
    summary: 'Method GET - Find type service by name ✅',
    description: 'This method retrieves a type service by its name.',
  })
  @MessagePattern('type-services.find-by-name')
  async findByName(@Payload('name') name: string) {
    return this.typeServicesService.findByName(name);
  }

  @Post('create')
  @ApiOperation({
    summary: 'Method POST - Create a new type service ✅',
    description: 'This method creates a new type service in the database.',
  })
  @MessagePattern('type-services.create')
  async create(@Payload() typeServiceRequest: CreateTypeServicesRequest) {
    return this.typeServicesService.create(typeServiceRequest);
  }

  @Put('update/:idTypeService')
  @ApiOperation({
    summary: 'Method PUT - Update type service by ID ✅',
    description: 'This method updates an existing type service by its ID.',
  })
  @MessagePattern('type-services.update')
  async update(
    @Payload()
    payload: {
      idTypeService: number;
      typeServiceRequest: UpdateTypeServicesRequest;
    },
  ) {
    const { idTypeService, typeServiceRequest } = payload;
    return this.typeServicesService.update(idTypeService, typeServiceRequest);
  }

  @Delete('delete/:idTypeService')
  @ApiOperation({
    summary: 'Method DELETE - Delete type service by ID ✅',
    description: 'This method deletes a type service by its ID.',
  })
  @MessagePattern('type-services.delete')
  async delete(@Payload('idTypeService') idTypeService: number) {
    return this.typeServicesService.delete(idTypeService);
  }
}
