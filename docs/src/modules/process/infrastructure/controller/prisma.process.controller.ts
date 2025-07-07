import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProcessUseCaseService } from '../../application/services/process.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProcessRequest } from '../../domain/schemas/dto/request/create.process.request';

@Controller('process')
@ApiTags('Process')
export class ProcessController {
  constructor(private readonly processService: ProcessUseCaseService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Method POST - Create a new process ✅',
    description: 'Creates a new process.',
  })
  @MessagePattern('process.create')
  async createProcess(@Payload() process: CreateProcessRequest) {
    return await this.processService.create(process);
  }

  @Put('update/:idProcess')
  @ApiOperation({
    summary: 'Method PUT - Update a process ✅',
    description: 'Updates an existing process by its ID.',
  })
  @MessagePattern('process.update')
  async updateProcess(
    @Payload()
    payload: {
      idProcess: number;
      process: CreateProcessRequest;
    },
  ) {
    return await this.processService.update(payload.idProcess, payload.process);
  }

  @Get('find-by-id/:idProcess')
  @ApiOperation({
    summary: 'Method GET - Find process by ID ✅',
    description: 'Retrieves a process by its ID.',
  })
  @MessagePattern('process.find-by-id')
  async findProcessById(@Payload('idProcess') idProcess: number) {
    return await this.processService.findById(idProcess);
  }

  @Get('find-by-process-number/:processNumber')
  @ApiOperation({
    summary: 'Method GET - Find process by process number ✅',
    description: 'Retrieves a process by its process number.',
  })
  @MessagePattern('process.find-by-process-number')
  async findProcessByProcessNumber(
    @Payload('processNumber') processNumber: string,
  ) {
    return await this.processService.findByProcessNumber(processNumber);
  }

  @Get('find-all')
  @ApiOperation({
    summary: 'Method GET - Find all processes ✅',
    description: 'Retrieves a list of all processes.',
  })
  @MessagePattern('process.find-all')
  async findAllProcesses() {
    return await this.processService.findAll();
  }

  @Delete('delete/:idProcess')
  @ApiOperation({
    summary: 'Method DELETE - Delete a process ✅',
    description: 'Deletes a process by its ID.',
  })
  @MessagePattern('process.delete')
  async deleteProcess(@Payload('idProcess') idProcess: number) {
    return await this.processService.delete(idProcess);
  }
}
