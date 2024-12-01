/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './models/user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { createAccountDTO } from 'src/apiKey/dto/createAccount.dto';
import { Repository } from 'typeorm'
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(userData: createAccountDTO) {
    const createdUser = await this.usersRepository.save({
      ...userData,
    });

    return createdUser;
  }

  async findById(id: string) {
    const dbUser = await this.usersRepository.findOne({
      where: { id },
    });

    if (dbUser) {
      return dbUser;
    } else {
      throw new NotFoundException('user not found');
    }
  }

  async findByEmail(email: string) {
    const dbUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (dbUser) {
      return dbUser;
    } else {
      throw new NotFoundException('user not found');
    }
  }
}
