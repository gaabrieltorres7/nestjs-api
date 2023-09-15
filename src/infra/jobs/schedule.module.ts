import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskUserPrismaRepository } from 'src/modules/tasks/repositories/prisma/task-user-prisma-repository';
import { ITaskRepository } from 'src/modules/tasks/repositories/task-user-repository';
import { NotificationTaskUserSchedule } from './notification-task-user.schedule';

@Module({
  imports: [ScheduleModule.forRoot()], // 👈 every scheduled job will be registered here
  providers: [
    NotificationTaskUserSchedule,
    { provide: ITaskRepository, useClass: TaskUserPrismaRepository },
  ],
})
export class ScheduleTaskModule {}
