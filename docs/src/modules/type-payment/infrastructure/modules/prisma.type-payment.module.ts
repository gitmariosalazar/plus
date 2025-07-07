import { Module } from '@nestjs/common';
import { TypePaymentController } from '../controller/type-payment.controller';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { TypePaymentUseCaseService } from '../../application/services/type-payment.service';
import { TypePaymentPrismaImplementation } from '../repositories/prisma/persistence/prisma.type-payment.persistence';
import { KafkaModule } from 'src/shared/kafka/kafka.module';

@Module({
  imports: [],
  controllers: [TypePaymentController],
  providers: [
    PrismaService,
    TypePaymentUseCaseService,
    {
      provide: 'TypePaymentRepository',
      useClass: TypePaymentPrismaImplementation,
    },
  ],
  exports: [],
})
export class TypePaymentModuleUsingPrisma {}
