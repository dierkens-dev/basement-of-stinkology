import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Payload } from './payload.type';
import AuthUser from './auth-user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super();
  }

  async validate(payload: Payload): Promise<AuthUser> {
    const { username } = payload;
    const user: AuthUser = await this.usersRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
