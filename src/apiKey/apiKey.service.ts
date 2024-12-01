/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { User } from 'src/users/models/user.model';
import { ApiKey } from './models/apiKey.model';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKey)
    private apiKeyRepository: Repository<ApiKey>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async generateApiKey(userId: string): Promise<ApiKey> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found');

    const key = crypto.randomBytes(32).toString('hex');
    const apiKey = this.apiKeyRepository.create({ key, user });

    return apiKey;
  }

  async getApiKeys(userId: string): Promise<ApiKey> {
    const apiKey = await this.apiKeyRepository.findOne({
      where: { user: { id: userId }, isActive: true },
      relations: ['user'],
    });

    return apiKey
  }

  async revokeApiKey(key: string): Promise<void> {
    await this.apiKeyRepository.update({ key }, { isActive: false });
  }
}
