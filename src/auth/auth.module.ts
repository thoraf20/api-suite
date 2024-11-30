import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiKeyGuard } from './api-key.guard';

@Module({
  providers: [AuthService, ApiKeyGuard],
  exports: [AuthService, ApiKeyGuard],
})
export class AuthModule {}
