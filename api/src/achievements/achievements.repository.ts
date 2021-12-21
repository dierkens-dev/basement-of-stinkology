import { EntityRepository, Repository } from 'typeorm';
import { CreateAchievementDto } from './dto/create-acheivement.dto';
import { GetAchievementFilterDto } from './dto/get-achievement-filter.dto';
import { Achievement } from './entities/achievement.entity';

@EntityRepository(Achievement)
export class AchievementsRepository extends Repository<Achievement> {
  async getAchievements(
    filterDto: GetAchievementFilterDto,
  ): Promise<Achievement[]> {
    const query = this.createQueryBuilder('achievement');
    const { name } = filterDto;
    if (name) {
      query.andWhere('(LOWER(achievement.name) LIKE LOWER(:name))', {
        name: `%${name}%`,
      });
    }
    const achievement = await query.getMany();
    return achievement;
  }

  async createAchievement(
    createAchievementDto: CreateAchievementDto,
  ): Promise<Achievement> {
    const { name, icon, color } = createAchievementDto;
    const achievement = this.create({
      name,
      icon,
      color,
    });
    await this.save(achievement);
    return achievement;
  }
}
