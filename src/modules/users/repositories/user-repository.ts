import { User } from '@prisma/client';
import { UsernameAndEmail } from '../dto/user.dto';

export abstract class IUserRepository {
  abstract findByUsernameOrEmail(data: UsernameAndEmail): Promise<User | null>;
  abstract save(data: User): Promise<User>;
  abstract findByUsername(username: string): Promise<User | null>;
}
