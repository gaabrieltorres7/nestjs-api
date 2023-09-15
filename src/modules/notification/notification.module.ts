import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationController } from './notification.controller';

@Module({
  controllers: [NotificationController],
  imports: [
    ClientsModule.register([
      // ClientsModule is used to connect to other microservices
      {
        name: 'NOTIFICATION',
        transport: Transport.TCP,
        options: { port: 3001, host: '127.0.0.1' },
      },
    ]),
  ],
})
export class NotificationModule {}
