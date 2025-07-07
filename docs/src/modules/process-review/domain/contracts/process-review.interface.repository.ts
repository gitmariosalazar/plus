import { ProcessReviewResponse } from '../schemas/dto/response/process-review.response';
import { ProcessReviewModel } from '../schemas/model/process-review.model';

export interface InterfaceProcessReviewRepository {
  create(
    processReview: ProcessReviewModel,
  ): Promise<ProcessReviewResponse | null>;
  update(
    idProcessReview: number,
    processReview: ProcessReviewModel,
  ): Promise<ProcessReviewResponse | null>;
  findById(idProcessReview: number): Promise<ProcessReviewResponse | null>;
  findAll(): Promise<ProcessReviewResponse[] | null>;
  findByProcessId(idProcess: number): Promise<ProcessReviewResponse[] | null>;
  delete(idProcessReview: number): Promise<boolean>;
  existsById(idProcessReview: number): Promise<boolean>;
}
