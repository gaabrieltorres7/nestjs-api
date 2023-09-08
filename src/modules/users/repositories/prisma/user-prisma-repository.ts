import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/infra/db/prisma.service';
import { UserCreatedDTO, UsernameAndEmail } from '../../dto/user.dto';
import { IUserRepository } from '../user-repository';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}
  async findByUsername(username: string): Promise<UserCreatedDTO | null> {
    return await this.prisma.user.findUnique({ where: { username } });
  }

  async findById(id: string): Promise<UserCreatedDTO | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByUsernameOrEmail(
    data: UsernameAndEmail,
  ): Promise<UserCreatedDTO | null> {
    return await this.prisma.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });
  }

  async save(data: User): Promise<UserCreatedDTO> {
    return await this.prisma.user.create({ data });
  }
}
