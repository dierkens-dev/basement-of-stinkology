import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from './dto/create-acheivement.dto';
import { GetAchievementFilterDto } from './dto/get-achievement-filter.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { Achievement } from './entities/achievement.entity';

@UseGuards(JwtAuthGuard)
@Controller('achievements')
export class AchievementsController {
  constructor(private achievementsService: AchievementsService) {}

  @Post()
  createAchievement(
    @Body() createAchievementDto: CreateAchievementDto,
  ): Promise<Achievement> {
    return this.achievementsService.createAchievement(createAchievementDto);
  }

  @Get()
  getAchievements(
    @Query() filterDto: GetAchievementFilterDto,
  ): Promise<Achievement[]> {
    return this.achievementsService.getAchievements(filterDto);
  }

  @Get(':id')
  getAchievementById(@Param() id: string): Promise<Achievement> {
    return this.achievementsService.getAchievementByID(id);
  }

  @Patch(':id')
  updateAchievement(
    @Param() id: string,
    @Body() updateAchievementDto: UpdateAchievementDto,
  ): Promise<Achievement> {
    return this.achievementsService.updateAchievement(id, updateAchievementDto);
  }

  @Delete(':id')
  deleteAchievementById(@Param() id: string): Promise<void> {
    return this.achievementsService.deleteAchievementById(id);
  }
}
