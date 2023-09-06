import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { CreateUserValidationPipe } from './pipe/create-user.validation.pipe';
import { CreateUserUseCase } from './use-cases/create-user';

@Controller('/users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @UsePipes(CreateUserValidationPipe)
  async create(@Body() data: CreateUserDTO) {
    const newUser = await this.createUserUseCase.execute(data);
    return newUser;
  }
}
