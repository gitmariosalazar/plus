import { TypeStatusModel } from 'src/modules/type-status/domain/schemas/model/type-status.model';

export class StatusModel {
  private idStatus: number;
  private name: string;
  private description: string;
  private typeStatus: TypeStatusModel;
  private createdAt?: Date;
  private updatedAt?: Date;

  constructor(
    idStatus: number,
    name: string,
    description: string,
    typeStatus: TypeStatusModel,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.idStatus = idStatus;
    this.name = name;
    this.description = description;
    this.typeStatus = typeStatus;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getIdStatus(): number {
    return this.idStatus;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getTypeStatus(): TypeStatusModel {
    return this.typeStatus;
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  setIdStatus(idStatus: number): void {
    this.idStatus = idStatus;
  }

  setName(name: string): void {
    this.name = name;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setTypeStatus(typeStatus: TypeStatusModel): void {
    this.typeStatus = typeStatus;
  }

  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  toJSON(): Record<string, any> {
    return {
      idStatus: this.idStatus,
      name: this.name,
      description: this.description,
      typeStatus: this.typeStatus.toJSON(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
