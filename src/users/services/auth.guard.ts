import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request['user'];
  },
);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('IAuthService') private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    try {
      const user = await this.authService.verifyAuth({ token });
      request['user'] = user;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string {
    return request.headers.authorization?.replace('Bearer', '').trim();
  }
}
