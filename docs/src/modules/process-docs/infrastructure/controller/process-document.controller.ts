import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProcessDocumentUseCaseService } from '../../application/services/process-document.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProcessDocumentRequest } from '../../domain/schemas/dto/request/create.process-document.request';
import { UpdateProcessDocumentRequest } from '../../domain/schemas/dto/request/update.process-document.request';

@Controller('process-documents')
@ApiTags('Process Documents')
export class ProcessDocumentController {
  constructor(
    private readonly processDocumentService: ProcessDocumentUseCaseService,
  ) {}

  @Post('create')
  @ApiOperation({
    summary: 'Method POST - Create a new process document ✅',
    description: 'Creates a new process document with the provided details.',
  })
  @MessagePattern('processDocuments.create')
  async createProcessDocument(
    @Payload() processDocument: CreateProcessDocumentRequest,
  ) {
    return await this.processDocumentService.create(processDocument);
  }

  @Put('update/:idProcessDocument')
  @ApiOperation({
    summary: 'Method PUT - Update a process document ✅',
    description:
      'Updates an existing process document with the provided details.',
  })
  @MessagePattern('processDocuments.update')
  async updateProcessDocument(
    @Payload()
    payload: {
      idProcessDocument: number;
      processDocument: UpdateProcessDocumentRequest;
    },
  ) {
    const { idProcessDocument, processDocument } = payload;
    return await this.processDocumentService.update(
      idProcessDocument,
      processDocument,
    );
  }

  @Get('find-all')
  @ApiOperation({
    summary: 'Method GET - Find all process documents ✅',
    description: 'Retrieves a list of all process documents.',
  })
  @MessagePattern('processDocuments.find-all')
  async findAllProcessDocuments() {
    return await this.processDocumentService.findAll();
  }

  @Get('find-by-id/:idProcessDocument')
  @ApiOperation({
    summary: 'Method GET - Find process document by ID ✅',
    description: 'Retrieves a process document by its ID.',
  })
  @MessagePattern('processDocuments.find-by-id')
  async findProcessDocumentById(
    @Payload('idProcessDocument') idProcessDocument: number,
  ) {
    return await this.processDocumentService.findById(idProcessDocument);
  }

  @Get('find-by-process/:idProcess')
  @ApiOperation({
    summary: 'Method GET - Find process documents by process ID ✅',
    description:
      'Retrieves process documents associated with a specific process ID.',
  })
  @MessagePattern('processDocuments.find-by-process')
  async findProcessDocumentsByProcessId(
    @Payload('idProcess') idProcess: number,
  ) {
    return await this.processDocumentService.findByProcessId(idProcess);
  }

  @Get('find-by-document/:idDocument')
  @ApiOperation({
    summary: 'Method GET - Find process documents by document ID ✅',
    description:
      'Retrieves process documents associated with a specific document ID.',
  })
  @MessagePattern('processDocuments.find-by-document')
  async findProcessDocumentsByDocumentId(
    @Payload('idDocument') idDocument: number,
  ) {
    return await this.processDocumentService.findByDocumentId(idDocument);
  }

  @Delete('delete/:idProcessDocument')
  @ApiOperation({
    summary: 'Method DELETE - Delete a process document ✅',
    description: 'Deletes a process document by its ID.',
  })
  @MessagePattern('processDocuments.delete')
  async deleteProcessDocument(
    @Payload('idProcessDocument') idProcessDocument: number,
  ) {
    return await this.processDocumentService.delete(idProcessDocument);
  }
}
