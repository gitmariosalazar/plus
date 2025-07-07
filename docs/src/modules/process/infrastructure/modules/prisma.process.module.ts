import { Module } from '@nestjs/common';
import { ProcessController } from '../controller/prisma.process.controller';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { ProcessUseCaseService } from '../../application/services/process.service';
import { ProcessPrismaImplementation } from '../repositories/prisma/persistence/prisma.process.persistence';
import { EntityPrismaImplementation } from 'src/modules/enterprise/infrastructure/repositories/prisma/persistence/prisma.entity.persistence';
import { StatusPrismaImplementation } from 'src/modules/status/infrastructure/repositories/prisma/persistence/prisma.status.persistence';
import { KafkaModule } from 'src/shared/kafka/kafka.module';

@Module({
  imports: [],
  controllers: [ProcessController],
  providers: [
    PrismaService,
    ProcessUseCaseService,
    {
      provide: 'ProcessRepository',
      useClass: ProcessPrismaImplementation,
    },
    {
      provide: 'EntityRepository',
      useClass: EntityPrismaImplementation,
    },
    {
      provide: 'StatusRepository',
      useClass: StatusPrismaImplementation,
    },
  ],
  exports: [],
})
export class ProcessModuleUsingPrisma {}
