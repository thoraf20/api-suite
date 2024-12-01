import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiKeyGuard } from './guards/api-key.guard';
import { ApiKeyService } from 'src/apiKey/apiKey.service';
import { AuthController } from './auth.controller';
import { ApiKey } from 'src/apiKey/models/apiKey.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/user.service';

@Module({
  // eslint-disable-next-line prettier/prettier
  imports: [TypeOrmModule.forFeature([ApiKey, User])],
  providers: [AuthService, ApiKeyService, UsersService, ApiKeyGuard],
  controllers: [AuthController],
  exports: [AuthService, ApiKeyGuard],
})
export class AuthModule {}
