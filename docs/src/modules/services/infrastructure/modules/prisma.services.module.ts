import { Module } from '@nestjs/common';
import { ServicesController } from '../controller/services.controller';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { ServicesUseCaseService } from '../../application/services/services.service';
import { ServicesPrismaImplementation } from '../repositories/prisma/persistence/prisma.services.persistence';
import { TypeServicesPrismaImplementation } from 'src/modules/type-services/infrastructure/repositories/prisma/prisma.type-services.persistence';
import { KafkaModule } from 'src/shared/kafka/kafka.module';

@Module({
  imports: [],
  controllers: [ServicesController],
  providers: [
    PrismaService,
    ServicesUseCaseService,
    {
      provide: 'ServicesRepository',
      useClass: ServicesPrismaImplementation,
    },
    {
      provide: 'TypeServicesRepository',
      useClass: TypeServicesPrismaImplementation,
    },
  ],
  exports: [],
})
export class ServicesModuleUsingPrisma {}
