export interface EntityResponse {
  idEntity: number;
  ruc: string;
  name: string;
  email: string;
  cellphone: string;
  telephone: string;
  address: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
