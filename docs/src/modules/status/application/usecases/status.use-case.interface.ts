import { CreateStatusRequest } from '../../domain/schemas/dto/request/create.status.request';
import { UpdateStatusRequest } from '../../domain/schemas/dto/request/update.status.request';
import { StatusResponse } from '../../domain/schemas/dto/response/status.response';

export interface InterfaceStatusUseCase {
  findAll(): Promise<StatusResponse[]>;

  findById(idStatus: number): Promise<StatusResponse | null>;

  findByName(name: string): Promise<StatusResponse | null>;

  create(status: CreateStatusRequest): Promise<StatusResponse | null>;

  update(
    idStatus: number,
    status: UpdateStatusRequest,
  ): Promise<StatusResponse | null>;

  delete(idStatus: number): Promise<boolean>;

  existsById(idStatus: number): Promise<boolean>;
}
