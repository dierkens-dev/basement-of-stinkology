import { getMockReq } from '@jest-mock/express';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import jwtDecode from 'jwt-decode';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AuthUser } from './auth/auth.service';
import { UsersModule } from './users/users.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        ConfigModule.forRoot({
          load: [
            () => ({
              BOS_JWT_SECRET: 'test-secret',
            }),
          ],
        }),
        UsersModule,
      ],
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "undefined" when request has no user', async () => {
      const req = getMockReq();
      await expect(appController.login(req)).resolves.toBeUndefined();
    });

    it('should return the requested user', async () => {
      const user: AuthUser = {
        username: 'sonofab1rd',
        password: 'abc123',
      };
      const req = getMockReq({
        user,
      });

      const result = await appController.login(req);

      expect(jwtDecode(result.access_token)).toEqual(
        expect.objectContaining({
          username: 'sonofab1rd',
        }),
      );
    });
  });
});
