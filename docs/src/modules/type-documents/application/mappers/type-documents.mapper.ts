import { CreateTypeDocumentsRequest } from '../../domain/schemas/dto/request/create.type-documents.request';
import { UpdateTypeDocumentsRequest } from '../../domain/schemas/dto/request/update.type-documents.request';
import { TypeDocumentsResponse } from '../../domain/schemas/dto/response/type-documents.response';
import { TypeDocumentsModel } from '../../domain/schemas/model/type-documents.model';

export class TypeDodumentsMapper {
  static fromCreateTypeDocumentsRequestToTypeDocumentsModel(
    typeDocumentsRequest: CreateTypeDocumentsRequest,
  ): TypeDocumentsModel {
    return new TypeDocumentsModel(
      1,
      typeDocumentsRequest.title,
      typeDocumentsRequest.description,
      new Date(),
      new Date(),
    );
  }

  static fromUpdateTypeDocumentsRequestToTypeDocumentsModel(
    typeDocumentsRequest: UpdateTypeDocumentsRequest,
  ): TypeDocumentsModel {
    return new TypeDocumentsModel(
      1,
      typeDocumentsRequest.title,
      typeDocumentsRequest.title,
      new Date(),
      new Date(),
    );
  }

  static fromTypeDocumentsResponseToTypeDocumentsModel(
    typeDocumentsModel: TypeDocumentsResponse,
  ): TypeDocumentsModel {
    return new TypeDocumentsModel(
      typeDocumentsModel.idTypeDocument,
      typeDocumentsModel.title,
      typeDocumentsModel.description,
      typeDocumentsModel.createdAt,
      typeDocumentsModel.updatedAt,
    );
  }
}
