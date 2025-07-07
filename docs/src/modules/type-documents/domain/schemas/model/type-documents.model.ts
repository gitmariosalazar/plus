export class TypeDocumentsModel {
  private idTypeDocument: number;
  private title: string;
  private description: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    idTypeDocument: number,
    title: string,
    description: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.idTypeDocument = idTypeDocument;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  getIdTypeDocument(): number {
    return this.idTypeDocument;
  }

  getTitle(): string {
    return this.title;
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

  setIdTypeDocument(idTypeDocument: number): void {
    this.idTypeDocument = idTypeDocument;
  }

  setTitle(title: string): void {
    this.title = title;
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
