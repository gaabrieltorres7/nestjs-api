import { TaskUserRequestDTO, TaskUserResponseDTO } from '../dto/task-user.dto';

export abstract class ITaskRepository {
  abstract save(data: TaskUserRequestDTO): Promise<TaskUserResponseDTO>;
}
