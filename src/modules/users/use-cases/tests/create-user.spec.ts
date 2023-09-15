import { Test } from '@nestjs/testing';
import { CreateUserDTO } from '../../dto/user.dto';
import { UserInMemoryRepository } from '../../repositories/in-memory/user-in-memory-repository';
import { IUserRepository } from '../../repositories/user-repository';
import { CreateUserUseCase } from '../create-user';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: IUserRepository,
          // useValue: { findByUserUsernameOrEmail: jest.fn(), save: jest.fn() }, caso eu nao queira criar in-memory
          useClass: UserInMemoryRepository,
        },
      ],
    }).compile();

    createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should be able to create a new user', async () => {
    const data: CreateUserDTO = {
      email: 'any_email',
      name: 'any_username',
      password: 'any_password',
      username: 'any_username',
    };

    const result = await createUserUseCase.execute(data);

    expect(result).toHaveProperty('id');
  });
});
