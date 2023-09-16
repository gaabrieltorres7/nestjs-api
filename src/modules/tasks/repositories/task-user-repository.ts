import {
  TaskUserNotificationDTO,
  TaskUserRequestDTO,
  TaskUserResponseDTO,
} from '../dto/task-user.dto';

export abstract class ITaskRepository {
  abstract save(data: TaskUserRequestDTO): Promise<TaskUserResponseDTO>;
  abstract findAllStartDay(): Promise<TaskUserNotificationDTO[] | null>;
}
