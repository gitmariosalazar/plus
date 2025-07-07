export class TypeServicesModel {
  private idTypeService: number;
  private name: string;
  private description: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    idTypeService: number,
    name: string,
    description: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.idTypeService = idTypeService;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  getIdTypeService(): number {
    return this.idTypeService;
  }
  setIdTypeService(idTypeService: number): void {
    this.idTypeService = idTypeService;
  }
  getName(): string {
    return this.name;
  }
  setName(name: string): void {
    this.name = name;
  }
  getDescription(): string {
    return this.description;
  }
  setDescription(description: string): void {
    this.description = description;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }
  getUpdatedAt(): Date {
    return this.updatedAt;
  }
  setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
  toJSON(): object {
    return {
      idTypeService: this.idTypeService,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
