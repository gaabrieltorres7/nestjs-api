import { Injectable } from '@nestjs/common';
import { extname } from 'path';
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
    const extFile = extname(data.file.originalname);
    const fileName = `${data.userId}${extFile}`;
    data.file.originalname = fileName;
    const file = await this.storage.upload(data.file, 'avatar');
    const pathAvatarUser = `avatar/${data.file.originalname}}`;
    await this.userRepository.uploadAvatar(data.userId, pathAvatarUser);

    return file;
  }
}
