import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { UserPrismaRepository } from './repositories/prisma/user-prisma-repository';
import { IUserRepository } from './repositories/user-repository';
import { CreateUserUseCase } from './use-cases/create-user';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    PrismaService,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserModule {}
