import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions, Repository } from 'typeorm';
import globalConfigs from '../configs/global.configs';
import models from '../models';

@Module({
  imports: [
    Repository,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      useFactory: () => {
        return globalConfigs().database as TypeOrmModuleOptions;
      },
    }),
    TypeOrmModule.forFeature([...models]),
  ],
  providers: [],
  exports: [],
})
export class PostgreSqlDbProvider {}

export async function createDataSource() {
  const dbConfig = globalConfigs().database;

  console.log('returning datasource with config', dbConfig);
  return new DataSource({
    ...dbConfig,
    migrations: ['src/shared/migrations/*'],
    synchronize: false,
    entities: [...models],
    migrationsTableName: 'typeorm_migrations',
  } as DataSourceOptions);
}

const dataSource = createDataSource().then(
  (dataSource) => dataSource,
  (err) => {
    console.error(err);
    process.exit(1);
  },
);

export default dataSource;
