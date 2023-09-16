import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { EndOfDay, StartOfDay } from 'src/infra/utils/date';
import {
  TaskUserNotificationDTO,
  TaskUserRequestDTO,
  TaskUserResponseDTO,
} from '../../dto/task-user.dto';
import { ITaskRepository } from '../task-user-repository';

@Injectable()
export class TaskUserPrismaRepository implements ITaskRepository {
  constructor(private prisma: PrismaService) {}

  async save(data: TaskUserRequestDTO): Promise<TaskUserResponseDTO> {
    return this.prisma.taskUser.create({
      data: {
        task: {
          create: {
            description: data.description,
            endAt: data.endAt,
            startAt: data.startAt,
            title: data.title,
            priority: data.priority,
            status: data.status,
          },
        },
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });
  }

  async findAllStartDay(): Promise<TaskUserNotificationDTO[] | null> {
    const allTasks = await this.prisma.taskUser.findMany({
      where: {
        AND: [
          {
            task: {
              startAt: {
                gte: StartOfDay(),
                lte: EndOfDay(),
              },
            },
          },
        ],
      },
      include: {
        task: {
          select: {
            startAt: true,
            endAt: true,
            title: true,
            description: true,
          },
        },
        user: true,
      },
    });

    return allTasks;
  }
}
