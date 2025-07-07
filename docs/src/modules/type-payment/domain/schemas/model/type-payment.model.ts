export class TypePaymentModel {
  private idTypePayment: number;
  private name: string;
  private description: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    idTypePayment: number,
    name: string,
    description: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.idTypePayment = idTypePayment;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  getIdTypePayment(): number {
    return this.idTypePayment;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  setIdTypePayment(idTypePayment: number): void {
    this.idTypePayment = idTypePayment;
  }

  setName(name: string): void {
    this.name = name;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
