import { CreateEntityRequest } from '../../domain/schemas/dto/request/create.entity.request';
import { EntityResponse } from '../../domain/schemas/dto/response/entity.response';
import { EntityModel } from '../../domain/schemas/model/entity.model';

export class EntityMapper {
  static fromCreateEntityRequestToModel(
    entityRequest: CreateEntityRequest,
  ): EntityModel {
    return new EntityModel(
      1,
      entityRequest.ruc,
      entityRequest.name,
      entityRequest.email,
      entityRequest.cellphone,
      entityRequest.telephone,
      entityRequest.address,
      entityRequest.description,
      new Date(),
      new Date(),
    );
  }

  static fromUpdateEntityRequestToModel(
    idEntity: number,
    entityRequest: CreateEntityRequest,
  ): EntityModel {
    return new EntityModel(
      idEntity,
      entityRequest.ruc,
      entityRequest.name,
      entityRequest.email,
      entityRequest.cellphone,
      entityRequest.telephone,
      entityRequest.address,
      entityRequest.description,
      new Date(),
      new Date(),
    );
  }

  static fromEntityResponseToModel(
    entityResponse: EntityResponse,
  ): EntityModel {
    return new EntityModel(
      entityResponse.idEntity,
      entityResponse.ruc,
      entityResponse.name,
      entityResponse.email,
      entityResponse.cellphone,
      entityResponse.telephone,
      entityResponse.address,
      entityResponse.description,
      entityResponse.createdAt,
      entityResponse.updatedAt,
    );
  }
}
