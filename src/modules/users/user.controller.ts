import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { CreateUserValidationPipe } from './pipe/create-user.validation.pipe';
import { CreateUserUseCase } from './use-cases/create-user';
import { ProfileUserUseCase } from './use-cases/profile-user';

@Controller('/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUserUseCase: ProfileUserUseCase,
  ) {}

  @Post()
  @UsePipes(CreateUserValidationPipe)
  async create(@Body() data: User) {
    const newUser = await this.createUserUseCase.execute(data);
    return newUser;
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  async me(@Request() { user }) {
    return this.profileUserUseCase.execute(user.sub);
  }
}
