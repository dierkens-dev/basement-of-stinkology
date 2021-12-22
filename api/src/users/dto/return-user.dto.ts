import { Achievement } from 'src/achievements/entities/achievement.entity';
import { User } from '../entities/user.entity';

export class ReturnUserDto implements Omit<User, 'password'> {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  slogan: string;
  gamertag: string;
  avatar: string;
  achievements?: Achievement[];
}
