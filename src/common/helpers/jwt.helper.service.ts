import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtHelperService {
  constructor(private readonly jwtService: JwtService) {}
  signAuthJwt(userId: string) {
    return this.jwtService.sign({ userId });
  }
}
