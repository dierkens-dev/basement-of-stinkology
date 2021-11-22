import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a known user', async () => {
    await expect(service.findOne('2')).resolves.toEqual({
      avatar: 'drink.png',
      email: 'test@email.com',
      firstName: 'Jacob',
      gamertag: 'Sonofab1rd',
      id: '2',
      lastName: 'Dierkens',
      password: 'abc123',
      slogan: "Kill 'em and Grill 'em",
      username: 'sonofab1rd',
    });
  });

  it('should not find an unknown user', async () => {
    await expect(service.findOne('who-are-you')).resolves.toBeUndefined();
  });
});
