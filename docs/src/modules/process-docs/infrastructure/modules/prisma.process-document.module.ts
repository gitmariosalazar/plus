import { Module } from '@nestjs/common';
import { ProcessDocumentController } from '../controller/process-document.controller';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { ProcessDocumentUseCaseService } from '../../application/services/process-document.service';
import { ProcessDocumentPrismaImplementation } from '../repositories/prisma/persistence/prisma.process-document.persistence';
import { DocumentsPrismaImplementation } from 'src/modules/documents/infrastructure/repositories/prisma/persistence/prisma.documents.persistence';
import { ProcessPrismaImplementation } from 'src/modules/process/infrastructure/repositories/prisma/persistence/prisma.process.persistence';
import { KafkaModule } from 'src/shared/kafka/kafka.module';

@Module({
  imports: [],
  controllers: [ProcessDocumentController],
  providers: [
    PrismaService,
    ProcessDocumentUseCaseService,
    {
      provide: 'ProcessDocumentRepository',
      useClass: ProcessDocumentPrismaImplementation,
    },
    {
      provide: 'ProcessRepository',
      useClass: ProcessPrismaImplementation,
    },
    {
      provide: 'DocumentsRepository',
      useClass: DocumentsPrismaImplementation,
    },
  ],
  exports: [],
})
export class ProcessDocumentModuleUsingPrisma {}
