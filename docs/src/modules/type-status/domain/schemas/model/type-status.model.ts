export class TypeStatusModel {
  private idTypeStatus: number;
  private name: string;
  private description: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    idTypeStatus: number,
    name: string,
    description: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.idTypeStatus = idTypeStatus;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  getIdTypeStatus(): number {
    return this.idTypeStatus;
  }
  setIdTypeStatus(idTypeStatus: number): void {
    this.idTypeStatus = idTypeStatus;
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

  toJSON(): Record<string, any> {
    return {
      idTypeStatus: this.idTypeStatus,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
  static fromJSON(json: Record<string, any>): TypeStatusModel {
    return new TypeStatusModel(
      json.idTypeStatus,
      json.name,
      json.description,
      new Date(json.createdAt),
      new Date(json.updatedAt),
    );
  }
}
