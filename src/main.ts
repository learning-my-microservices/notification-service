import { NestFactory } from '@nestjs/core';
import { AppModule } from './notification.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { INestApplication, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await startCommunicationMicroservices(app);
  await app.listen(3012, () => {
    Logger.log('NOTIFICATION SERVICE STARTED', 'notification-service');
  });
}

async function startCommunicationMicroservices(app: INestApplication) {
  const HOST = process.env.HOST;
  const PORT = process.env.PORT;

  const tcpOptions: MicroserviceOptions = {
    transport: Transport.TCP,
    options: {
      host: HOST,
      port: +PORT,
    },
  };

  const rabbitMqOptions: MicroserviceOptions = {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_HOST],
      queue: 'notification-queue',
      queueOptions: {
        durable: false,
      },
    },
  };

  app.connectMicroservice(tcpOptions);
  app.connectMicroservice(rabbitMqOptions);

  await app.startAllMicroservices();
}

bootstrap();
