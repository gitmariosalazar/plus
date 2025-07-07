import { Module } from '@nestjs/common';
import { EntityController } from '../controller/entity.controller';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { EntityUseCaseService } from '../../application/services/entity.service';
import { EntityPrismaImplementation } from '../repositories/prisma/persistence/prisma.entity.persistence';
import { KafkaModule } from 'src/shared/kafka/kafka.module';

@Module({
  imports: [],
  controllers: [EntityController],
  providers: [
    PrismaService,
    EntityUseCaseService,
    {
      provide: 'EntityRepository',
      useClass: EntityPrismaImplementation,
    },
  ],
  exports: [],
})
export class EntityModuleUsingPrisma {}
