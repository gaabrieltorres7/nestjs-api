import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/db/prisma.service';
import { IStorage } from 'src/infra/providers/storage/storage';
import { SupabaseStorage } from 'src/infra/providers/storage/supabase-storage';
import { UserPrismaRepository } from './repositories/prisma/user-prisma-repository';
import { IUserRepository } from './repositories/user-repository';
import { CreateUserUseCase } from './use-cases/create-user';
import { ProfileUserUseCase } from './use-cases/profile-user';
import { UploadAvatarUserUseCase } from './use-cases/upload-avatar-user';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    ProfileUserUseCase,
    UploadAvatarUserUseCase,
    PrismaService,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: IStorage,
      useClass: SupabaseStorage,
    },
  ],
})
export class UserModule {}
