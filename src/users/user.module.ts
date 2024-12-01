/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { UsersService } from './user.service';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { AuthService } from 'src/auth/auth.service';
import { ApiKey } from 'src/apiKey/models/apiKey.model';
import { ApiKeyService } from 'src/apiKey/apiKey.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, ApiKey])],
  providers: [UsersService, AuthService, ApiKeyService, ApiKeyGuard],
  controllers: [],
  exports: [ApiKeyGuard],
})
export class UserModule {}
