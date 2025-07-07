import { TypeDocumentsResponse } from '../schemas/dto/response/type-documents.response';
import { TypeDocumentsModel } from '../schemas/model/type-documents.model';

export interface InterfaceTypeDodumentsRepository {
  findAll(): Promise<TypeDocumentsResponse[]>;
  findById(idTypeDocument: number): Promise<TypeDocumentsResponse | null>;
  findByTitle(title: string): Promise<TypeDocumentsResponse | null>;
  create(
    typeDocument: TypeDocumentsModel,
  ): Promise<TypeDocumentsResponse | null>;
  update(
    idTypeDocument: number,
    typeDocument: TypeDocumentsModel,
  ): Promise<TypeDocumentsResponse | null>;
  delete(idTypeDocument: number): Promise<boolean>;
  existsById(idTypeDocument: number): Promise<boolean>;
}
