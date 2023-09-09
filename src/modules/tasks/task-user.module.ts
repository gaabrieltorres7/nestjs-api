import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { TaskUserPrismaRepository } from './repositories/prisma/task-user-prisma-repository';
import { ITaskRepository } from './repositories/task-user-repository';
import { TaskUserController } from './task-user.controller';
import { CreateTaskUserUseCase } from './use-cases/create-task-user';

@Module({
  controllers: [TaskUserController],
  providers: [
    PrismaService,
    CreateTaskUserUseCase,
    {
      provide: ITaskRepository,
      useClass: TaskUserPrismaRepository,
    },
  ],
  imports: [],
})
export class TaskUserModule {}
