import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/db/prisma.service';
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
  providers: [PrismaService, SignInUseCase],
})
export class LoginModule {}
