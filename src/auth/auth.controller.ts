/* eslint-disable prettier/prettier */
import { Body, Controller, Logger, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { ErrorResponseObject, SuccessResponseObject } from "src/commom/https";
import { createAccountDTO, verifyAccountDTO } from "src/apiKey/dto/createAccount.dto";


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register user' })
  async signup(@Body() body: createAccountDTO) {
    try {
      const account = await this.authService.createAccount(body);

      return new SuccessResponseObject(
        `Account successfully registered`,
        account,
      );
    } catch (error) {
      this.logger.error(`Sign up error. ${error.message}`, error.stack);
      ErrorResponseObject(error);
    }
  }

  @Post('/email/verify')
  @ApiOperation({ summary: 'Verify email' })
  async verifyEmail(@Body() body: verifyAccountDTO) {
    try {
      const account = await this.authService.verifyAccount(body);

      return new SuccessResponseObject(
        `Account successfully verified. Use the following key to authenticate.`,
        account,
      );
    } catch (error) {
      this.logger.error(`Verify email error. ${error.message}`, error.stack);
      ErrorResponseObject(error);
    }
  }
}