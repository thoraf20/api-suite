/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ApiKey } from "./models/apiKey.model";
import { ApiKeyController } from "./apiKey.controller";
import { ApiKeyGuard } from "src/auth/guards/api-key.guard";
import { ApiKeyService } from "./apiKey.service";
import { AuthService } from "src/auth/auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/models/user.model";
import { UsersService } from "src/users/user.service";


@Module({
  imports: [TypeOrmModule.forFeature([ApiKey, User])],
  providers: [AuthService, ApiKeyService, UsersService, ApiKeyGuard],
  controllers: [ApiKeyController],
  exports: [ApiKeyService, ApiKeyGuard],
})
export class ApiKeyModule {}
