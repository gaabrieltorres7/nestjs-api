import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ITaskRepository } from 'src/modules/tasks/repositories/task-user-repository';

type MessageDTO = {
  email: string;
  startAt: Date;
  endAt: Date;
  name: string;
  title: string;
  description: string;
};

@Injectable()
export class NotificationTaskUserSchedule {
  constructor(
    private taskRepository: ITaskRepository,
    @Inject('NOTIFICATION') private readonly notificationClient: ClientKafka,
  ) {} //using Inject to get the ms client

  @Cron(CronExpression.EVERY_5_SECONDS)
  async getAllTasksDay() {
    const allTasks = await this.taskRepository.findAllStartDay();

    if (allTasks) {
      allTasks.forEach((task) => {
        const message: MessageDTO = {
          email: task.user.email,
          startAt: task.task.startAt,
          endAt: task.task.endAt,
          name: task.user.name,
          title: task.task.title,
          description: task.task.description,
        };
        console.log('Sending message to notification microservice');
        this.notificationClient.emit('tp_task_notification', message);
      });
    }
  }
}
