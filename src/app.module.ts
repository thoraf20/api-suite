import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { ApiKeyGuard } from './auth/api-key.guard';

@Module({
  imports: [],
  controllers: [AuthModule],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class AppModule {}
