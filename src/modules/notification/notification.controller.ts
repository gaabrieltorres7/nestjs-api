import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('/notification')
export class NotificationController {
  constructor(
    @Inject('NOTIFICATION') private readonly notificationClient: ClientProxy, //using Inject to get the ms client
  ) {}

  @Get('/send-notification')
  testMsNotification() {
    this.notificationClient.emit('task_notification', {
      message: 'Testando ms notification',
    });
  }
}
