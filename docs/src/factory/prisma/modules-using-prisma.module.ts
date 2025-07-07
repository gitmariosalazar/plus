import { Module } from '@nestjs/common';
import { DocumentsModuleUsingPrisma } from 'src/modules/documents/infrastructure/modules/prisma.documents.module';
import { EntityModuleUsingPrisma } from 'src/modules/enterprise/infrastructure/module/prisma.entity.module';
import { DetailInvoiceModuleUsingPrisma } from 'src/modules/invoices/infrastructure/repositories/modules/prisma.detail-invoice.module';
import { ProcessDocumentModuleUsingPrisma } from 'src/modules/process-docs/infrastructure/modules/prisma.process-document.module';
import { ProcessReviewModuleUsingPrisma } from 'src/modules/process-review/infrastructure/modules/prisma.process-review.module';
import { ProcessModuleUsingPrisma } from 'src/modules/process/infrastructure/modules/prisma.process.module';
import { ServicesModuleUsingPrisma } from 'src/modules/services/infrastructure/modules/prisma.services.module';
import { StatusModuleUsingPrisma } from 'src/modules/status/infrastructure/modules/prisma.status.module';
import { TypeDocumentsModuleUsingPrisma } from 'src/modules/type-documents/infrastructure/module/prisma.type-documents.module';
import { TypePaymentModuleUsingPrisma } from 'src/modules/type-payment/infrastructure/modules/prisma.type-payment.module';
import { TypeServicesModuleUsingPrisma } from 'src/modules/type-services/infrastructure/modules/prisma.type-services.module';
import { TypeStatusModuleUsingPrisma } from 'src/modules/type-status/infrastructure/modules/prisma.type-status.module';

@Module({
  imports: [
    TypeStatusModuleUsingPrisma,
    TypeServicesModuleUsingPrisma,
    TypeDocumentsModuleUsingPrisma,
    TypePaymentModuleUsingPrisma,
    StatusModuleUsingPrisma,
    ServicesModuleUsingPrisma,
    EntityModuleUsingPrisma,
    ProcessModuleUsingPrisma,
    ProcessReviewModuleUsingPrisma,
    DocumentsModuleUsingPrisma,
    ProcessDocumentModuleUsingPrisma,
    DetailInvoiceModuleUsingPrisma,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ModulesUsingPrisma {}
