import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { PrismaService } from 'src/infra/db/prisma.service';
import { SignInDTO } from '../dto/sign-in.dto';

@Injectable()
export class SignInUseCase {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async execute(data: SignInDTO) {
    const user = await this.prisma.user.findFirst({
      where: {
        username: data.username,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordMatch = await compare(data.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
