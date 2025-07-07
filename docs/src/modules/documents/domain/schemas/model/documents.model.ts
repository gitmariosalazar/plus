import { ProcessModel } from 'src/modules/process/domain/schemas/model/process.model';
import { StatusModel } from 'src/modules/status/domain/schemas/model/status.model';
import { TypeDocumentsModel } from 'src/modules/type-documents/domain/schemas/model/type-documents.model';

export class DocumentsModel {
  private idDocument: number;
  private typeDocument: TypeDocumentsModel;
  private documentName: string;
  private documentDescription: string;
  private dateRequest: Date;
  private dateReception: Date;
  private managerName: string;
  private process: ProcessModel;
  private documentUrl: string;
  private status: StatusModel;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    idDocument: number,
    typeDocument: TypeDocumentsModel,
    documentName: string,
    documentDescription: string,
    dateRequest: Date,
    dateReception: Date,
    managerName: string,
    process: ProcessModel,
    documentUrl: string,
    status: StatusModel,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.idDocument = idDocument;
    this.typeDocument = typeDocument;
    this.documentName = documentName;
    this.documentDescription = documentDescription;
    this.dateRequest = dateRequest;
    this.dateReception = dateReception;
    this.managerName = managerName;
    this.process = process;
    this.documentUrl = documentUrl;
    this.status = status;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
  public getIdDocument(): number {
    return this.idDocument;
  }

  public setIdDocument(idDocument: number): void {
    this.idDocument = idDocument;
  }

  public getTypeDocument(): TypeDocumentsModel {
    return this.typeDocument;
  }

  public setTypeDocument(typeDocument: TypeDocumentsModel): void {
    this.typeDocument = typeDocument;
  }

  public getDocumentName(): string {
    return this.documentName;
  }

  public setDocumentName(documentName: string): void {
    this.documentName = documentName;
  }

  public getDocumentDescription(): string {
    return this.documentDescription;
  }

  public setDocumentDescription(documentDescription: string): void {
    this.documentDescription = documentDescription;
  }

  public getDateRequest(): Date {
    return this.dateRequest;
  }

  public setDateRequest(dateRequest: Date): void {
    this.dateRequest = dateRequest;
  }

  public getDateReception(): Date {
    return this.dateReception;
  }

  public setDateReception(dateReception: Date): void {
    this.dateReception = dateReception;
  }

  public getManagerName(): string {
    return this.managerName;
  }

  public setManagerName(managerName: string): void {
    this.managerName = managerName;
  }

  public getProcess(): ProcessModel {
    return this.process;
  }

  public setProcess(process: ProcessModel): void {
    this.process = process;
  }

  public getDocumentUrl(): string {
    return this.documentUrl;
  }

  public setDocumentUrl(documentUrl: string): void {
    this.documentUrl = documentUrl;
  }

  public getStatus(): StatusModel {
    return this.status;
  }

  public setStatus(status: StatusModel): void {
    this.status = status;
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
