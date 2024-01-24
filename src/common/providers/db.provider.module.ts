import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import globalConfigs from '../configs/global.configs';

@Module({
  imports: [
    Repository,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      useFactory: () => {
        return globalConfigs().database as TypeOrmModuleOptions;
      },
    }),
    TypeOrmModule.forFeature([]),
  ],
  providers: [],
  exports: [],
})
export class PostgreSqlDbProvider {}
