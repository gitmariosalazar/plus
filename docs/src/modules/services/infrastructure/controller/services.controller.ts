import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ServicesUseCaseService } from '../../application/services/services.service';
import { CreateServiceRequest } from '../../domain/schemas/dto/request/create.services.request';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateServiceRequest } from '../../domain/schemas/dto/request/update.services.request';

@Controller('services')
@ApiTags('Services')
export class ServicesController {
  constructor(
    private readonly servicesUseCaseService: ServicesUseCaseService,
  ) {}

  @Post('create')
  @ApiOperation({
    summary: `Method POST - Create a new service ✅`,
    description: 'Creates a new service with the provided details.',
  })
  @MessagePattern('service.create')
  async createService(@Payload() service: CreateServiceRequest) {
    return this.servicesUseCaseService.create(service);
  }

  @Put('update/:idService')
  @ApiOperation({
    summary: `Method PUT - Update an existing service ✅`,
    description: 'Updates an existing service with the provided details.',
  })
  @MessagePattern('service.update')
  async updateService(
    @Payload() payload: { idService: number; service: UpdateServiceRequest },
  ) {
    const { idService, service } = payload;
    return this.servicesUseCaseService.update(idService, service);
  }

  @Get('find-all')
  @ApiOperation({
    summary: `Method GET - Retrieve all services ✅`,
    description: 'Retrieves a list of all services.',
  })
  @MessagePattern('service.find-all')
  async findAllServices() {
    return this.servicesUseCaseService.findAll();
  }

  @Get('find-by-id/:idService')
  @ApiOperation({
    summary: `Method GET - Retrieve a service by ID ✅`,
    description: 'Retrieves a service by its ID.',
  })
  @MessagePattern('service.find-by-id')
  async findServiceById(@Payload('idService') idService: number) {
    return this.servicesUseCaseService.findById(idService);
  }

  @Get('find-by-name/:name')
  @ApiOperation({
    summary: `Method GET - Retrieve a service by name ✅`,
    description: 'Retrieves a service by its name.',
  })
  @MessagePattern('service.find-by-name')
  async findServiceByName(@Payload('name') name: string) {
    return this.servicesUseCaseService.findByName(name);
  }

  @Delete('delete/:idService')
  @ApiOperation({
    summary: `Method DELETE - Delete a service ✅`,
    description: 'Deletes a service by its ID.',
  })
  @MessagePattern('service.delete')
  async deleteService(@Payload('idService') idService: number) {
    return this.servicesUseCaseService.delete(idService);
  }
}
