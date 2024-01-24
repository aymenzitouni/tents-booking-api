import { Module } from '@nestjs/common';
import { PostgreSqlDbProvider } from './providers/db.provider.module';
import { JwtModule } from '@nestjs/jwt';
import globalConfigs from './configs/global.configs';

@Module({
  imports: [PostgreSqlDbProvider, JwtModule.register(globalConfigs().jwt)],
  exports: [PostgreSqlDbProvider],
})
export class CommonModule {}
