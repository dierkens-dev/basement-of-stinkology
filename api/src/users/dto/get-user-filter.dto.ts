import { Achievement } from 'src/achievements/entities/achievement.entity';

export class GetUserFilterDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  slogan?: string;
  gamertag?: string;
  achievements?: Achievement[];
}
