import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { environments } from './settings/environments/environments';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger: Logger = new Logger('Main');
  /*
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(morgan('dev'));
  const config = new DocumentBuilder()
    .setTitle('Documents Microservice API')
    .setBasePath('api')
    .setDescription('API - Clean Architecture with NestJS & TypeScript')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    customSiteTitle: 'API Documentation',
    customCssUrl:
      'https://mariosalazar-styles-swagger-ui.vercel.app/css/swagger-ui.css',
  });
  await app.listen(5002);
  logger.log(`🚀🎉 This API is running on: http://127.0.0.1:${5002}`);
  */
  const microservices =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [`${environments.kafkaBroker}`], // Kafka broker address
          clientId: environments.documentsKafkaClientId,
        },
        consumer: {
          groupId: environments.documentsKafkaGroupId, // Unique group ID for this microservice
          allowAutoTopicCreation: true, // Allow auto topic creation if needed
        },
      },
    });
  await microservices.listen();
  logger.log(`🚀🎉 The Documents microservice is listening to KAFKA...`);
}
bootstrap();
