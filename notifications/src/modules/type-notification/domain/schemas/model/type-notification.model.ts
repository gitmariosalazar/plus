export class TypeNotificationModel {
  private idTypeNotification: number;
  private name: string;
  private description: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    idTypeNotification: number,
    name: string,
    description: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.idTypeNotification = idTypeNotification;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getIdTypeNotification(): number {
    return this.idTypeNotification;
  }

  public setIdTypeNotification(idTypeNotification: number): void {
    this.idTypeNotification = idTypeNotification;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
