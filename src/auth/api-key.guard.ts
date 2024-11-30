import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { API_KEY_HEADER } from './constants';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers[API_KEY_HEADER];

    if (!apiKey || !this.authService.validateApiKey(apiKey)) {
      throw new UnauthorizedException('Invalid or missing API key');
    }

    return true;
  }
}
