import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { CreateUserUseCase } from './use-cases/create-user';

@Controller('/users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    //handle errors
    const newUser = await this.createUserUseCase.execute(data);
    return newUser;
  }
}
