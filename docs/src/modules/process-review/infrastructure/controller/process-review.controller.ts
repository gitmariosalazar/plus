import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProcessReviewService } from '../../application/services/process-review.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProcessReviewRequest } from '../../domain/schemas/dto/request/create.process-review.request';

@Controller('process-review')
@ApiTags('Process Review')
export class ProcessReviewController {
  constructor(private readonly processReviewService: ProcessReviewService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Method POST - Create a new process review ✅',
    description: 'Creates a new process review.',
  })
  @MessagePattern('process-review.create')
  async createProcessReview(
    @Payload() processReview: CreateProcessReviewRequest,
  ) {
    return await this.processReviewService.create(processReview);
  }

  @Put('update/:idProcessReview')
  @ApiOperation({
    summary: 'Method PUT - Update a process review ✅',
    description: 'Updates an existing process review by its ID.',
  })
  @MessagePattern('process-review.update')
  async updateProcessReview(
    @Payload()
    payload: {
      idProcessReview: number;
      processReview: CreateProcessReviewRequest;
    },
  ) {
    return await this.processReviewService.update(
      payload.idProcessReview,
      payload.processReview,
    );
  }

  @Get('find-by-id/:idProcessReview')
  @ApiOperation({
    summary: 'Method GET - Find process review by ID ✅',
    description: 'Retrieves a process review by its ID.',
  })
  @MessagePattern('process-review.find-by-id')
  async findProcessReviewById(
    @Payload('idProcessReview') idProcessReview: number,
  ) {
    return await this.processReviewService.findById(idProcessReview);
  }

  @Get('find-all')
  @ApiOperation({
    summary: 'Method GET - Find all process reviews ✅',
    description: 'Retrieves all process reviews.',
  })
  @MessagePattern('process-review.find-all')
  async findAllProcessReviews() {
    return await this.processReviewService.findAll();
  }

  @Get('find-by-process-id/:idProcess')
  @ApiOperation({
    summary: 'Method GET - Find process reviews by process ID ✅',
    description: 'Retrieves process reviews by their associated process ID.',
  })
  @MessagePattern('process-review.find-by-process-id')
  async findProcessReviewsByProcessId(@Payload('idProcess') idProcess: number) {
    return await this.processReviewService.findByProcessId(idProcess);
  }

  @Delete('delete/:idProcessReview')
  @ApiOperation({
    summary: 'Method DELETE - Delete a process review ✅',
    description: 'Deletes a process review by its ID.',
  })
  @MessagePattern('process-review.delete')
  async deleteProcessReview(
    @Payload('idProcessReview') idProcessReview: number,
  ) {
    return await this.processReviewService.delete(idProcessReview);
  }
}
