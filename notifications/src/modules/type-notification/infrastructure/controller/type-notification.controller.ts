import { Controller, Post, Get, Delete, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TypeNotificationUseCaseService } from '../../application/services/type-notification.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTypeNotificationRequest } from '../../domain/schemas/dto/request/create.type-notification.request';
import { UpdateTypeNotificationRequest } from '../../domain/schemas/dto/request/update.type-notification.request';

@Controller('type-notification')
@ApiTags('Type Notification')
export class TypeNotificationController {
  constructor(
    private readonly typeNotificationService: TypeNotificationUseCaseService,
  ) {}

  @Post('create')
  @ApiOperation({
    summary: 'Method POST - Create a new type of notification ✅',
    description:
      'Creates a new type of notification with the provided details.',
  })
  @MessagePattern('typeNotification.create')
  async createTypeNotification(
    @Payload() typeNotification: CreateTypeNotificationRequest,
  ) {
    return this.typeNotificationService.create(typeNotification);
  }

  @Put('update/:idTypeNotification')
  @ApiOperation({
    summary: 'Method PUT - Update an existing type of notification ✅',
    description:
      'Updates an existing type of notification with the provided details.',
  })
  @MessagePattern('typeNotification.update')
  async updateTypeNotification(
    @Payload()
    payload: {
      idTypeNotification: number;
      typeNotification: UpdateTypeNotificationRequest;
    },
  ) {
    const { idTypeNotification, typeNotification } = payload;
    return this.typeNotificationService.update(
      idTypeNotification,
      typeNotification,
    );
  }

  @Get('find-all')
  @ApiOperation({
    summary: 'Method GET - Retrieve all types of notifications ✅',
    description: 'Fetches all types of notifications from the database.',
  })
  @MessagePattern('typeNotification.findAll')
  async findAllTypeNotifications() {
    return this.typeNotificationService.findAll();
  }

  @Get('find-by-id/:idTypeNotification')
  @ApiOperation({
    summary: 'Method GET - Retrieve a type of notification by ID ✅',
    description: 'Fetches a type of notification by its ID from the database.',
  })
  @MessagePattern('typeNotification.find-by-id')
  async findTypeNotificationById(
    @Payload('idTypeNotification') idTypeNotification: number,
  ) {
    return this.typeNotificationService.findById(idTypeNotification);
  }

  @Delete('delete/:idTypeNotification')
  @ApiOperation({
    summary: 'Method DELETE - Delete a type of notification by ID ✅',
    description: 'Deletes a type of notification by its ID from the database.',
  })
  @MessagePattern('typeNotification.delete')
  async deleteTypeNotification(
    @Payload('idTypeNotification') idTypeNotification: number,
  ) {
    return this.typeNotificationService.delete(idTypeNotification);
  }

  @Get('find-by-name/:name')
  @ApiOperation({
    summary: 'Method GET - Retrieve a type of notification by name ✅',
    description:
      'Fetches a type of notification by its name from the database.',
  })
  @MessagePattern('typeNotification.find-by-name')
  async findTypeNotificationByName(@Payload('name') name: string) {
    return this.typeNotificationService.findByName(name);
  }
}
