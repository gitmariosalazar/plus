import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DetailInvoiceUseCaseService } from 'src/modules/invoices/application/services/detail-invoice.service';
import { CreateDetailInvoiceRequest } from 'src/modules/invoices/domain/schemas/dto/request/create.detail-invoice.request';

@Controller('detail-invoice')
@ApiTags('Detail Invoice')
export class DetailInvoiceController {
  constructor(
    private readonly detailInvoiceService: DetailInvoiceUseCaseService,
  ) {}

  @Post('create')
  @ApiOperation({
    summary: 'Method POST - Create a new Detail Invoice ✅',
    description:
      'This method allows you to create a new detail invoice in the system.',
  })
  @MessagePattern('detailInvoice.create')
  async createDetailInvoice(
    @Payload() detailInvoice: CreateDetailInvoiceRequest,
  ) {
    console.log(
      `[DetailInvoiceController] Received new invoice...`,
      detailInvoice,
    );
    return this.detailInvoiceService.create(detailInvoice);
  }

  @Put('update/:idDetailInvoice')
  @ApiOperation({
    summary: 'Method PUT - Update a Detail Invoice ✅',
    description:
      'This method allows you to update an existing detail invoice in the system.',
  })
  @MessagePattern('detailInvoice.update')
  async updateDetailInvoice(
    @Payload()
    payload: {
      idDetailInvoice: number;
      detailInvoice: CreateDetailInvoiceRequest;
    },
  ) {
    const { idDetailInvoice, detailInvoice } = payload;
    return this.detailInvoiceService.update(idDetailInvoice, detailInvoice);
  }

  @Get('find-by-id/:idDetailInvoice')
  @ApiOperation({
    summary: 'Method GET - Find Detail Invoice by ID ✅',
    description:
      'This method allows you to find a detail invoice by its ID in the system.',
  })
  @MessagePattern('detailInvoice.find-by-id')
  async findByIdDetailInvoice(
    @Payload('idDetailInvoice') idDetailInvoice: number,
  ) {
    return this.detailInvoiceService.findById(idDetailInvoice);
  }

  @Get('find-all')
  @ApiOperation({
    summary: 'Method GET - Find all Detail Invoices ✅',
    description:
      'This method allows you to find all detail invoices in the system.',
  })
  @MessagePattern('detailInvoice.find-all')
  async findAllDetailInvoices() {
    console.log('[DetailInvoiceController]- [Documents Microservices] Finding all detail invoices...');
    return this.detailInvoiceService.findAll();
  }

  @Delete('delete/:idDetailInvoice')
  @ApiOperation({
    summary: 'Method DELETE - Delete a Detail Invoice ✅',
    description:
      'This method allows you to delete a detail invoice by its ID in the system.',
  })
  @MessagePattern('detailInvoice.delete')
  async deleteDetailInvoice(
    @Payload('idDetailInvoice') idDetailInvoice: number,
  ) {
    return this.detailInvoiceService.delete(idDetailInvoice);
  }

  @Get('find-by-process-id/:idProcess')
  @ApiOperation({
    summary: 'Method GET - Find Detail Invoices by Process ID ✅',
    description:
      'This method allows you to find detail invoices by their associated process ID in the system.',
  })
  @MessagePattern('detailInvoice.find-by-process-id')
  async findByProcessId(@Payload('idProcess') idProcess: number) {
    return this.detailInvoiceService.findByProcessId(idProcess);
  }

  @Get('find-by-entity-id/:idEntity')
  @ApiOperation({
    summary: 'Method GET - Find Detail Invoices by Entity ID ✅',
    description:
      'This method allows you to find detail invoices by their associated entity ID in the system.',
  })
  @MessagePattern('detailInvoice.find-by-entity-id')
  async findByEntityId(@Payload('idEntity') idEntity: number) {
    return this.detailInvoiceService.findByEntityId(idEntity);
  }

  @Get('find-by-status-id/:idStatus')
  @ApiOperation({
    summary: 'Method GET - Find Detail Invoices by Status ID ✅',
    description:
      'This method allows you to find detail invoices by their associated status ID in the system.',
  })
  @MessagePattern('detailInvoice.find-by-status-id')
  async findByStatusId(@Payload('idStatus') idStatus: number) {
    return this.detailInvoiceService.findByStatusId(idStatus);
  }

  @Get('find-by-type-payment-id/:idTypePayment')
  @ApiOperation({
    summary: 'Method GET - Find Detail Invoices by Type Payment ID ✅',
    description:
      'This method allows you to find detail invoices by their associated type payment ID in the system.',
  })
  @MessagePattern('detailInvoice.find-by-type-payment-id')
  async findByTypePaymentId(@Payload('idTypePayment') idTypePayment: number) {
    return this.detailInvoiceService.findByTypePaymentId(idTypePayment);
  }

  @Get('find-by-document-id/:idDocument')
  @ApiOperation({
    summary: 'Method GET - Find Detail Invoices by Document ID ✅',
    description:
      'This method allows you to find detail invoices by their associated document ID in the system.',
  })
  @MessagePattern('detailInvoice.find-by-document-id')
  async findByDocumentId(@Payload('idDocument') idDocument: number) {
    return this.detailInvoiceService.findByDocumentId(idDocument);
  }

  @Get('find-by-invoice-number/:invoiceNumber')
  @ApiOperation({
    summary: 'Method GET - Find Detail Invoice by Invoice Number ✅',
    description:
      'This method allows you to find a detail invoice by its invoice number in the system.',
  })
  @MessagePattern('detailInvoice.find-by-invoice-number')
  async findByInvoiceNumber(@Payload('invoiceNumber') invoiceNumber: string) {
    return this.detailInvoiceService.findByInvoiceNumber(invoiceNumber);
  }

  @Get('find-by-email-responsability/:emailResponsability')
  @ApiOperation({
    summary: 'Method GET - Find Detail Invoices by Email Responsibility ✅',
    description:
      'This method allows you to find detail invoices by their associated email responsibility in the system.',
  })
  @MessagePattern('detailInvoice.find-by-email-responsability')
  async findByEmailResponsability(
    @Payload('emailResponsability') emailResponsability: string,
  ) {
    return this.detailInvoiceService.findByEmailResponsability(
      emailResponsability,
    );
  }

  @Get('find-by-emission-date/:emissionDate')
  @ApiOperation({
    summary: 'Method GET - Find Detail Invoices by Emission Date ✅',
    description:
      'This method allows you to find detail invoices by their emission date in the system.',
  })
  @MessagePattern('detailInvoice.find-by-emission-date')
  async findByEmissionDate(@Payload('emissionDate') emissionDate: Date) {
    return this.detailInvoiceService.findByEmissionDate(emissionDate);
  }
}
