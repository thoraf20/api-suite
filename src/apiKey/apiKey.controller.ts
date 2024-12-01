/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { ApiKeyService } from './apiKey.service';

@Controller('api-keys')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Post('generate/:userId')
  async generateApiKey(@Param('userId') userId: string) {
    return this.apiKeyService.generateApiKey(userId);
  }

  @Get(':userId')
  async getApiKeys(@Param('userId') userId: string) {
    return this.apiKeyService.getApiKeys(userId);
  }

  @Delete('revoke')
  async revokeApiKey(@Body('key') key: string) {
    await this.apiKeyService.revokeApiKey(key);
    return { message: 'API key revoked successfully' };
  }
}
