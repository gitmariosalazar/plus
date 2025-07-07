import { TypePaymentResponse } from '../schemas/dto/response/type-payment.response';
import { TypePaymentModel } from '../schemas/model/type-payment.model';

export interface InterfaceTypePaymentRepository {
  findAll(): Promise<TypePaymentResponse[]>;
  findById(idTypePayment: number): Promise<TypePaymentResponse | null>;
  findByName(name: string): Promise<TypePaymentResponse | null>;
  create(typePayment: TypePaymentModel): Promise<TypePaymentResponse | null>;
  update(
    idTypePayment: number,
    typePayment: TypePaymentModel,
  ): Promise<TypePaymentResponse | null>;
  delete(idTypePayment: number): Promise<boolean>;
  existsById(idTypePayment: number): Promise<boolean>;
}
