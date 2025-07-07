import { Module } from '@nestjs/common';
import { ProcessReviewController } from '../controller/process-review.controller';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { ProcessReviewService } from '../../application/services/process-review.service';
import { ProcessReviewPrismaImplementation } from '../repositories/prisma/persistence/prisma.process-review.persistence';
import { ProcessPrismaImplementation } from 'src/modules/process/infrastructure/repositories/prisma/persistence/prisma.process.persistence';
import { KafkaModule } from 'src/shared/kafka/kafka.module';

@Module({
  imports: [],
  controllers: [ProcessReviewController],
  providers: [
    PrismaService,
    ProcessReviewService,
    {
      provide: 'ProcessReviewRepository',
      useClass: ProcessReviewPrismaImplementation,
    },
    {
      provide: 'ProcessRepository',
      useClass: ProcessPrismaImplementation,
    },
  ],
  exports: [],
})
export class ProcessReviewModuleUsingPrisma {}
