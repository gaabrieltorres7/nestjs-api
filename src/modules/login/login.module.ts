import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/db/prisma.service';
import { UserPrismaRepository } from '../users/repositories/prisma/user-prisma-repository';
import { IUserRepository } from '../users/repositories/user-repository';
import { LoginController } from './login.controller';
import { SignInUseCase } from './use-cases/sign-in';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [LoginController],
  providers: [
    PrismaService,
    SignInUseCase,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class LoginModule {}
