import { DocumentsModel } from 'src/modules/documents/domain/schemas/model/documents.model';
import { ProcessModel } from 'src/modules/process/domain/schemas/model/process.model';

export class ProcessDocumentModel {
  private idProcessDocument: number;
  private process: ProcessModel;
  private document: DocumentsModel;
  private observations: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor();
  constructor(
    idProcessDocument: number,
    process: ProcessModel,
    document: DocumentsModel,
    observations: string,
    createdAt?: Date,
    updatedAt?: Date,
  );
  constructor(
    idProcessDocument?: number,
    process?: ProcessModel,
    document?: DocumentsModel,
    observations?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.idProcessDocument = idProcessDocument || 0;
    this.process = process!;
    this.document = document!;
    this.observations = observations!;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getIdProcessDocument(): number {
    return this.idProcessDocument;
  }

  public setIdProcessDocument(idProcessDocument: number): void {
    this.idProcessDocument = idProcessDocument;
  }

  public getProcess(): ProcessModel {
    return this.process;
  }

  public setProcess(process: ProcessModel): void {
    this.process = process;
  }

  public getDocument(): DocumentsModel {
    return this.document;
  }

  public setDocument(document: DocumentsModel): void {
    this.document = document;
  }

  public getObservations(): string {
    return this.observations;
  }

  public setObservations(observations: string): void {
    this.observations = observations;
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
