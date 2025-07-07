import { CreateTypeDocumentsRequest } from '../../domain/schemas/dto/request/create.type-documents.request';
import { UpdateTypeDocumentsRequest } from '../../domain/schemas/dto/request/update.type-documents.request';
import { TypeDocumentsResponse } from '../../domain/schemas/dto/response/type-documents.response';

export interface InterfaceTypeDocumentsUseCase {
  findAll(): Promise<TypeDocumentsResponse[]>;
  findById(idTypeDocument: number): Promise<TypeDocumentsResponse | null>;
  findByTitle(title: string): Promise<TypeDocumentsResponse | null>;
  create(
    typeDocumentRequest: CreateTypeDocumentsRequest,
  ): Promise<TypeDocumentsResponse | null>;
  update(
    idTypeDocument: number,
    typeDocumentRequest: UpdateTypeDocumentsRequest,
  ): Promise<TypeDocumentsResponse | null>;
  delete(idTypeDocument: number): Promise<boolean>;
  existsById(idTypeDocument: number): Promise<boolean>;
}
