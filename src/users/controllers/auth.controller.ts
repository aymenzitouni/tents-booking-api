import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { SignInBodyDTO } from './DTOs/body.dtos';
import { AuthService } from '../services/auth.service';

import { plainToClass } from 'class-transformer';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    @Inject('IAuthService') private readonly authService: AuthService,
  ) {}
  @Post('sign-in')
  async signIn(@Body() body: SignInBodyDTO) {
    return await this.authService.signIn(body);
  }

  @Get()
  async getAuth() {}
}
