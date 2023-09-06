import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserValidationPipe } from './pipe/create-user.validation.pipe';
import { CreateUserUseCase } from './use-cases/create-user';

@Controller('/users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @UsePipes(CreateUserValidationPipe)
  async create(@Body() data: User) {
    const newUser = await this.createUserUseCase.execute(data);
    return newUser;
  }
}
