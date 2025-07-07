import { Module } from '@nestjs/common';
import { StatusController } from '../controller/status.controller';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { StatusPrismaImplementation } from '../repositories/prisma/persistence/prisma.status.persistence';
import { TypeStatusPrismaImplementation } from 'src/modules/type-status/infrastructure/repositories/prisma/persistence/prisma.type-status.persistence';
import { StatusUseCaseService } from '../../application/services/status.service';
import { KafkaModule } from 'src/shared/kafka/kafka.module';

@Module({
  imports: [],
  controllers: [StatusController],
  providers: [
    PrismaService,
    StatusUseCaseService,
    {
      provide: 'StatusRepository',
      useClass: StatusPrismaImplementation,
    },
    {
      provide: 'TypeStatusRepository',
      useClass: TypeStatusPrismaImplementation,
    },
  ],
  exports: [],
})
export class StatusModuleUsingPrisma {}
