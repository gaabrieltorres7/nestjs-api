import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { PrismaModule } from './infra/db/prisma.module';
import { ScheduleTaskModule } from './infra/jobs/schedule.module';
import { LoginModule } from './modules/login/login.module';
import { NotificationModule } from './modules/notification/notification.module';
import { TaskUserModule } from './modules/tasks/task-user.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    LoginModule,
    TaskUserModule,
    NotificationModule,
    ScheduleTaskModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
