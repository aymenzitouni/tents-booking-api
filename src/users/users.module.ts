import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { CommonModule } from '../common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from 'src/common/models/users.model';
import { UsersService } from './services/users.service';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([UsersModel])],
  controllers: [AuthController],
  providers: [{ provide: 'IAuthService', useClass: AuthService }, UsersService],
  exports: ['IAuthService'],
})
export class UsersModule {}
