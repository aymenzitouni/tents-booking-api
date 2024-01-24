const MIGRATIONS_BUILD_DEFAULT_PATH = 'dist/shared/migrations/*.js';
const MIGRATIONS_CLI_PATH = '../../../shared/migrations/*.js';
export default () => ({
  port: parseInt(process.env.POSTGRES_DB_PORT, 10) || 3000,
  database: {
    host: process.env.POSTGRES_DB_HOST,
    port: parseInt(process.env.POSTGRES_DB_PORT, 10) || 5432,
    type: 'postgres',
    username: String(process.env.POSTGRES_DB_USERNAME),
    password: String(process.env.POSTGRES_DB_PASSWORD),
    database: String(process.env.POSTGRES_DB_NAME),
    ssl: true,
    poolSize: 60,
    autoLoadEntities: false,
    synchronize: false,
    logging: false,
    migrations: [MIGRATIONS_BUILD_DEFAULT_PATH],
    cli: {
      migrationsDir: MIGRATIONS_CLI_PATH,
    },
  },
});
