import { CreateTypePaymentRequest } from '../../domain/schemas/dto/request/create.type-payment.request';
import { UpdateTypePaymentRequest } from '../../domain/schemas/dto/request/update.type-payment.request';
import { TypePaymentResponse } from '../../domain/schemas/dto/response/type-payment.response';
import { TypePaymentModel } from '../../domain/schemas/model/type-payment.model';

export class TypePaymentMapper {
  static fromCreateTypePaymentRequestToTypePaymentModel(
    typePaymentRequest: CreateTypePaymentRequest,
  ): TypePaymentModel {
    return new TypePaymentModel(
      1, // This should be replaced with a proper ID generation logic
      typePaymentRequest.name,
      typePaymentRequest.description,
      new Date(),
      new Date(),
    );
  }

  static fromUpdateTypePaymentRequestToTypePaymentModel(
    typePaymentRequest: UpdateTypePaymentRequest,
  ): TypePaymentModel {
    return new TypePaymentModel(
      1, // This should be replaced with a proper ID generation logic
      typePaymentRequest.name,
      typePaymentRequest.description,
      undefined,
      new Date(),
    );
  }

  static fromTypePaymentResponseToTypePaymentModel(
    typePaymentResponse: TypePaymentResponse,
  ): TypePaymentModel {
    return new TypePaymentModel(
      typePaymentResponse.idTypePayment,
      typePaymentResponse.name,
      typePaymentResponse.description,
      typePaymentResponse.createdAt,
      typePaymentResponse.updatedAt,
    );
  }
}
