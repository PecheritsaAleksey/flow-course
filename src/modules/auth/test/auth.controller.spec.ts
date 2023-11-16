import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';

const mockAuthService = {
  register: jest.fn(() => {
    return {
      token: 'token',
    };
  }),
  createUser: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('/api/auth/register', async () => {
    const res = await controller.register({
      firstName: 'test',
      lastName: 'test',
      email: '1@1.ru',
      password: '123456',
    });
    expect(res.token).toBeDefined();
  });
});
