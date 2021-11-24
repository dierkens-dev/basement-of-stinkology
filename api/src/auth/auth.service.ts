import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

export interface AuthUser {
  username: string;
  password: string;
}

interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}

export type Payload = JwtPayload & Pick<AuthUser, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findOneByUsername(username);

    if (user?.password === password) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login({ username, password }: AuthUser) {
    const payload: Payload = { password, sub: username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
