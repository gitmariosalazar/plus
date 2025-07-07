import { TypeServicesModel } from 'src/modules/type-services/domain/schemas/model/type-services.model';

export class ServiceModel {
  private idService: number;
  private name: string;
  private description: string;
  private typeService: TypeServicesModel;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    idService: number,
    name: string,
    description: string,
    typeService: TypeServicesModel,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.idService = idService;
    this.name = name;
    this.description = description;
    this.typeService = typeService;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  getIdService(): number {
    return this.idService;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getTypeService(): TypeServicesModel {
    return this.typeService;
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  setIdService(idService: number): void {
    this.idService = idService;
  }

  setName(name: string): void {
    this.name = name;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setTypeService(typeService: TypeServicesModel): void {
    this.typeService = typeService;
  }

  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  toJSON(): object {
    return {
      idService: this.idService,
      name: this.name,
      description: this.description,
      typeService: this.typeService,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
