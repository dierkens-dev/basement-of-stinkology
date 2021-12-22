import { User } from 'src/users/entities/user.entity';
import { Achievement } from '../entities/achievement.entity';

export class CreateAchievementDto implements Omit<Achievement, 'id'> {
  name: string;
  icon: string;
  color: string;
  user: User;
}
