import { Module } from '@nestjs/common';
import { NotificationController } from '../controller/notification.controller';
import { PrismaService } from 'src/shared/prisma/service/prisma.service';
import { NotificationUseCaseService } from '../../application/services/notification.service';
import { PrismaNotificationPersistence } from '../repositories/prisma/persistence/prisma.notification.persistence';
import { PrismaPriorityPersistence } from 'src/modules/priority/infrastructure/repositories/prisma/persistence/prisma.priority.persistence';
import { PrismaTypeNotificationPersistence } from 'src/modules/type-notification/infrastructure/repositories/prisma/persistence/prisma.type-notification.persistence';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { environments } from 'src/settings/environments/environments';
import { SendNotificationsService } from '../../application/strategies/send-multiple-notifications.service';
import { SendEmailService } from '../../application/services/send-email.service';
import { SendTelegramService } from '../../application/services/send-telegram.service';
import { SendSMSService } from '../../application/services/send-sms.service';
import { SendWhatsappService } from '../../application/services/send-whatsapp.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { KafkaModule } from 'src/shared/kafka/kafka.module';
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: environments.emailHost,
        port: 465,
        secure: true,
        auth: {
          user: environments.emailUsername,
          pass: environments.emailPassword,
        },
        logger: true,
      },
      defaults: {
        from: `"No Reply" <
        ${environments.emailUsername}>`,
      },
    }),

    ClientsModule.register([
      // Kafka del microservicio actual (notification)
      {
        name: environments.notificationKafkaClient,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: environments.notificationKafkaClientId,
            brokers: [environments.kafkaBroker],
          },
          consumer: {
            groupId: environments.notificationKafkaGroupId,
          },
        },
      },
      // Kafka hacia microservicio documents
      {
        name: environments.documentsKafkaClient,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: environments.documentsKafkaClientId,
            brokers: [environments.kafkaBroker],
          },
          consumer: {
            groupId: environments.documentsKafkaGroupId,
          },
        },
      },
    ]),
  ],
  controllers: [NotificationController],
  providers: [
    PrismaService,
    SendNotificationsService,
    NotificationUseCaseService,
    SendEmailService,
    SendTelegramService,
    SendSMSService,
    SendWhatsappService,
    {
      provide: 'NotificationRepository',
      useClass: PrismaNotificationPersistence,
    },
    {
      provide: 'PriorityRepository',
      useClass: PrismaPriorityPersistence,
    },
    {
      provide: 'TypeNotificationRepository',
      useClass: PrismaTypeNotificationPersistence,
    },
  ],
  exports: [],
})
export class PrismaNotificationModule {}
