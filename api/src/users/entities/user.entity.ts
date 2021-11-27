import { Achievement } from '../../achievements/entities/achievement.entity';
export class User {
  id: string;
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  slogan?: string;
  gamertag?: string;
  avatar?: string;
  achievements?: Achievement[];
}
