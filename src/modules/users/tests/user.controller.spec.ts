import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { IStorage } from '../../../infra/providers/storage/storage';
import { IUserRepository } from '../repositories/user-repository';
import { CreateUserSchemaDTO } from '../schemas/create-user-schema';
import { CreateUserUseCase } from '../use-cases/create-user';
import { ProfileUserUseCase } from '../use-cases/profile-user';
import { UploadAvatarUserUseCase } from '../use-cases/upload-avatar-user';
import { UserController } from '../user.controller';

describe('User Controller', () => {
  let userController: UserController;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [UserController],
      providers: [
        CreateUserUseCase,
        ProfileUserUseCase,
        UploadAvatarUserUseCase,
        {
          provide: IUserRepository,
          useValue: {
            findByUsernameOrEmail: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: IStorage,
          useValue: {
            upload: jest.fn(),
          },
        },
      ],
    }).compile();
    userController = moduleRef.get<UserController>(UserController);
    userRepository = moduleRef.get<IUserRepository>(IUserRepository);
  });

  it('should be able to create a new user', async () => {
    const body: CreateUserSchemaDTO = {
      email: 'any_email',
      name: 'any_name',
      password: 'any_password',
      username: 'any_username',
    };

    jest.spyOn(userRepository, 'save').mockResolvedValue({
      ...body,
      id: randomUUID(),
      createdAt: new Date(),
    });

    const result = await userController.create(body);

    expect(result).toHaveProperty('id');
  });
});
