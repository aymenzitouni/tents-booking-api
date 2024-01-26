import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { SignInBodyDTO } from './DTOs/body.dtos';
import { AuthService } from '../services/auth.service';

import { plainToClass } from 'class-transformer';
import { AuthGuard, AuthUser } from '../services/auth.guard';

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
  @UseGuards(AuthGuard)
  async getAuth(@AuthUser() user) {
    return user;
  }
}
