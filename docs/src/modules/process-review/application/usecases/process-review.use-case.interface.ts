import { CreateProcessReviewRequest } from '../../domain/schemas/dto/request/create.process-review.request';
import { UpdateProcessReviewRequest } from '../../domain/schemas/dto/request/update.process-review.request';
import { ProcessReviewResponse } from '../../domain/schemas/dto/response/process-review.response';

export interface InterfaceProcessReviewUseCase {
  create(
    processReview: CreateProcessReviewRequest,
  ): Promise<ProcessReviewResponse | null>;
  update(
    idProcessReview: number,
    processReview: UpdateProcessReviewRequest,
  ): Promise<ProcessReviewResponse | null>;
  findById(idProcessReview: number): Promise<ProcessReviewResponse | null>;
  findAll(): Promise<ProcessReviewResponse[] | null>;
  findByProcessId(idProcess: number): Promise<ProcessReviewResponse[] | null>;
  delete(idProcessReview: number): Promise<boolean>;
  existsById(idProcessReview: number): Promise<boolean>;
}
