import { User } from '../entities/user.entity';

export class CreateUserDto implements Omit<User, 'id'> {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  slogan?: string;
  gamertag?: string;
  avatar?: string;
}
