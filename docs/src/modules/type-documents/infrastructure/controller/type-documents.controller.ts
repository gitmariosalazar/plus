import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TypeDocumentsUseCaseService } from '../../application/services/type-documents.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateTypeDocumentsRequest } from '../../domain/schemas/dto/request/update.type-documents.request';
import { CreateTypeDocumentsRequest } from '../../domain/schemas/dto/request/create.type-documents.request';

@Controller('type-documents')
@ApiTags('Type Documents')
export class TypeDocumentsController {
  constructor(
    private readonly typeDocumentsService: TypeDocumentsUseCaseService,
  ) {}

  @Get('find-all')
  @ApiOperation({
    summary: 'Method GET - Find all type documents ✅',
    description: 'Retrieves a list of all type documents.',
  })
  @MessagePattern('typeDocuments.find-all')
  async findAllTypeDocuments() {
    return await this.typeDocumentsService.findAll();
  }

  @Get('find-by-id/:idTypeDocument')
  @ApiOperation({
    summary: 'Method GET - Find type document by ID ✅',
    description: 'Retrieves a type document by its ID.',
  })
  @MessagePattern('typeDocuments.find-by-id')
  async findTypeDocumentById(
    @Payload('idTypeDocument') idTypeDocument: number,
  ) {
    return await this.typeDocumentsService.findById(idTypeDocument);
  }
  @Get('find-by-title/:title')
  @ApiOperation({
    summary: 'Method GET - Find type document by title ✅',
    description: 'Retrieves a type document by its title.',
  })
  @MessagePattern('typeDocuments.find-by-title')
  async findTypeDocumentByTitle(@Payload('title') title: string) {
    return await this.typeDocumentsService.findByTitle(title);
  }

  @Post('create')
  @ApiOperation({
    summary: 'Method POST - Create a new type document ✅',
    description: 'Creates a new type document.',
  })
  @MessagePattern('typeDocuments.create')
  async createTypeDocument(
    @Payload() typeDocument: CreateTypeDocumentsRequest,
  ) {
    return await this.typeDocumentsService.create(typeDocument);
  }

  @Put('update/:idTypeDocument')
  @ApiOperation({
    summary: 'Method PUT - Update a type document ✅',
    description: 'Updates an existing type document by its ID.',
  })
  @MessagePattern('typeDocuments.update')
  async updateTypeDocument(
    @Payload()
    payload: {
      idTypeDocument: number;
      typeDocument: UpdateTypeDocumentsRequest;
    },
  ) {
    const { idTypeDocument, typeDocument } = payload;
    return await this.typeDocumentsService.update(idTypeDocument, typeDocument);
  }

  @Delete('delete/:idTypeDocument')
  @ApiOperation({
    summary: 'Method DELETE - Delete a type document ✅',
    description: 'Deletes a type document by its ID.',
  })
  @MessagePattern('typeDocuments.delete')
  async deleteTypeDocument(@Payload('idTypeDocument') idTypeDocument: number) {
    return await this.typeDocumentsService.delete(idTypeDocument);
  }
}
