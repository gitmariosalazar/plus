import { Module } from '@nestjs/common';
import { TypeStatusController } from '../controller/type-status.controller';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { TypeStatusUseCaseService } from '../../application/services/type-status.service';
import { TypeStatusPrismaImplementation } from '../repositories/prisma/persistence/prisma.type-status.persistence';
import { KafkaModule } from 'src/shared/kafka/kafka.module';

@Module({
  imports: [],
  controllers: [TypeStatusController],
  providers: [
    PrismaService,
    TypeStatusUseCaseService,
    {
      provide: 'TypeStatusRepository',
      useClass: TypeStatusPrismaImplementation,
    },
  ],
  exports: [],
})
export class TypeStatusModuleUsingPrisma {}
