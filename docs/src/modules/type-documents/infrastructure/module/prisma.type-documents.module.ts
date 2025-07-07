import { Module } from '@nestjs/common';
import { TypeDocumentsController } from '../controller/type-documents.controller';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { TypeDocumentsUseCaseService } from '../../application/services/type-documents.service';
import { TypeDocumentsPrismaImplementation } from '../repositories/prisma/persistence/prisma.type-documents.persistence';
import { KafkaModule } from 'src/shared/kafka/kafka.module';

@Module({
  imports: [],
  controllers: [TypeDocumentsController],
  providers: [
    PrismaService,
    TypeDocumentsUseCaseService,
    {
      provide: 'TypeDocumentsRepository',
      useClass: TypeDocumentsPrismaImplementation, // Assuming this is the Prisma implementation
    },
  ],
  exports: [],
})
export class TypeDocumentsModuleUsingPrisma {}
