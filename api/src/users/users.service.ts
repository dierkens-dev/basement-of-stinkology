import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AchievementsRepository } from 'src/achievements/achievements.repository';
import { Achievement } from 'src/achievements/entities/achievement.entity';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
@Injectable()
@UseGuards(LocalAuthGuard)
export class UsersService {
  constructor(
    @InjectRepository(AchievementsRepository)
    private acheivementsRepository: AchievementsRepository,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async getUsers(getUserFilterDto: GetUserFilterDto): Promise<ReturnUserDto[]> {
    return this.usersRepository.getUsers(getUserFilterDto);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }
  async findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ username });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (user) {
      const {
        avatar,
        email,
        firstName,
        lastName,
        slogan,
        gamertag,
        achievements,
      } = updateUserDto;
      user.avatar = avatar;
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;
      user.slogan = slogan;
      user.gamertag = gamertag;
      user.achievements = achievements;
    } else {
      throw new UnauthorizedException();
    }
    return await this.usersRepository.save(user);
  }

  async addAchievements(
    id: string,
    achievements: Achievement[],
  ): Promise<User> {
    const user = await this.findOne(id);
    const _achievements = await this.acheivementsRepository.findByIds(
      achievements.map((achievement) => achievement.id),
    );
    if (user.achievements) {
      user.achievements.concat(_achievements);
    } else {
      user.achievements = _achievements;
    }
    return this.usersRepository.save(user);
  }

  async addAchievement(id: string, achievementId: string): Promise<User> {
    const user = await this.findOne(id);
    const _achievement = await this.acheivementsRepository.findOne({
      id: achievementId,
    });
    if (user.achievements) {
      user.achievements.push(_achievement);
    } else {
      const achievements = [_achievement];
      user.achievements = achievements;
    }
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found.`);
    }
  }
}
