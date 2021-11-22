import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { users } from './users.data';
@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return users;
  }

  async findOne(id: string): Promise<User | undefined> {
    return users.find((user) => user.id === id);
  }
  async findOneByUsername(username: string): Promise<User | undefined> {
    return users.find((user) => user.username === username);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
