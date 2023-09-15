import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../../infra/providers/auth-guard.provider';
import { FileDTO } from './dto/user.dto';
import { CreateUserSchemaDTO } from './schemas/create-user-schema';
import { CreateUserUseCase } from './use-cases/create-user';
import { ProfileUserUseCase } from './use-cases/profile-user';
import { UploadAvatarUserUseCase } from './use-cases/upload-avatar-user';

@Controller('/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUserUseCase: ProfileUserUseCase,
    private readonly uploadAvatarUserUseCase: UploadAvatarUserUseCase,
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

  @Put('/avatar')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  async uploadAvatar(@Request() req, @UploadedFile() file: FileDTO) {
    const result = await this.uploadAvatarUserUseCase.execute({
      userId: req.user.sub,
      file,
    });

    return result;
  }
}
