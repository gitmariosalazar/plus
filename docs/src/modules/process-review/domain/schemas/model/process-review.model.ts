import { ProcessModel } from 'src/modules/process/domain/schemas/model/process.model';

export class ProcessReviewModel {
  private idProcessReview: number;
  private process: ProcessModel;
  private isActive: boolean;
  private isSelected: boolean;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    idProcessReview: number,
    process: ProcessModel,
    isActive: boolean,
    isSelected: boolean,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.idProcessReview = idProcessReview;
    this.process = process;
    this.isActive = isActive;
    this.isSelected = isSelected;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  getIdProcessReview(): number {
    return this.idProcessReview;
  }

  getProcess(): ProcessModel {
    return this.process;
  }

  isActiveProcessReview(): boolean {
    return this.isActive;
  }

  getIsSelected(): boolean {
    return this.isSelected;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  setIdProcessReview(idProcessReview: number): void {
    this.idProcessReview = idProcessReview;
  }

  setProcess(process: ProcessModel): void {
    this.process = process;
  }

  setIsActive(isActive: boolean): void {
    this.isActive = isActive;
  }

  setIsSelected(isSelected: boolean): void {
    this.isSelected = isSelected;
  }

  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  toJSON(): object {
    return {
      id_process_review: this.idProcessReview,
      process: this.process.toJSON(),
      is_active: this.isActive,
      is_selected: this.isSelected,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
