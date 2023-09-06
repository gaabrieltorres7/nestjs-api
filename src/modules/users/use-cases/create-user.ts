import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { IUserRepository } from '../repositories/user-repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: User) {
    const user = await this.userRepository.findByUsernameOrEmail({
      username: data.username,
      email: data.email,
    });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const password = await hash(data.password, 10);

    return await this.userRepository.save({
      ...data,
      password,
    });
  }
}
