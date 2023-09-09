import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { CreateUserSchemaDTO } from './schemas/create-user-schema';
import { CreateUserUseCase } from './use-cases/create-user';
import { ProfileUserUseCase } from './use-cases/profile-user';

@Controller('/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUserUseCase: ProfileUserUseCase,
  ) {}

  @Post()
  // @UsePipes(CreateUserValidationPipe)
  async create(@Body() data: CreateUserSchemaDTO) {
    const user = await this.createUserUseCase.execute(data);
    const newUser = {
      ...user,
      password: undefined,
    };
    return newUser;
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  async me(@Request() { user }) {
    return this.profileUserUseCase.execute(user.sub);
  }
}
