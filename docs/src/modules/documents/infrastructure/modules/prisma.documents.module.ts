import { Module } from '@nestjs/common';
import { DocumentsController } from '../controller/documents.controller';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { DocumentsUseCaseService } from '../../application/services/documents.service';
import { DocumentsPrismaImplementation } from '../repositories/prisma/persistence/prisma.documents.persistence';
import { TypeDocumentsPrismaImplementation } from 'src/modules/type-documents/infrastructure/repositories/prisma/persistence/prisma.type-documents.persistence';
import { StatusPrismaImplementation } from 'src/modules/status/infrastructure/repositories/prisma/persistence/prisma.status.persistence';
import { ProcessPrismaImplementation } from 'src/modules/process/infrastructure/repositories/prisma/persistence/prisma.process.persistence';
import { KafkaModule } from 'src/shared/kafka/kafka.module';

@Module({
  imports: [],
  controllers: [DocumentsController],
  providers: [
    PrismaService,
    DocumentsUseCaseService,
    {
      provide: 'DocumentsRepository',
      useClass: DocumentsPrismaImplementation,
    },
    {
      provide: 'TypeDocumentsRepository',
      useClass: TypeDocumentsPrismaImplementation,
    },
    {
      provide: 'StatusRepository',
      useClass: StatusPrismaImplementation,
    },
    {
      provide: 'ProcessRepository',
      useClass: ProcessPrismaImplementation,
    },
  ],
  exports: [],
})
export class DocumentsModuleUsingPrisma {}
