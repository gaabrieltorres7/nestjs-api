import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskUserPrismaRepository } from 'src/modules/tasks/repositories/prisma/task-user-prisma-repository';
import { ITaskRepository } from 'src/modules/tasks/repositories/task-user-repository';
import { NotificationTaskUserSchedule } from './notification-task-user.schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      // ClientsModule is used to connect to other microservices
      {
        name: 'NOTIFICATION',
        transport: Transport.KAFKA,
        options: {
          client: { brokers: ['127.0.0.1:9092'] },
          consumer: {
            groupId: 'gp_app_task_manager',
          },
          // producer: { if I want don't want to allow topic creation if it doesn't exist
          //   allowAutoTopicCreation: false,
          // },
        },
      },
    ]),
  ], // 👈 every scheduled job will be registered here
  providers: [
    NotificationTaskUserSchedule,
    { provide: ITaskRepository, useClass: TaskUserPrismaRepository },
  ],
})
export class ScheduleTaskModule {}
