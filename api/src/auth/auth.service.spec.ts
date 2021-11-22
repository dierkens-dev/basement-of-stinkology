import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import jwtDecode from 'jwt-decode';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: 'test-secret',
          signOptions: { expiresIn: '60s' },
        }),
        ConfigModule.forRoot({
          load: [
            () => ({
              BOS_JWT_SECRET: 'test-secret',
            }),
          ],
        }),
      ],
      providers: [AuthService, LocalStrategy, ConfigService, JwtStrategy],
      exports: [AuthService, JwtModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should validate a known user', async () => {
      await expect(
        service.validateUser('sonofab1rd', 'abc123'),
      ).resolves.toEqual({
        avatar: 'drink.png',
        email: 'test@email.com',
        firstName: 'Jacob',
        gamertag: 'Sonofab1rd',
        id: '2',
        lastName: 'Dierkens',
        slogan: "Kill 'em and Grill 'em",
        username: 'sonofab1rd',
      });
    });

    it('should not validate a known user with an incorrect password', async () => {
      await expect(
        service.validateUser('sonofab1rd', 'wrong-password'),
      ).resolves.toBeNull();
    });

    it('should not validate an uknown user', async () => {
      await expect(
        service.validateUser('unkown-user', 'wrong-password'),
      ).resolves.toBeNull();
    });
  });

  describe('login', () => {
    it('should login', async () => {
      const result = await service.login({
        userId: '1',
        username: 'sonofab1rd',
      });

      expect(jwtDecode(result.access_token)).toEqual(
        expect.objectContaining({ username: 'sonofab1rd' }),
      );
    });
  });
});
