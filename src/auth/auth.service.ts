import { Injectable } from '@nestjs/common';
import { VALID_API_KEYS } from './constants';

@Injectable()
export class AuthService {
  validateApiKey(apiKey: string): boolean {
    return VALID_API_KEYS.includes(apiKey);
  }
}
