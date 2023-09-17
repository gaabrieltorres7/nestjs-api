import { MailerService } from '@nestjs-modules/mailer';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

type NotificationDTO = {
  email: string;
  startAt: Date;
  endAt: Date;
  name: string;
  title: string;
  description: string;
};

@Controller()
export class AppController {
  constructor(private mailerService: MailerService) {}

  @MessagePattern('tp_task_notification')
  async taskNotification(data: NotificationDTO) {
    console.log('Recebendo notificação de tarefa');
    console.log(data);
    await this.mailerService.sendMail({
      to: data.email,
      subject: 'Nova tarefa',
      from: 'taskmanager@gmail.com',
      text: `Olá, ${data.name}! Você tem uma nova tarefa: ${data.title} 
      que começa em ${data.startAt} e termina em ${data.endAt}.`,
    });
  }
}
