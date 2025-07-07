import { ProcessResponse } from 'src/modules/process/domain/schemas/dto/response/process.response';

export interface ProcessReviewResponse {
  idProcessReview: number;
  process: ProcessResponse;
  isActive: boolean;
  isSelected: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
