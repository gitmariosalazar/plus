import { EntityModel } from 'src/modules/enterprise/domain/schemas/model/entity.model';
import { StatusModel } from 'src/modules/status/domain/schemas/model/status.model';

export class ProcessModel {
  private idProcess: number;
  private processNumber: string;
  private value: number;
  private category: string;
  private description: string;
  private timeExecution: string;
  private processObject: string;
  private emailManager: string;
  private fullNameManager: string;
  private phoneManager: string;
  private statusProcess: number;
  private isActive: boolean;
  private entity: EntityModel;
  private status: StatusModel;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    idProcess: number,
    processNumber: string,
    value: number,
    category: string,
    description: string,
    timeExecution: string,
    processObject: string,
    emailManager: string,
    fullNameManager: string,
    phoneManager: string,
    statusProcess: number,
    isActive: boolean,
    entity: EntityModel,
    status: StatusModel,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.idProcess = idProcess;
    this.processNumber = processNumber;
    this.value = value;
    this.category = category;
    this.entity = entity;
    this.description = description;
    this.timeExecution = timeExecution;
    this.processObject = processObject;
    this.emailManager = emailManager;
    this.fullNameManager = fullNameManager;
    this.phoneManager = phoneManager;
    this.statusProcess = statusProcess;
    this.isActive = isActive;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getIdProcess(): number {
    return this.idProcess;
  }

  getProcessNumber(): string {
    return this.processNumber;
  }

  getValue(): number {
    return this.value;
  }

  getCategory(): string {
    return this.category;
  }

  getDescription(): string {
    return this.description;
  }

  getTimeExecution(): string {
    return this.timeExecution;
  }

  getProcessObject(): string {
    return this.processObject;
  }

  getEmailManager(): string {
    return this.emailManager;
  }

  getFullNameManager(): string {
    return this.fullNameManager;
  }

  getPhoneManager(): string {
    return this.phoneManager;
  }

  getStatusProcess(): number {
    return this.statusProcess;
  }

  getIsActive(): boolean {
    return this.isActive;
  }

  getEntity(): EntityModel {
    return this.entity;
  }

  getStatus(): StatusModel {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  setIdProcess(idProcess: number): void {
    this.idProcess = idProcess;
  }

  setProcessNumber(processNumber: string): void {
    this.processNumber = processNumber;
  }

  setValue(value: number): void {
    this.value = value;
  }

  setCategory(category: string): void {
    this.category = category;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setTimeExecution(timeExecution: string): void {
    this.timeExecution = timeExecution;
  }

  setProcessObject(processObject: string): void {
    this.processObject = processObject;
  }

  setEmailManager(emailManager: string): void {
    this.emailManager = emailManager;
  }

  setFullNameManager(fullNameManager: string): void {
    this.fullNameManager = fullNameManager;
  }

  setPhoneManager(phoneManager: string): void {
    this.phoneManager = phoneManager;
  }

  setStatusProcess(statusProcess: number): void {
    this.statusProcess = statusProcess;
  }

  setIsActive(isActive: boolean): void {
    this.isActive = isActive;
  }

  setEntity(entity: EntityModel): void {
    this.entity = entity;
  }

  setStatus(status: StatusModel): void {
    this.status = status;
  }

  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  toJSON(): object {
    return {
      id_process: this.idProcess,
      processNumber: this.processNumber,
      value: this.value,
      category: this.category,
      description: this.description,
      timeExecution: this.timeExecution,
      processObject: this.processObject,
      emailManager: this.emailManager,
      fullNameManager: this.fullNameManager,
      phoneManager: this.phoneManager,
      statusProcess: this.statusProcess,
      is_active: this.isActive,
      entity: this.entity.toJSON(),
      status: this.status.toJSON(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
