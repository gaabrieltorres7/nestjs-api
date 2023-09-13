import { Injectable } from '@nestjs/common';
import { IStorage } from 'src/infra/providers/storage/storage';
import { AvatarDTO } from '../dto/user.dto';
import { IUserRepository } from '../repositories/user-repository';

@Injectable()
export class UploadAvatarUserUseCase {
  constructor(
    private storage: IStorage,
    private userRepository: IUserRepository,
  ) {}

  async execute(data: AvatarDTO) {
    const file = await this.storage.upload(data.file, 'avatar');
    return file;
  }
}
