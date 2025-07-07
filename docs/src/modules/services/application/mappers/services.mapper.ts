import { TypeServicesModel } from 'src/modules/type-services/domain/schemas/model/type-services.model';
import { CreateServiceRequest } from '../../domain/schemas/dto/request/create.services.request';
import { ServiceModel } from '../../domain/schemas/model/services.model';
import { ServiceResponse } from '../../domain/schemas/dto/response/services.response';

export class ServicesMapper {
  static fromCreateServiceRequestToModel(
    serviceRequest: CreateServiceRequest,
    typeService: TypeServicesModel,
  ): ServiceModel {
    return new ServiceModel(
      1,
      serviceRequest.name,
      serviceRequest.description,
      typeService,
      new Date(),
      new Date(),
    );
  }

  static fromUpdateServiceRequestToModel(
    idService: number,
    serviceRequest: CreateServiceRequest,
    typeService: TypeServicesModel,
  ): ServiceModel {
    const serviceModel = new ServiceModel(
      idService,
      serviceRequest.name,
      serviceRequest.description,
      typeService,
      undefined,
      new Date(),
    );
    serviceModel.setIdService(idService);
    return serviceModel;
  }

  static fromServiceResponseToModel(
    serviceResponse: ServiceResponse,
  ): ServiceModel {
    return new ServiceModel(
      serviceResponse.idService,
      serviceResponse.name,
      serviceResponse.description,
      new TypeServicesModel(
        serviceResponse.typeService.idTypeService,
        serviceResponse.typeService.name,
        serviceResponse.typeService.description,
      ),
      serviceResponse.createdAt,
      serviceResponse.updatedAt,
    );
  }
}
