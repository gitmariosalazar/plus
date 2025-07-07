import { DocumentsModel } from 'src/modules/documents/domain/schemas/model/documents.model';
import { EntityModel } from 'src/modules/enterprise/domain/schemas/model/entity.model';
import { ProcessModel } from 'src/modules/process/domain/schemas/model/process.model';
import { StatusModel } from 'src/modules/status/domain/schemas/model/status.model';
import { TypePaymentModel } from 'src/modules/type-payment/domain/schemas/model/type-payment.model';

export class DetailInvoiceModel {
  private idDetailInvoice: number;
  private process: ProcessModel;
  private totalValue: number;
  private invoiceNumber: string;
  private entity: EntityModel;
  private description: string;
  private emissionDate: Date;
  private expirationDate: Date;
  private emailResponsability: string;
  private typePayment: TypePaymentModel;
  private document: DocumentsModel;
  private status: StatusModel;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    idDetailInvoice: number,
    process: ProcessModel,
    totalValue: number,
    invoiceNumber: string,
    entity: EntityModel,
    description: string,
    emissionDate: Date,
    expirationDate: Date,
    emailResponsability: string,
    typePayment: TypePaymentModel,
    document: DocumentsModel,
    status: StatusModel,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.idDetailInvoice = idDetailInvoice;
    this.process = process;
    this.totalValue = totalValue;
    this.invoiceNumber = invoiceNumber;
    this.entity = entity;
    this.description = description;
    this.emissionDate = emissionDate;
    this.expirationDate = expirationDate;
    this.emailResponsability = emailResponsability;
    this.typePayment = typePayment;
    this.document = document;
    this.status = status;
    this.createdAt = createdAt ? createdAt : new Date();
    this.updatedAt = updatedAt ? updatedAt : new Date();
  }

  public getIdDetailInvoice(): number {
    return this.idDetailInvoice;
  }

  public setIdDetailInvoice(idDetailInvoice: number): void {
    this.idDetailInvoice = idDetailInvoice;
  }

  public getProcess(): ProcessModel {
    return this.process;
  }

  public setProcess(process: ProcessModel): void {
    this.process = process;
  }

  public getTotalValue(): number {
    return this.totalValue;
  }

  public setTotalValue(totalValue: number): void {
    this.totalValue = totalValue;
  }

  public getInvoiceNumber(): string {
    return this.invoiceNumber;
  }

  public setInvoiceNumber(invoiceNumber: string): void {
    this.invoiceNumber = invoiceNumber;
  }

  public getEntity(): EntityModel {
    return this.entity;
  }

  public setEntity(entity: EntityModel): void {
    this.entity = entity;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getEmissionDate(): Date {
    return this.emissionDate;
  }

  public setEmissionDate(emissionDate: Date): void {
    this.emissionDate = emissionDate;
  }

  public getExpirationDate(): Date {
    return this.expirationDate;
  }

  public setExpirationDate(expirationDate: Date): void {
    this.expirationDate = expirationDate;
  }

  public getEmailResponsability(): string {
    return this.emailResponsability;
  }

  public setEmailResponsability(emailResponsability: string): void {
    this.emailResponsability = emailResponsability;
  }

  public getTypePayment(): TypePaymentModel {
    return this.typePayment;
  }

  public setTypePayment(typePayment: TypePaymentModel): void {
    this.typePayment = typePayment;
  }

  public getDocument(): DocumentsModel {
    return this.document;
  }

  public setDocument(document: DocumentsModel): void {
    this.document = document;
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
