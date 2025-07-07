import { StatusResponse } from '../schemas/dto/response/status.response';
import { StatusModel } from '../schemas/model/status.model';

export interface InterfaceStatusRepository {
  findAll(): Promise<StatusResponse[]>;
  findById(idStatus: number): Promise<StatusResponse | null>;
  findByName(name: string): Promise<StatusResponse | null>;
  create(status: StatusModel): Promise<StatusResponse | null>;
  update(idStatus: number, status: StatusModel): Promise<StatusResponse | null>;
  delete(idStatus: number): Promise<boolean>;
  existsById(idStatus: number): Promise<boolean>;
}
