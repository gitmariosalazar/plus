import { ProcessResponse } from '../schemas/dto/response/process.response';
import { ProcessModel } from '../schemas/model/process.model';

export interface InterfaceProcessRepository {
  create(process: ProcessModel): Promise<ProcessResponse | null>;
  update(
    idProcess: number,
    process: ProcessModel,
  ): Promise<ProcessResponse | null>;
  findById(idProcess: number): Promise<ProcessResponse | null>;
  findByProcessNumber(processNumber: string): Promise<ProcessResponse | null>;
  findAll(): Promise<ProcessResponse[]>;
  existsByProcessNumber(processNumber: string): Promise<boolean>;
  existsById(idProcess: number): Promise<boolean>;
  delete(idProcess: number): Promise<boolean>;
}
