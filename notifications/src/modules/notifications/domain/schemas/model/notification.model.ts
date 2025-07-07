import { PriorityModel } from 'src/modules/priority/domain/schemas/model/priority.model';
import { TypeNotificationModel } from 'src/modules/type-notification/domain/schemas/model/type-notification.model';

export class NotificationModel {
  private idNotification: number;
  private email: string;
  private phone: string;
  private subject: string;
  private message: string;
  private typeNotification: TypeNotificationModel;
  private attempts: number;
  private sentAt: Date;
  private processCode: number;
  private priority: PriorityModel;
  private idStatus: number;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    idNotification: number,
    email: string,
    phone: string,
    subject: string,
    message: string,
    typeNotification: TypeNotificationModel,
    attempts: number,
    sentAt: Date,
    processCode: number,
    priority: PriorityModel,
    idStatus: number,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.idNotification = idNotification;
    this.email = email;
    this.phone = phone;
    this.subject = subject;
    this.message = message;
    this.typeNotification = typeNotification;
    this.attempts = attempts;
    this.sentAt = sentAt;
    this.processCode = processCode;
    this.priority = priority;
    this.idStatus = idStatus;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getIdNotification(): number {
    return this.idNotification;
  }

  public setIdNotification(idNotification: number): void {
    this.idNotification = idNotification;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getPhone(): string {
    return this.phone;
  }

  public setPhone(phone: string): void {
    this.phone = phone;
  }

  public getSubject(): string {
    return this.subject;
  }

  public setSubject(subject: string): void {
    this.subject = subject;
  }

  public getMessage(): string {
    return this.message;
  }

  public setMessage(message: string): void {
    this.message = message;
  }

  public getTypeNotification(): TypeNotificationModel {
    return this.typeNotification;
  }

  public setTypeNotification(typeNotification: TypeNotificationModel): void {
    this.typeNotification = typeNotification;
  }

  public getAttempts(): number {
    return this.attempts;
  }

  public setAttempts(attempts: number): void {
    this.attempts = attempts;
  }

  public getSentAt(): Date {
    return this.sentAt;
  }

  public setSentAt(sentAt: Date): void {
    this.sentAt = sentAt;
  }

  public getProcessCode(): number {
    return this.processCode;
  }

  public setProcessCode(processCode: number): void {
    this.processCode = processCode;
  }

  public getPriority(): PriorityModel {
    return this.priority;
  }

  public setPriority(priority: PriorityModel): void {
    this.priority = priority;
  }

  public getIdStatus(): number {
    return this.idStatus;
  }

  public setIdStatus(idStatus: number): void {
    this.idStatus = idStatus;
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
