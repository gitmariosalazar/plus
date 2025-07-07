import { CreateProcessRequest } from '../../domain/schemas/dto/request/create.process.request';
import { UpdateProcessRequest } from '../../domain/schemas/dto/request/update.process.request';
import { ProcessResponse } from '../../domain/schemas/dto/response/process.response';

export interface InterfaceProcessUseCase {
  create(process: CreateProcessRequest): Promise<ProcessResponse | null>;
  update(
    idProcess: number,
    process: UpdateProcessRequest,
  ): Promise<ProcessResponse | null>;
  findById(idProcess: number): Promise<ProcessResponse | null>;
  findByProcessNumber(processNumber: string): Promise<ProcessResponse | null>;
  findAll(): Promise<ProcessResponse[]>;
  existsByProcessNumber(processNumber: string): Promise<boolean>;
  existsById(idProcess: number): Promise<boolean>;
  delete(idProcess: number): Promise<boolean>;
}
