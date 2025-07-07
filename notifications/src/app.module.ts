import { Module } from '@nestjs/common';
import { HomeModule } from './app/module/home.module';
import { PrismaTypeNotificationModule } from './modules/type-notification/infrastructure/modules/prisma.type-notification.module';
import { PrismaPriorityModule } from './modules/priority/infrastructure/modules/prisma.priority.module';
import { PrismaNotificationModule } from './modules/notifications/infrastructure/modules/prisma.notification.module';
import { KafkaModule } from './shared/kafka/kafka.module';
@Module({
  imports: [
    HomeModule,
    PrismaTypeNotificationModule,
    PrismaPriorityModule,
    PrismaNotificationModule,
  ],
})
export class AppModule {}
