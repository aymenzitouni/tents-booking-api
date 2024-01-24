import { Module } from '@nestjs/common';
import { PostgreSqlDbProvider } from './providers/db.provider.module';
import { JwtModule } from '@nestjs/jwt';
import globalConfigs from './configs/global.configs';
import { CryptoHelperService } from './helpers/crypto.helper.service';
import { JwtHelperService } from './helpers/jwt.helper.service';
import { UsersRepository } from './repositories/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import models from './models';
import { UsersModel } from './models/users.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersModel]),
    PostgreSqlDbProvider,
    JwtModule.register(globalConfigs().jwt),
  ],
  providers: [
    { provide: 'ICryptoHelperService', useClass: CryptoHelperService },
    { provide: 'IJwtHelperService', useClass: JwtHelperService },
    { provide: 'IUsersRepository', useClass: UsersRepository },
  ],
  exports: [
    PostgreSqlDbProvider,
    'ICryptoHelperService',
    'IJwtHelperService',
    'IUsersRepository',
  ],
})
export class CommonModule {}
