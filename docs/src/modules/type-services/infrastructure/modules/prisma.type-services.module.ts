import { Module } from '@nestjs/common';
import { TypeServicesController } from '../controller/type-services.controller';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { TypeServicesUseCaseService } from '../../application/services/type-services.service';
import { TypeServicesPrismaImplementation } from '../repositories/prisma/prisma.type-services.persistence';
import { KafkaModule } from 'src/shared/kafka/kafka.module';

@Module({
  imports: [],
  controllers: [TypeServicesController],
  providers: [
    PrismaService,
    TypeServicesUseCaseService,
    {
      provide: 'TypeServicesRepository',
      useClass: TypeServicesPrismaImplementation,
    },
  ],
  exports: [],
})
export class TypeServicesModuleUsingPrisma {}
