import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
import { API_KEY_HEADER } from '../constants';
import { ApiKeyService } from 'src/apiKey/apiKey.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private apiKeyService: ApiKeyService,

    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers[API_KEY_HEADER];

    if (
      !apiKey ||
      !(await this.apiKeyService.getApiKeys(request.user?.id)).isActive
    ) {
      throw new UnauthorizedException('Invalid or missing API key');
    }

    return true;
  }
}
