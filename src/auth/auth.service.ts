import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from 'src/apiKey/models/apiKey.model';
import {
  createAccountDTO,
  verifyAccountDTO,
} from 'src/apiKey/dto/createAccount.dto';
import { ApiKeyService } from 'src/apiKey/apiKey.service';
import { UsersService } from 'src/users/user.service';
import { User } from 'src/users/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(ApiKey)
    private apiKeyRepository: Repository<ApiKey>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private apiService: ApiKeyService,
    private userService: UsersService,
  ) {}

  async createAccount(dto: createAccountDTO) {
    const user = await this.userService.createUser({ ...dto });

    // TODO: send verification email notification

    if (user) {
      const apiKey = await this.apiService.generateApiKey(user.id);
      await this.apiKeyRepository.save(apiKey);

      return 'use 1234 as verification code for this user and update your account.';
    } else {
      throw new BadRequestException('Failed to create user');
    }
  }

  async verifyAccount(dto: verifyAccountDTO) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      relations: ['apiKey'],
    });

    if (dto.code !== '1234') throw new BadRequestException('Invalid code');

    await this.apiKeyRepository.update({ user }, { isActive: true });

    return { apiKey: user.apiKey.key };
  }
}
