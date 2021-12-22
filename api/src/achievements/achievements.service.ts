import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AchievementsRepository } from './achievements.repository';
import { CreateAchievementDto } from './dto/create-acheivement.dto';
import { GetAchievementFilterDto } from './dto/get-achievement-filter.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { Achievement } from './entities/achievement.entity';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectRepository(AchievementsRepository)
    private achievementsRepository: AchievementsRepository,
  ) {}
  createAchievement(
    @Body() createAchievementDto: CreateAchievementDto,
  ): Promise<Achievement> {
    return this.achievementsRepository.createAchievement(createAchievementDto);
  }

  getAchievements(filterDto: GetAchievementFilterDto): Promise<Achievement[]> {
    return this.achievementsRepository.getAchievements(filterDto);
  }

  async getAchievementByID(id: string): Promise<Achievement> {
    const achievement = await this.achievementsRepository.findOne(id);
    if (!achievement) {
      throw new NotFoundException(`Acheivement with id ${id} not found.`);
    }
    return achievement;
  }

  async updateAchievement(
    id: string,
    updateAchievementDto: UpdateAchievementDto,
  ): Promise<Achievement> {
    const achievement = await this.getAchievementByID(id);
    achievement.color = updateAchievementDto.color;
    achievement.icon = updateAchievementDto.icon;
    achievement.name = updateAchievementDto.name;
    await this.achievementsRepository.save(achievement);
    return achievement;
  }

  async deleteAchievementById(id: string): Promise<void> {
    const result = await this.achievementsRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Achievement with id "${id}" not found.`);
    }
  }
}
