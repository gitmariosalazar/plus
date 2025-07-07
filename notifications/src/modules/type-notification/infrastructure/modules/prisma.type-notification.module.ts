import { Module } from '@nestjs/common';
import { TypeNotificationController } from '../controller/type-notification.controller';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { TypeNotificationUseCaseService } from '../../application/services/type-notification.service';
import { PrismaTypeNotificationPersistence } from '../repositories/prisma/persistence/prisma.type-notification.persistence';
import { KafkaModule } from 'src/shared/kafka/kafka.module';

@Module({
  imports: [],
  controllers: [TypeNotificationController],
  providers: [
    PrismaService,
    TypeNotificationUseCaseService,
    {
      provide: 'TypeNotificationRepository',
      useClass: PrismaTypeNotificationPersistence,
    },
  ],
  exports: [],
})
export class PrismaTypeNotificationModule {}
