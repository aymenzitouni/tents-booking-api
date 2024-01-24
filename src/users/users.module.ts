import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { CommonModule } from '../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import models from '../common/models';
import { UsersModel } from 'src/common/models/users.model';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([UsersModel])],
  controllers: [AuthController],
  providers: [{ provide: 'IAuthService', useClass: AuthService }],
})
export class UsersModule {}
