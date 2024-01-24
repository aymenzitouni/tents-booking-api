const MIGRATIONS_BUILD_DEFAULT_PATH = 'dist/common/migrations/*.js';
const MIGRATIONS_CLI_PATH = '../../../common/migrations/*.js';
const JWT_DEFAULT_EXPRISE_IN = '60s';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.POSTGRES_DB_HOST,
    port: parseInt(process.env.POSTGRES_DB_PORT, 10) || 5432,
    type: 'postgres',
    username: String(process.env.POSTGRES_DB_USERNAME),
    password: String(process.env.POSTGRES_DB_PASSWORD),
    database: String(process.env.POSTGRES_DB_NAME),
    ssl: false,
    poolSize: 60,
    autoLoadEntities: true,
    synchronize: false,
    logging: false,
    migrations: [MIGRATIONS_BUILD_DEFAULT_PATH],
    cli: {
      migrationsDir: MIGRATIONS_CLI_PATH,
    },
  },
  jwt: {
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: JWT_DEFAULT_EXPRISE_IN },
  },
});
