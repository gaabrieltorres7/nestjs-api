import { randomUUID } from 'crypto';
import {
  CreateUserDTO,
  UserCreatedDTO,
  UsernameAndEmail,
} from '../../dto/user.dto';
import { IUserRepository } from '../user-repository';

export class UserInMemoryRepository implements IUserRepository {
  users: UserCreatedDTO[] = [];

  async findByUsernameOrEmail(
    data: UsernameAndEmail,
  ): Promise<UserCreatedDTO | null> {
    const user = this.users.find(
      (user) => user.username === data.username || user.email === data.email,
    );
    return user || null;
  }
  async save(data: CreateUserDTO): Promise<UserCreatedDTO> {
    const user: UserCreatedDTO = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
    };
    this.users.push(user);
    return user;
  }
  findByUsername(username: string): Promise<UserCreatedDTO | null> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<UserCreatedDTO | null> {
    throw new Error('Method not implemented.');
  }
  uploadAvatar(userId: string, path: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
