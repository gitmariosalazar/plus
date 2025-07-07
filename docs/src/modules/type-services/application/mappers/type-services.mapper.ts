import { CreateTypeServicesRequest } from '../../domain/schemas/dto/request/create.type-services.request';
import { UpdateTypeServicesRequest } from '../../domain/schemas/dto/request/update.type-services.request';
import { TypeServicesResponse } from '../../domain/schemas/dto/response/type-services.response';
import { TypeServicesModel } from '../../domain/schemas/model/type-services.model';

export class TypeServiceMapper {
  static fromCreateTypeServiceRequestToModel(
    typeService: CreateTypeServicesRequest,
  ): TypeServicesModel {
    return new TypeServicesModel(
      0,
      typeService.name,
      typeService.description,
      new Date(),
      new Date(),
    );
  }

  static fromUpdateTypeServiceRequestToModel(
    typeService: UpdateTypeServicesRequest,
  ): TypeServicesModel {
    return new TypeServicesModel(
      0,
      typeService.name,
      typeService.description,
      new Date(),
      new Date(),
    );
  }

  static fromTypeServiceResponseToModel(
    typeService: TypeServicesResponse,
  ): TypeServicesModel {
    return new TypeServicesModel(
      typeService.idTypeService,
      typeService.name,
      typeService.description,
      typeService.createdAt,
      typeService.updatedAt,
    );
  }
}
