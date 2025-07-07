import { Module } from '@nestjs/common';
import { DetailInvoiceController } from '../controllers/detail-invoice.controller';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { DetailInvoiceUseCaseService } from 'src/modules/invoices/application/services/detail-invoice.service';
import { DetailInvoicePrismaImplementation } from '../prisma/persistence/prisma.detail-invoice.persistence';
import { ProcessPrismaImplementation } from 'src/modules/process/infrastructure/repositories/prisma/persistence/prisma.process.persistence';
import { EntityPrismaImplementation } from 'src/modules/enterprise/infrastructure/repositories/prisma/persistence/prisma.entity.persistence';
import { TypePaymentPrismaImplementation } from 'src/modules/type-payment/infrastructure/repositories/prisma/persistence/prisma.type-payment.persistence';
import { DocumentsPrismaImplementation } from 'src/modules/documents/infrastructure/repositories/prisma/persistence/prisma.documents.persistence';
import { StatusPrismaImplementation } from 'src/modules/status/infrastructure/repositories/prisma/persistence/prisma.status.persistence';
import { KafkaModule } from 'src/shared/kafka/kafka.module';

@Module({
  imports: [],
  controllers: [DetailInvoiceController],
  providers: [
    PrismaService,
    DetailInvoiceUseCaseService,
    {
      provide: 'DetailInvoiceRepository',
      useClass: DetailInvoicePrismaImplementation,
    },
    {
      provide: 'ProcessRepository',
      useClass: ProcessPrismaImplementation,
    },
    {
      provide: 'EntityRepository',
      useClass: EntityPrismaImplementation,
    },
    {
      provide: 'TypePaymentRepository',
      useClass: TypePaymentPrismaImplementation,
    },
    {
      provide: 'DocumentsRepository',
      useClass: DocumentsPrismaImplementation,
    },
    {
      provide: 'StatusRepository',
      useClass: StatusPrismaImplementation,
    },
  ],
  exports: [],
})
export class DetailInvoiceModuleUsingPrisma {}
