import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DocumentsUseCaseService } from '../../application/services/documents.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateDocumentRequest } from '../../domain/schemas/dto/request/create.document.request';
import { UpdateDocumentRequest } from '../../domain/schemas/dto/request/update.document.request';

@Controller('documents')
@ApiTags('Documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsUseCaseService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Method POST - Create a new document ✅',
    description:
      'This endpoint allows you to create a new document in the system.',
  })
  @MessagePattern('documents.create')
  async createDocument(
    @Payload() createDocumentRequest: CreateDocumentRequest,
  ) {
    return this.documentsService.create(createDocumentRequest);
  }

  @Put('update/:idDocument')
  @ApiOperation({
    summary: 'Method PUT - Update an existing document ✅',
    description:
      'This endpoint allows you to update an existing document in the system.',
  })
  @MessagePattern('documents.update')
  async updateDocument(
    @Payload()
    payload: {
      idDocument: number;
      document: UpdateDocumentRequest;
    },
  ) {
    const { idDocument, document } = payload;
    return this.documentsService.update(idDocument, document);
  }

  @Get('find-all')
  @ApiOperation({
    summary: 'Method GET - Retrieve all documents ✅',
    description:
      'This endpoint allows you to retrieve all documents stored in the system.',
  })
  @MessagePattern('documents.find-all')
  async findAllDocuments() {
    return this.documentsService.findAll();
  }

  @Get('find-by-id/:idDocument')
  @ApiOperation({
    summary: 'Method GET - Retrieve a document by ID ✅',
    description:
      'This endpoint allows you to retrieve a specific document by its ID.',
  })
  @MessagePattern('documents.find-by-id')
  async findDocumentById(@Payload('idDocument') idDocument: number) {
    return this.documentsService.findById(idDocument);
  }

  @Get('find-by-type-document/:idTypeDocument')
  @ApiOperation({
    summary: 'Method GET - Retrieve documents by type document ID ✅',
    description:
      'This endpoint allows you to retrieve documents associated with a specific type document ID.',
  })
  @MessagePattern('documents.find-by-type-document')
  async findDocumentsByTypeDocument(
    @Payload('idTypeDocument') idTypeDocument: number,
  ) {
    return this.documentsService.findByTypeDocumentId(idTypeDocument);
  }

  @Get('find-by-process-id/:idProcess')
  @ApiOperation({
    summary: 'Method GET - Retrieve documents by process ID ✅',
    description:
      'This endpoint allows you to retrieve documents associated with a specific process ID.',
  })
  @MessagePattern('documents.find-by-process-id')
  async findDocumentsByProcessIdLegacy(
    @Payload('idProcess') idProcess: number,
  ) {
    return this.documentsService.findByProcessId(idProcess);
  }

  @Get('find-by-status/:idStatus')
  @ApiOperation({
    summary: 'Method GET - Retrieve documents by status ID ✅',
    description:
      'This endpoint allows you to retrieve documents associated with a specific status ID.',
  })
  @MessagePattern('documents.find-by-status')
  async findDocumentsByStatusId(@Payload('idStatus') idStatus: number) {
    return this.documentsService.findByStatusId(idStatus);
  }

  @Delete('delete/:idDocument')
  @ApiOperation({
    summary: 'Method DELETE - Delete a document by ID ✅',
    description:
      'This endpoint allows you to delete a specific document by its ID.',
  })
  @MessagePattern('documents.delete')
  async deleteDocument(@Payload('idDocument') idDocument: number) {
    return this.documentsService.delete(idDocument);
  }
}
