import { Module } from '@nestjs/common';
import { PriorityController } from '../controller/priority.controller';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { PriorityUseCaseService } from '../../application/services/priority.service';
import { PrismaPriorityPersistence } from '../repositories/prisma/persistence/prisma.priority.persistence';
import { KafkaModule } from 'src/shared/kafka/kafka.module';

@Module({
  imports: [],
  controllers: [PriorityController],
  providers: [
    PrismaService,
    PriorityUseCaseService,
    {
      provide: 'PriorityRepository',
      useClass: PrismaPriorityPersistence,
    },
  ],
  exports: [],
})
export class PrismaPriorityModule {}
