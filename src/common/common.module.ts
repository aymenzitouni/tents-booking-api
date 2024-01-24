import { Module } from '@nestjs/common';
import { PostgreSqlDbProvider } from './providers/db.provider.module';

@Module({
  imports: [PostgreSqlDbProvider],
  exports: [PostgreSqlDbProvider],
})
export class CommonModule {}
