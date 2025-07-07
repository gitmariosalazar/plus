import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TypePaymentUseCaseService } from '../../application/services/type-payment.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTypePaymentRequest } from '../../domain/schemas/dto/request/create.type-payment.request';

@Controller('type-payment')
@ApiTags('Type Payment')
export class TypePaymentController {
  constructor(private readonly typePaymentService: TypePaymentUseCaseService) {}

  @Get('find-all')
  @ApiOperation({
    summary: 'Method GET - Find all type payments ✅',
    description: 'Retrieves a list of all type payments.',
  })
  @MessagePattern('typePayment.find-all')
  async findAllTypePayments() {
    return await this.typePaymentService.findAll();
  }

  @Get('find-by-id/:idTypePayment')
  @ApiOperation({
    summary: 'Method GET - Find type payment by ID ✅',
    description: 'Retrieves a type payment by its ID.',
  })
  @MessagePattern('typePayment.find-by-id')
  async findTypePaymentById(@Payload('idTypePayment') idTypePayment: number) {
    return await this.typePaymentService.findById(idTypePayment);
  }

  @Get('find-by-name/:name')
  @ApiOperation({
    summary: 'Method GET - Find type payment by name ✅',
    description: 'Retrieves a type payment by its name.',
  })
  @MessagePattern('typePayment.find-by-name')
  async findTypePaymentByName(@Payload('name') name: string) {
    return await this.typePaymentService.findByName(name);
  }

  @Post('create')
  @ApiOperation({
    summary: 'Method POST - Create a new type payment ✅',
    description: 'Creates a new type payment.',
  })
  @MessagePattern('typePayment.create')
  async createTypePayment(@Payload() typePayment: CreateTypePaymentRequest) {
    return await this.typePaymentService.create(typePayment);
  }

  @Put('update/:idTypePayment')
  @ApiOperation({
    summary: 'Method PUT - Update a type payment ✅',
    description: 'Updates an existing type payment by its ID.',
  })
  @MessagePattern('typePayment.update')
  async updateTypePayment(
    @Payload()
    payload: {
      idTypePayment: number;
      typePayment: CreateTypePaymentRequest;
    },
  ) {
    return await this.typePaymentService.update(
      payload.idTypePayment,
      payload.typePayment,
    );
  }

  @Delete('delete/:idTypePayment')
  @ApiOperation({
    summary: 'Method DELETE - Delete a type payment ✅',
    description: 'Deletes a type payment by its ID.',
  })
  @MessagePattern('typePayment.delete')
  async deleteTypePayment(@Payload('idTypePayment') idTypePayment: number) {
    return await this.typePaymentService.delete(idTypePayment);
  }
}
