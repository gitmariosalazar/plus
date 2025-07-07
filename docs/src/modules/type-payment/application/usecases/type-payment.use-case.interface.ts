import { CreateTypePaymentRequest } from '../../domain/schemas/dto/request/create.type-payment.request';
import { UpdateTypePaymentRequest } from '../../domain/schemas/dto/request/update.type-payment.request';
import { TypePaymentResponse } from '../../domain/schemas/dto/response/type-payment.response';

export interface InterfaceTypePaymentUseCase {
  findAll(): Promise<TypePaymentResponse[]>;
  findById(idTypePayment: number): Promise<TypePaymentResponse | null>;
  findByName(name: string): Promise<TypePaymentResponse | null>;
  create(
    typePayment: CreateTypePaymentRequest,
  ): Promise<TypePaymentResponse | null>;
  update(
    idTypePayment: number,
    typePayment: UpdateTypePaymentRequest,
  ): Promise<TypePaymentResponse | null>;
  delete(idTypePayment: number): Promise<boolean>;
  existsById(idTypePayment: number): Promise<boolean>;
}
