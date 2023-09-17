import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('task_notification')
  taskNotification(data: any) {
    console.log('Recebendo notificação de tarefa');
    console.log(data);
  }
}
