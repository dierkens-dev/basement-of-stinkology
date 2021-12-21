import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AchievementsRepository } from 'src/achievements/achievements.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository, AchievementsRepository]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
