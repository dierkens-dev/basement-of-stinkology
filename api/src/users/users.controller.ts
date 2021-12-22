import { Controller, Body, Patch, Param, UseGuards, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Achievement } from 'src/achievements/entities/achievement.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { User } from './entities/user.entity';
import { ReturnUserDto } from './dto/return-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(
    @Body() getUsersFilterDto: GetUserFilterDto,
  ): Promise<ReturnUserDto[]> {
    return this.usersService.getUsers(getUsersFilterDto);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/achievements')
  addAchievements(
    @Param('id') id: string,
    @Body() achievments: Achievement[],
  ): Promise<User> {
    return this.usersService.addAchievements(id, achievments);
  }

  @Patch(':id/achievement')
  addAchievement(
    @Param('id') id: string,
    @Body() body: Record<string, string>,
  ): Promise<User> {
    console.log(body.achievementId);
    return this.usersService.addAchievement(id, body.achievementId);
  }
}
