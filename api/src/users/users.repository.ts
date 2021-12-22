import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { ReturnUserDto } from './dto/return-user.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code == '23505') {
        throw new ConflictException('Username already exists!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async getUsers(
    getUsersFilterDto: GetUserFilterDto,
  ): Promise<ReturnUserDto[]> {
    const query = this.createQueryBuilder('user');
    const { email, firstName, lastName, slogan, gamertag, achievements } =
      getUsersFilterDto;
    if (email) {
      query.andWhere('user.email LIKE :email', { email });
    }
    if (firstName) {
      query.andWhere('LOWER(user.firstName) LIKE :firstName', { firstName });
    }
    if (lastName) {
      query.andWhere('LOWER(user.lastName) LIKE :lastName', { lastName });
    }
    if (slogan) {
      query.andWhere('LOWER(user.slogan) LIKE :slogan', { slogan });
    }
    if (gamertag) {
      query.andWhere('LOWER(user.gamertag) LIKE :gamertag', { gamertag });
    }
    if (achievements && achievements.length) {
    }
    query.leftJoinAndSelect('user.achievements', 'acheivement');
    // query.where("user.name = :name", { name: "Timber" })
    const users = await query.getMany();
    const returnUsers = users.map((user) => {
      const returnUser: ReturnUserDto = {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        slogan: user.slogan,
        avatar: user.avatar,
        gamertag: user.gamertag,
        achievements: user.achievements,
      };
      return returnUser;
    });
    return returnUsers;
  }
}
