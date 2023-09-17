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
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';
import { AuthGuard } from '../../infra/providers/auth-guard.provider';
import { FileDTO } from './dto/user.dto';
import {
  CreateUserSchema,
  CreateUserSchemaDTO,
} from './schemas/create-user-schema';
import { CreateUserUseCase } from './use-cases/create-user';
import { ProfileUserUseCase } from './use-cases/profile-user';
import { UploadAvatarUserUseCase } from './use-cases/upload-avatar-user';

const schemaUserSwagger = zodToOpenAPI(CreateUserSchema);

@Controller('/users')
@ApiTags('users') // Swagger decorator to show in docs that all routes in this controller are part of the users group
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly profileUserUseCase: ProfileUserUseCase,
    private readonly uploadAvatarUserUseCase: UploadAvatarUserUseCase,
  ) {}

  @Post()
  @ApiBody({ schema: schemaUserSwagger }) // Swagger decorator to show the schema in the docs
  //@ApiResponse()
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
  @ApiBearerAuth() // Swagger decorator to show in docs that this route needs a token
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
